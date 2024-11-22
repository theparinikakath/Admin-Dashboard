import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import EditRoleForm from "./EditRoleForm";
import AddRoleForm from "./AddRoleForm";

const RoleList = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
    { id: 4, name: "Contributor", permissions: ["Write"] },
    { id: 5, name: "Moderator", permissions: ["Read", "Delete"] },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPermission, setFilterPermission] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // State for sorting order
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const openEditDialog = (role) => {
    setSelectedRole(role); // Set the selected role to edit
    setOpenEdit(true); // Open the edit dialog
  };

  const closeEditDialog = () => {
    setOpenEdit(false); // Close the edit dialog
    setSelectedRole(null); // Reset selected role
  };

  // Filter roles based on search term and selected permission
  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPermission =
      !filterPermission || role.permissions.includes(filterPermission);

    return matchesSearch && matchesPermission;
  });

  // Sort roles by number of permissions
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.permissions.length - b.permissions.length;
    }
    if (sortOrder === "desc") {
      return b.permissions.length - a.permissions.length;
    }
    return 0; // Default: no sorting
  });

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#f0f8ff", // Light background color
        minHeight: "100vh",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
      }}
    >
      <h2 className="text-center text-primary mb-5">Role Management</h2>

      {/* Filters, Search, and Sorting */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search roles by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "30%" }}
        />
        <Form.Select
          value={filterPermission}
          onChange={(e) => setFilterPermission(e.target.value)}
          style={{ width: "30%" }}
        >
          <option value="">Filter by permission</option>
          <option value="Read">Read</option>
          <option value="Write">Write</option>
          <option value="Delete">Delete</option>
        </Form.Select>
        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ width: "30%" }}
        >
          <option value="">Sort by permissions</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Select>
      </div>

      {/* Roles Table */}
      <Table striped bordered hover responsive className="mb-4">
        <thead className="bg-primary text-white">
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openEditDialog(role)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteRole(role.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Role Button */}
      <div className="text-center mb-4">
        <Button variant="success" size="lg" onClick={() => setOpenAdd(true)}>
          Add Role
        </Button>
      </div>

      {/* Add Role Modal */}
      <Modal show={openAdd} onHide={() => setOpenAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddRoleForm setRoles={setRoles} onClose={() => setOpenAdd(false)} />
        </Modal.Body>
      </Modal>

      {/* Edit Role Modal */}
      <Modal show={openEdit} onHide={closeEditDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditRoleForm
            role={selectedRole}
            setRoles={setRoles}
            onClose={closeEditDialog}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoleList;
