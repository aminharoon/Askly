import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hook/useauth";
const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 h-[100%] w-[100%] "
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className="w-full py-2 px-4 bg-accent text-black font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2 bg-[#D57C3A] hover:bg-[#C86F32]"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold bg-none border-none cursor-pointer text-[#D57C3A]"
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
