import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const ProfileUpdate = () => {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    role: user.role,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, phone } = formData;

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      return 'First name should contain only letters';
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      return 'Last name should contain only letters';
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      return 'Phone number should contain 10 digits';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_API}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess('Profile updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Update Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
        
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
        
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
        
          />
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData.role}
            onChange={handleChange}
        
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileUpdate;
