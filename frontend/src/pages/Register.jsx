import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    e.preventDefault();
    try {
      setLoading(true);
      api.post("/auth/register", form);
      navigate("/login");
      alert("Registered successfully");
    } catch (error) {
      alert(error.response?.data.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="name">User Name</label> <br />
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            minLength={2}
            maxLength={50}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email">Email</label> <br />
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter you email"
            required
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">Password</label> <br />
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            minLength={8}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};
