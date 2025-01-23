import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.css";
import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  isAdmin?: boolean;
};

type Auth = {
  user: User;
  message: string;
};

export default function App() {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    if (!auth) {
      const storedAuth = sessionStorage.getItem("auth");

      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
      return;
    }

    sessionStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <div className="app-container">
      <Header />
      <Outlet context={{ setAuth, auth }} />
      <Footer />
    </div>
  );
}
