import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import Authentication from "./pages/Authentication/Authentication";
import Comparer from "./pages/Comparer/Comparer";
import Compte from "./pages/Compte/Compte";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Options from "./pages/Options/Options";
import Result from "./pages/Result/Result";
import VersDemain from "./pages/VersDemain/VersDemain";
import Confirm from "./pages/confirmVehicle/confirmVehicle";
import Habits from "./pages/habits/Habits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/authentication",
        element: <Authentication />,
      },
      {
        path: "/comparer",
        element: <Comparer />,
      },
      {
        path: "/compte",
        element: <Compte />,
      },
      {
        path: "/versdemain",
        element: <VersDemain />,
      },
      {
        path: "/confirm",
        element: <Confirm />,
      },
      {
        path: "/habits",
        element: <Habits />,
      },
      {
        path: "/options",
        element: <Options />,
      },
      {
        path: "/result",
        element: (
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/options",
        element: <Options />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
