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
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/login`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setAuth(data);
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error(error);
        setAuth(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <Outlet context={{ setAuth, auth }} />
      <Footer />
    </div>
  );
}
