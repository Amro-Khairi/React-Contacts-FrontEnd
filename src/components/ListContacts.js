import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const ListContacts = ({ contacts, onRemoveContact }) => {
  const [query, setQuery] = useState("");

  const updatedQuery = (query) => {
    setQuery(query.trim());
  };

  const clearQuery = () => {
    updatedQuery("");
  };

  const showingContacts =
    query === ""
      ? contacts
      : contacts.filter((c) =>
          c.name.toLowerCase().includes(query.toLocaleLowerCase())
        );
  return (
    <div className="list-contacts">
      <div className="list-contacts-top">
        <input
          className="search-contacts"
          type="text"
          placeholder="Search Contacts"
          value={query}
          onChange={(event) => {
            updatedQuery(event.target.value);
          }}
        />
        <Link to="/create" className="add-contact">
          Add contact
        </Link>
      </div>
      {showingContacts.length !== contacts.length && (
        <div className="showing-contacts">
          <span>
            Now showing {showingContacts.length} of {contacts.length}
          </span>
          <button onClick={clearQuery}>Show all</button>
        </div>
      )}

      <ol className="contact-list">
        {showingContacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div
              className="contact-avatar"
              style={{
                backgroundImage: `url(${contact.avatarURL})`,
              }}
            ></div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.handle}</p>
            </div>
            <button
              className="contact-remove"
              onClick={() => {
                onRemoveContact(contact);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
}; //This is fo proptype to work, the key is the prop, and the value is PropTypes.datatype.isRequired

export default ListContacts;
