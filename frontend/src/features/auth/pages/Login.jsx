import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { useAuth } from "../hook/useauth";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useSelector((state) => state.auth);
  const { handleLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payLaod = {
      email,
      password,
    };
    const res = await handleLogin(payLaod);
    if (!res) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
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
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                value={password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#404040",
                  border: "1px solid #404040",
                }}
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-accent text-black font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#3b82f6" }}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold bg-none border-none cursor-pointer"
              style={{ color: "#3b82f6" }}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
