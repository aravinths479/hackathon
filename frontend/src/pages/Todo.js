import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Table, Button, Modal, Form } from "react-bootstrap";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedCompleted, setUpdatedCompleted] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch todos from server when component mounts
    const fetchTodo = async () => {
      const response = await fetch("/api/todo", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      setTodos(json);
    };
    if (user) {
      fetchTodo();
    }
  }, [user]);

  const openEditModal = (todo) => {
    setEditTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
    setUpdatedCompleted(todo.completed);
  };

  const closeEditModal = () => {
    setEditTodo(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
    setUpdatedCompleted(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/todo/${editTodo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          completed: updatedCompleted,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      const updatedTodo = await response.json();
      // Update todo in state
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todo/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      // Remove deleted todo from state
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          completed: updatedCompleted,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      const createdTodo = await response.json();
      // Add the created todo to the state
      setTodos([...todos, createdTodo]);
      // Reset the form fields and close the modal
      setUpdatedTitle("");
      setUpdatedDescription("");
      setUpdatedCompleted(false);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
  

  return (
    <div>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>Create Todo</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
              <td>{new Date(todo.createdAt).toLocaleString()}</td>
              <td>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={() => openEditModal(todo)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteTodo(todo._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={!!editTodo} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Completed"
              checked={updatedCompleted}
              onChange={(e) => setUpdatedCompleted(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Completed"
              checked={updatedCompleted}
              onChange={(e) => setUpdatedCompleted(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreate}>
            Create Todo
          </Button>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todo;
