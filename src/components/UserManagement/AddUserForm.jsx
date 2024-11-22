import React, { useState } from "react";
import { Button, TextField, DialogActions, DialogContent } from "@mui/material";

const AddUserForm = ({ setUsers, onClose }) => {
  const [user, setUser] = useState({ name: "", role: "", status: "Active" });

  const handleSubmit = () => {
    setUsers(prev => [...prev, { ...user, id: Date.now() }]);
    onClose();
  };

  return (
    <div>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          label="Role"
          fullWidth
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </div>
  );
};

export default AddUserForm;
