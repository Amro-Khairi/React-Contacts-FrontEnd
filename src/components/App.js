import "../css/App.css";
import ListContacts from "./ListContacts";
import { useState } from "react";
import * as ContactsAPI from "../utils/ContactsAPI";
//Making an API call to an external server is a side effect, so we will use useEffect
import { useEffect } from "react";
import CreateContact from "./CreateContact";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, []);
  //It takes a callback function and a dependency array
  /** STEPS WE MADE
   * 1. To be able to use the hook in the first place, we import useEffect.
   * 2. We then place useEffect() directly inside the component.
   *    -The first argument is a function. Within it, we make an asynchronous request to our Contacts API. When it resolves, we pass the response into setContacts(), which updates our contacts state.
   *    -The second argument is an empty array. We include this because we want the effect to run only during mount and unmount (i.e., not after every time props or state changes). The empty array also tells React that there are no dependencies needed.
   * 3. Once our component is mounted to the DOM, the contacts array is populated. As such, React re-renders, and our contacts are shown on the screen
   */

  const removeContact = (contact) => {
    ContactsAPI.remove(contact);

    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  const createContact = (contact) => {
    const create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat(res));
    };
    create();
    navigate("/");
  };
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ListContacts contacts={contacts} onRemoveContact={removeContact} />
        }
      />
      {console.log(contacts)}
      <Route
        path="/create"
        element={<CreateContact onCreateContact={createContact} />}
      />
    </Routes>
  );
};

export default App;
