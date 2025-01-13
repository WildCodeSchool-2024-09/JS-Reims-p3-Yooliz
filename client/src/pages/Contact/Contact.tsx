import type React from "react";
import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    category: "",
    description: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const errors = { email: "", category: "", description: "" };

    if (!validateEmail(email)) {
      errors.email = "Veuillez entrer une adresse mail valide.";
      valid = false;
    }

    if (category === "") {
      errors.category = "Veuillez sélectionner une catégorie.";
      valid = false;
    }

    if (description.trim() === "") {
      errors.description = "Ce champ est requis.";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/queries`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact_email: email,
              category,
              message: description,
            }),
          },
        );

        if (response.ok) {
          alert("Formulaire soumis");
          setEmail("");
          setCategory("");
          setDescription("");
        } else {
          alert("Erreur lors de la soumission du formulaire");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Erreur lors de la soumission du formulaire");
      }
    }
  };

  return (
    <div className="contact-container">
      <div className="contact">
        <h2>Une question ?</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mail">Votre adresse mail</label>
          <input
            type="email"
            id="mail"
            name="mail"
            placeholder="Votre adresse mail"
            className="contact-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <label htmlFor="categorie">Catégorie de la demande</label>
          <select
            name="categorie"
            id="categorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choisissez une catégorie</option>
            <option value="Renouvelement">Renouvelement de véhicule</option>
            <option value="Flotte">Flotte</option>
            <option value="Besoin">Besoin d'un conseil</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
          <label htmlFor="texte">Description de la demande</label>
          <textarea
            id="texte"
            name="texte"
            placeholder="Entrez votre message ici (500 caractères max)"
            className="contact-zone-text"
            rows={10}
            cols={33}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
          <div className="button-container">
            <button type="submit" className="button-contact">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
