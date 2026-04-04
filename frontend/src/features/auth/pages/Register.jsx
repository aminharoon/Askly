import React, { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 "
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-lg shadow-xl p-8 border"
          style={{
            backgroundColor: "#1a1a1a",
            borderColor: "#333333",
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#404040",
                  border: "1px solid #404040",
                }}
                placeholder="Choose a username"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#404040",
                  border: "1px solid #404040",
                }}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#404040",
                  border: "1px solid #404040",
                }}
                placeholder="Create a password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              style={{ backgroundColor: "#3b82f6" }}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold bg-none border-none cursor-pointer"
              style={{ color: "#3b82f6" }}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
