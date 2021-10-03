import React from "react";
import Moment from 'moment';

const ReadOnlyRow = ({ contact, handleEditClick}) => {
  return (
    <tr>
      <td>{contact.username}</td>
      <td>{Moment(contact.birthday).format("DD/MM/YYYY")}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
