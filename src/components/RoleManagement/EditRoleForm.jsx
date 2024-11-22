import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditRoleForm = ({ role, setRoles, onClose }) => {
  const [updatedRole, setUpdatedRole] = useState(role);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!updatedRole.name.trim()) {
      setError("Role name cannot be empty.");
      return;
    }
    setRoles((prev) =>
      prev.map((r) => (r.id === role.id ? updatedRole : r))
    );
    onClose(); // Close the modal after saving
  };

  return (
    <div>
      <Modal.Body>
        <Form>
          {/* Role Name Input */}
          <Form.Group controlId="roleName">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role name"
              value={updatedRole.name}
              onChange={(e) => {
                setUpdatedRole({ ...updatedRole, name: e.target.value });
                setError(""); // Clear error on change
              }}
              isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>

          {/* Permissions Input */}
          <Form.Group controlId="rolePermissions" className="mt-3">
            <Form.Label>Permissions (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter permissions"
              value={updatedRole.permissions.join(", ")}
              onChange={(e) =>
                setUpdatedRole({
                  ...updatedRole,
                  permissions: e.target.value.split(", ").map((p) => p.trim()),
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default EditRoleForm;
