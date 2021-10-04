import React, { useState, Fragment } from "react";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Authen from "./components/Authen";
import SearchBar from "./components/SearchBar";
import { fetchUser, changeUser } from "./api/user";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    _id: undefined,
    username: "",
    birthday: "",
    email: "",
  });

  const [search, setSearch] = useState(null);
  const [auth, setAuth] = useState(null);

  const [editFormData, setEditFormData] = useState({
    _id: undefined,
    username: "",
    birthday: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      _id: editContactId,
      username: editFormData.username,
      birthday: editFormData.birthday,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);

    const formValues = {
      _id: contact.id,
      username: contact.username,
      birthday: contact.birthday,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleAuth = (event) => {
    event.preventDefault();
    const fieldValue = event.target.value;

    setAuth(fieldValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const fieldValue = event.target.value;

    setSearch(fieldValue);
  };

  const onSearch = async (event) => {
    event.preventDefault();

    await fetchUser(auth, search).then((user) => {
      setContacts(user);
    });
  };

  const updateUser = async (event) => {
    event.preventDefault();

    await changeUser(auth, contacts)
    await fetchUser(auth, search).then((user) => {
      setContacts(user);
    });
  };

  const addUser = async (event) => {
    event.preventDefault();
    await changeUser(auth, [addFormData]).then(res=>{console.log(res)})
    await fetchUser(auth, search).then((user) => {
      setContacts(user);
    });
  }

  return (
    <div className="app-container">
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        onSearch={onSearch}
      ></SearchBar>
      <Authen auth={auth} handleAuth={handleAuth}></Authen>
      {contacts.length !== 0 ? (
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birthday</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment>
                  {editContactId === contact._id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      ) : (
        <div></div>
      )}
      <form onSubmit={updateUser}>
        <button type="submit">UpdateAll</button>
      </form>
      <h2>Add a User</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          name="username"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          data-date-format="DD MMMM YYYY"
          name="birthday"
          required="required"
          placeholder="Enter a birthday..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
