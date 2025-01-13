import "./Options.css";
import { Link } from "react-router-dom";
import FilAriane from "../../components/FilAriane";

function Options() {
  return (
    <>
      <div className="options-container">
        <FilAriane
          currentStep="Options"
          progress={{
            Matricule: true,
            Habits: true,
            Options: true,
            Results: false,
          }}
        />
        <h2 className="options-h2">Des Options ?</h2>
      </div>
      <form action="">
        <div className="options-sub-container">
          <label htmlFor="date" className="options-label">
            Date prévisionnel du renouvellement de la flotte ou du vehicule ?
          </label>
          <select name="date" id="date" className="options-select">
            <option value="3-mois">3 mois</option>
            <option value="3-mois">6 mois</option>
            <option value="3-mois">1 an</option>
          </select>
          <label htmlFor="date" className="options-label">
            Quelle est votre marque de voiture préférée ?
          </label>
          <input
            type="text"
            name="options"
            placeholder="Ex: Mercedes"
            autoComplete="off"
            className="options-input"
          />
          <label htmlFor="text" className="options-label">
            Nouvelles habitudes de roulage
          </label>
          <div className="options-roulage-container">
            <input
              type="text"
              name="options"
              list="options"
              autoComplete="off"
              placeholder="Ex: 20km"
              className="options-input"
            />
            <select id="options" className="options-select">
              <option>jour</option>
              <option>mois</option>
              <option>année</option>
            </select>
            <input
              type="text"
              name="options"
              list="options"
              autoComplete="off"
              placeholder="Fréquences"
              className="options-input"
            />
            <select id="options" className="options-select">
              <option>jour</option>
              <option>mois</option>
              <option>année</option>
            </select>
          </div>
          <div className="right">
            <label htmlFor="text" className="options-label">
              Coût de l'assurance à l'année
            </label>
            <input
              type="text"
              name="options"
              list="options-2"
              autoComplete="off"
              placeholder="Ex: 840€"
              className="options-input"
            />
            <label htmlFor="text" className="options-label">
              Type de déplacements
            </label>
            <select id="mode-de-vie" className="options-select">
              <option>privé</option>
              <option>travail</option>
              <option>proffesionnel</option>
              <option>mixte</option>
            </select>
            <label htmlFor="text" className="options-label">
              Si mixte
            </label>
            <input
              type="text"
              name="options"
              placeholder="Si mixte faites nous le savoir"
              className="options-input"
            />
          </div>
        </div>
      </form>
      <div className="options-button">
        <Link to="/log" className="next-page">
          Valider
        </Link>
      </div>
    </>
  );
}

export default Options;
