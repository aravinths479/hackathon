import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Alert, Form, Button, Container } from 'react-bootstrap';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("buyer"); // Default role

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, firstName, lastName, phone, role, password);
  };

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <Form.Group controlId="email">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Form.Group controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Role:</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Form.Control>
        </Form.Group>
        <br />

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign up'}
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
