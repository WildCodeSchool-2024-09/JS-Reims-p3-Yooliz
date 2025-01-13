import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.css";
import { useState } from "react";
import type { WebsiteUser } from "./types/types";

export default function App() {
  const [user, setUser] = useState<WebsiteUser | null>(null);

  const handleSetUser = (newUser: WebsiteUser | null) => {
    setUser(newUser);
  };

  return (
    <div className="app-container">
      <Header />
      <Outlet context={{ setUser: handleSetUser, user }} />
      <Footer />
    </div>
  );
}
