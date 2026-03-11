import { useState } from "react";
import api from "../services/api";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/login", form);
      alert("Login successfully");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data.message || "Login failed");
    }
  };
  return (
    <div>
      <h1>Welcome! Login </h1>
      <form onSubmit={handleLogin}>
        {/* email */}
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        {/* password */}
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loging..." : "Login"}
        </button>
        <h6>
          Don't have accout? <NavLink to={"/register"}>Register</NavLink>
        </h6>
      </form>
    </div>
  );
};
