import { useState } from "react";
import api from "../services/api";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

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

      toast.success("Login successfully");

      navigate("/albums");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* GOOGLE LOGIN */

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await api.post(
        "/auth/google",
        {
          credential: credentialResponse.credential,
        },
        { withCredentials: true },
      );

      toast.success("Google login successful");

      navigate("/albums");
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
        {/* LEFT SIDE (Branding) */}

        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-10">
          <img src="/logo.png" alt="CloudImg" className="w-40 mb-6" />

          <h2 className="text-3xl font-bold text-center">CloudImg</h2>

          <p className="mt-3 text-center text-white/90">
            Store • Organize • Share
          </p>

          <p className="text-sm mt-2 text-center text-white/70">
            Your images securely in the cloud
          </p>
        </div>

        {/* RIGHT SIDE (LOGIN FORM) */}

        <div className="p-10 flex flex-col justify-center">
          {/* Logo for mobile */}

          <img
            src="/logo.png"
            alt="CloudImg"
            className="w-28 mb-6 mx-auto md:hidden"
          />

          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </form>

          {/* OR Divider */}

          <div className="flex items-center my-5">
            <div className="flex-grow border-t"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          {/* Google Login */}

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
            />
          </div>

          {/* Register */}

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-600 hover:underline">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
