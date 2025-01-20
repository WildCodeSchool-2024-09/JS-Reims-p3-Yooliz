import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn: FormEventHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!emailRef.current?.value || !passwordRef.current?.value) {
        setError("Veuillez remplir tous les champs.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setAuth(data);
        const redirectTo = location.state?.redirectTo || "/result";
        const navigationState = location.state?.vehicleData
          ? location.state
          : undefined;
        navigate(redirectTo, { state: navigationState });
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
      {error && <p className="error-message">{error}</p>}
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
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              required
            />
            <button type="button" className="password-toggle-button">
              <img
                src="./src/assets/icons/close-eye.png"
                alt="Show password"
                className="password-icon"
              />
            </button>
          </div>
        </div>
        <button type="submit" className="button-log" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
