import React, { useState } from "react";
import { Button, TextField, DialogActions, DialogContent } from "@mui/material";

const EditUserForm = ({ user, setUsers, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleSave = () => {
    setUsers(prev =>
      prev.map(u => (u.id === user.id ? updatedUser : u))
    );
    onClose();
  };

  return (
    <div>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={updatedUser.name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, name: e.target.value })
          }
        />
        <TextField
          label="Role"
          fullWidth
          value={updatedUser.role}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, role: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default EditUserForm;
