import React from "react";

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
          data-date-format="DD MMMM YYYY"
          required="required"
          placeholder="Enter a birthday..."
          name="birthday"
          value={editFormData.birthday}
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
