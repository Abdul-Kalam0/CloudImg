import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { PublicRoute } from "./routes/PublicRoute.jsx";
import "./index.css";
import { DashboardLayouts } from "./layouts/DashboardLayouts.jsx";
import { Albums } from "./pages/Albums.jsx";
import { Profile } from "./pages/Profile.jsx";
import { SharedWithMe } from "./pages/SharedWithMe.jsx";
import { CreateAlbum } from "./pages/CreateAlbum.jsx";
import { AlbumDetails } from "./pages/AlbumDetails.jsx";
import { UploadImage } from "./pages/UploadImage.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayouts />,
        children: [
          { path: "/albums", element: <Albums /> },
          { path: "/profile", element: <Profile /> },
          { path: "/shared-with-me", element: <SharedWithMe /> },
          { path: "/create-album", element: <CreateAlbum /> },
          { path: "/albums/:albumId", element: <AlbumDetails /> },
          { path: "/albums/:albumId/upload", element: <UploadImage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  </GoogleOAuthProvider>,
);
