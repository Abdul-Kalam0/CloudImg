import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { PublicRoute } from "./routes/PublicRoute.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import "./index.css";
import { DashboardLayouts } from "./layouts/DashboardLayouts.jsx";
import { Albums } from "./pages/Albums.jsx";
import { Upload } from "./pages/Upload.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Setting } from "./pages/Setting.jsx";
import { CreateAlbum } from "./pages/CreateAlbum.jsx";
import { AlbumDetails } from "./pages/AlbumDetails.jsx";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayouts />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/albums", element: <Albums /> },
          { path: "/upload", element: <Upload /> },
          { path: "/profile", element: <Profile /> },
          { path: "/setting", element: <Setting /> },
          { path: "/create-album", element: <CreateAlbum /> },
          { path: "/albums/:albumId", element: <AlbumDetails /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
