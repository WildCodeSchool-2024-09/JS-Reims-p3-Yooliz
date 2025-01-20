import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

type Auth = {
  user: User;
};

function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordType, setPasswordType] = useState("password");
  const { setAuth } = useOutletContext() as {
    setAuth: (auth: Auth | null) => void;
  };

  const handlePasswordToggle = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn: FormEventHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("L'adresse email est invalide.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );

      if (response.ok) {
        const auth = await response.json();
        setAuth(auth);
        navigate("/");
      } else if (response.status === 401) {
        setErrorMessage("Identifiants incorrects.");
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setErrorMessage(
        "Impossible de se connecter. Veuillez vérifier votre connexion.",
      );
    }
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
      <form onSubmit={handleSignIn}>
        <div className="log-input-container">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            placeholder="Votre email"
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <div className="password-input-container">
            <input
              ref={passwordRef}
              type={passwordType}
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              required
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="password-toggle-button"
            >
              {passwordType === "password" ? (
                <img
                  src="./src/assets/icons/close-eye.png"
                  alt="Show password"
                  className="password-icon"
                />
              ) : (
                <img
                  src="./src/assets/icons/view.png"
                  alt="Hide password"
                  className="password-icon"
                />
              )}
            </button>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="button-log">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default SignIn;
