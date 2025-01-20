import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

type Auth = {
  user: User;
};

function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [confirmpasswordType, setConfirmPasswordType] = useState("password");

  const handlePasswordToggle = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleConfirmPasswordToggle = () => {
    setConfirmPasswordType(
      confirmpasswordType === "password" ? "text" : "password",
    );
  };

  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp: FormEventHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (
        !emailRef.current?.value ||
        !passwordRef.current?.value ||
        !confirmPasswordRef.current?.value
      ) {
        setError("Veuillez remplir tous les champs.");
        return;
      }

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
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
        // After successful signup, automatically log in
        const loginResponse = await fetch(
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

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          setAuth(loginData);
          const redirectTo = location.state?.redirectTo || "/result";
          const navigationState = location.state?.vehicleData
            ? location.state
            : undefined;
          navigate(redirectTo, { state: navigationState });
        } else {
          setError(
            loginData.message || "Erreur lors de la connexion automatique",
          );
        }
      } else {
        setError(data.message || "Erreur lors de la création du compte");
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <h2>Inscription</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp}>
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

          <label htmlFor="confirm-password">Confirmer mot de passe</label>
          <div className="password-input-container">
            <input
              ref={confirmPasswordRef}
              type={confirmpasswordType}
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirmez votre mot de passe"
              required
            />
            <button
              type="button"
              onClick={handleConfirmPasswordToggle}
              className="password-toggle-button"
            >
              {confirmpasswordType === "password" ? (
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
        <button type="submit" className="button-log" disabled={isLoading}>
          {isLoading ? "Création en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
