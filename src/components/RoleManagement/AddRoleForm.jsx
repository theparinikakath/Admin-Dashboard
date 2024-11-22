import React, { useState } from "react";
import { Button, TextField, DialogActions, DialogContent } from "@mui/material";

const AddRoleForm = ({ setRoles, onClose }) => {
  const [role, setRole] = useState({ name: "", permissions: [] });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!role.name.trim()) {
      setError("Role name is required.");
      return;
    }
    setRoles((prev) => [...prev, { ...role, id: Date.now() }]);
    onClose();
  };

  return (
    <div>
      <DialogContent>
        <TextField
          label="Role Name"
          fullWidth
          value={role.name}
          onChange={(e) => {
            setRole({ ...role, name: e.target.value });
            setError(""); // Clear error on change
          }}
          error={!!error}
          helperText={error}
        />
        <TextField
          label="Permissions (comma-separated)"
          fullWidth
          value={role.permissions.join(", ")}
          onChange={(e) =>
            setRole({ ...role, permissions: e.target.value.split(", ") })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Role
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddRoleForm;
