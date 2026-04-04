import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hook/useauth";
import { useSelector } from "react-redux";

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log("user is : ", user);

  const auth = useAuth();

  useEffect(() => {
    auth.handleGetMe();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
