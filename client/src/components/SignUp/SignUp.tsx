import { useRef } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { WebsiteUser } from "../../types/types";

function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { setUser } = useOutletContext<{
    setUser: (user: WebsiteUser | null) => void;
  }>();
  const navigate = useNavigate();

  const handleSignUp: FormEventHandler = async (event) => {
    event.preventDefault();

    if (
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        },
      );

      if (response.status === 201) {
        alert("Compte créé avec succès !");
        setUser(null);
        navigate("/log");
      } else {
        alert("Erreur lors de la création du compte.");
      }
    } catch (err) {
      alert("Une erreur s'est produite. Veuillez réessayer.");
      console.error(err);
    }
  };

  return (
    <div className="register">
      <h2>Inscription</h2>
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
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            placeholder="Votre mot de passe"
            required
          />
          <label htmlFor="confirm-password">Confirmer mot de passe</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirmez votre mot de passe"
            required
          />
        </div>
        <button type="submit" className="button-log">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default SignUp;
