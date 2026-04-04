import React from "react";

import { useAuth } from "../../auth/hook/useauth";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const DashBoard = ({ children }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { user, loading } = useSelector((state) => state.auth);

  const Logout = async () => {
    await auth.handleLogout();
    navigate("/login");
  };

  return (
    <>
      <h1>Dashboard </h1>
      <button
        onClick={Logout}
        disabled={loading}
        className="w-full py-2 px-4 bg-accent text-black font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
        style={{ backgroundColor: "#3b82f6" }}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}
        {loading ? "logged out..." : "logout"}
      </button>
    </>
  );
};

export default DashBoard;
