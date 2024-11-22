import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { Button, Table, Form } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
    { id: 3, name: "Alice Brown", role: "User", status: "Active" },
    { id: 4, name: "Bob Green", role: "Editor", status: "Inactive" },
    { id: 5, name: "Charlie White", role: "Admin", status: "Active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Handle Add User
  const addUser = (newUser) => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setOpenAdd(false);
  };

  // Handle Edit User
  const editUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setOpenEdit(false);
  };

  // Handle Delete User
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Sort Users
  const sortUsers = (usersList) => {
    if (sortBy === "name") {
      return [...usersList].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "status") {
      return [...usersList].sort((a, b) => a.status.localeCompare(b.status));
    }
    return usersList;
  };

  // Filter users dynamically
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const displayedUsers = sortUsers(filteredUsers);

  return (
    <div>
      <h2 className="text-primary mb-4">User Management</h2>

      {/* Search, Filters, and Sort */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "30%" }}
        />
        <Form.Select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{ width: "20%" }}
        >
          <option value="">Filter by role</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="User">User</option>
        </Form.Select>
        <Form.Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: "20%" }}
        >
          <option value="">Filter by status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ width: "20%" }}
        >
          <option value="">Sort by</option>
          <option value="name">Name (A-Z)</option>
          <option value="status">Status (Active/Inactive)</option>
        </Form.Select>
      </div>

      {/* User Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentUser(user);
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add User Button */}
      <div className="text-center mt-3">
        <Button variant="success" onClick={() => setOpenAdd(true)}>
          Add User
        </Button>
      </div>

      {/* Add User Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add User</DialogTitle>
        <AddUserForm onSubmit={addUser} onClose={() => setOpenAdd(false)} />
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <EditUserForm
          user={currentUser}
          onSubmit={editUser}
          onClose={() => setOpenEdit(false)}
        />
      </Dialog>
    </div>
  );
};

// Add User Form Component
const AddUserForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <DialogContent>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Role"
        name="role"
        fullWidth
        margin="normal"
        value={formData.role}
        onChange={handleChange}
      />
      <TextField
        select
        label="Status"
        name="status"
        fullWidth
        margin="normal"
        value={formData.status}
        onChange={handleChange}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>
      <DialogActions>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit(formData);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

// Edit User Form Component
const EditUserForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <DialogContent>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Role"
        name="role"
        fullWidth
        margin="normal"
        value={formData.role}
        onChange={handleChange}
      />
      <TextField
        select
        label="Status"
        name="status"
        fullWidth
        margin="normal"
        value={formData.status}
        onChange={handleChange}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>
      <DialogActions>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit(formData);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default UserList;
