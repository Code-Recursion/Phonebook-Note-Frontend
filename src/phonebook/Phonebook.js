import React, { useState, useEffect } from "react";
import contactService from "../services/contact";
import "./phonebook.css";

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState("");
  const [number, setNumber] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [createAlert, setCreateAlert] = useState(null);
  const [invalidAlert, setInvalidAlert] = useState(null);

  useEffect(() => {
    contactService.getAllContact().then((data) => {
      setContacts(data);
    });
  }, []);

  const handleAddContact = (event) => {
    event.preventDefault();
    const contactObj = { name: contact, number: number };

    let exists = contacts.filter(
      (person) => person.name.toLowerCase() === contactObj.name.toLowerCase()
    );

    if (exists.length === 0) {
      if (contact === "" && number === "") {
        setDeleteAlert("Contact's name or number can't be empty!");
        setTimeout(() => {
          setDeleteAlert(null);
        }, 5000);
      } else if (contact.length < 6 || number.length < 6) {
        setInvalidAlert("Name or Number can't be less than 6 characters long");
        setTimeout(() => {
          setInvalidAlert(null);
        }, 5000);
      } else if (isNaN(number)) {
        setInvalidAlert("Number can't contain string");
        setTimeout(() => {
          setInvalidAlert(null);
        }, 5000);
      } else {
        contactService.addContact(contactObj).then((data) => {
          setContacts(contacts.concat(data));
          setCreateAlert(`Contact "${contactObj.name}" added successfully`);
          setTimeout(() => {
            setCreateAlert(null);
          }, 5000);
        });
      }
    } else {
      if (
        window.confirm(
          `The contact with name ${contactObj.name} already exists do you want to replace it?`
        )
      ) {
        contactService.updateContact(exists[0].id, contactObj).then((data) => {
          setContacts(contacts.map((person) => (person.name !== contactObj.name ? person : data)));
        });
        setCreateAlert(`Contact ${contactObj.name} updated successfully`);
        setTimeout(() => {
          setCreateAlert(null);
        }, 5000);
      }
    }

    setContact("");
    setNumber("");
  };

  const handleDeleteContact = (id) => {
    const deleteObj = contacts.find((person) => person.id === id);
    if (window.confirm(`do you really want to delete ${deleteObj.name}`))
      contactService
        .deleteContact(id)
        .then(() => {
          setContacts(contacts.filter((item) => item.id !== id));
          setDeleteAlert(`${deleteObj.name} deleted successfully`);
        })
        .catch(() => {
          setDeleteAlert(`unable to delete, the user  is already deleted from the server`);
        });

    setTimeout(() => {
      setDeleteAlert(null);
    }, 5000);
  };

  const DeleteNotification = ({ message }) => {
    if (!message) return null;
    return (
      <div className="error">
        <p>{message}</p>
      </div>
    );
  };

  const CreateNotification = ({ message }) => {
    if (!message) return null;
    return (
      <div className="success">
        <p>{message}</p>
      </div>
    );
  };

  const ValidationNotification = ({ message }) => {
    if (!message) return null;
    return (
      <div className="invalid">
        <p>{message}</p>
      </div>
    );
  };

  const handleNameChange = (event) => {
    setContact(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div className="phonebook">
      <h1>Phonebook</h1>
      <DeleteNotification message={deleteAlert} />
      <CreateNotification message={createAlert} />
      <ValidationNotification message={invalidAlert} />

      <form onSubmit={handleAddContact}>
        <p>
          Name <input type="text" autoFocus onChange={handleNameChange} value={contact} />
        </p>
        <p>
          Number <input type="text" onChange={handleNumberChange} value={number} />
        </p>
        <button>add</button>
      </form>
      <ul>
        {contacts.map((person, i) => (
          <li key={i}>
            <p>
              {person.name} {person.number}
              &nbsp;&nbsp;<button onClick={() => handleDeleteContact(person.id)}>delete</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Phonebook;
