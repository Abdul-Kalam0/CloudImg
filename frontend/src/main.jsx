import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";

const router = createBrowserRouter([
  { path: "/app", element: <App /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
