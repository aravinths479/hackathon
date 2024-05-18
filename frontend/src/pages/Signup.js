import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

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
    <div className="container mt-5">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role:</label>
          <select
            className="form-select"
            id="role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            required
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Sign up
        </button>
        {error && <div className="error mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
