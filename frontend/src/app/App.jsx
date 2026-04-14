import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hook/useauth";
import { useSelector } from "react-redux";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.handleGetMe();
  }, []);

  return (
    <div className="h-screen w-screen bg-[#111111] flex justify-center items-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
