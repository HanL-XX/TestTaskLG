import React from "react";
import moment from 'moment';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="username"
          value={editFormData.username}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          //data-date-format="YYYY MMMM DD"
          required="required"
          //placeholder="Enter a birthday..."
          name="birthday"
          value={moment.utc(editFormData.birthday).format("YYYY-MM-DD")}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
      </td>
    </tr>
  );
};

export default EditableRow;
