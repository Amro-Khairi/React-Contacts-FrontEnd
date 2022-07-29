import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serialize from "form-serialize";

const CreateContact = ({ onCreateContact }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = serialize(event.target, { hash: true });
    //Here's how the serialize will take the event.target (the form) and serialize all of it's input's values, and store them in the values variable
    //We added the { hash: true} so we get back an object of key-value pairs, the key is the name of each input
    if (onCreateContact) {
      onCreateContact(values);
    }
  };

  return (
    <div>
      <Link to={"/"} className={"close-create-contact"}>
        Close
      </Link>
      <form onSubmit={handleSubmit} className="create-contact-form">
        <ImageInput
          className={"create-contact-avatar-input"}
          name="avatarURL"
          maxHeight={64}
        />
        <div className="create-contact-details">
          <input type={"text"} placeholder="Name" name="name" />
          <input type="text" placeholder="Handle" name="handle" />
          <button>Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
