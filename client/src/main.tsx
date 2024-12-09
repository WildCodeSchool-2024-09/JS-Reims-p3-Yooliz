// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Comparer from "./pages/Comparer/Comparer";
import Compte from "./pages/Compte/Compte";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";

/* ************************************************************************* */

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
        path: "/comparer",
        element: <Comparer />,
      },
      {
        path: "/compte",
        element: <Compte />,
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "*",
        element: <div>Page non trouvée</div>,
      },
    ],
  },
]);

/* ************************************************************************* */

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
