import "./Options.css";
import { useLocation, useNavigate } from "react-router-dom";
import FilAriane from "../../components/FilAriane";

function Options() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleData, habitsData } = location.state || {};

  const handleSubmit = () => {
    navigate("/result", {
      state: {
        vehicleData,
        habitsData: {
          ...habitsData,
          fuelPrice: 1.8,
          electricityPrice: 0.15,
        },
      },
    });
  };

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
        <div className="option-cont">
          <div className="options-sub-container">
            <label htmlFor="date" className="options-label">
              Date prévisionnelle du renouvellement de la flotte ou du vehicule
              ?
            </label>
            <select name="date" id="date" className="options-select">
              <option value="3-mois">3 mois</option>
              <option value="3-mois">6 mois</option>
              <option value="3-mois">1 an</option>
            </select>
            <label htmlFor="date" className="options-label">
              Envisageriez-vous une marque différente ?
            </label>
            <input
              type="text"
              name="options"
              placeholder="Ex: Mercedes"
              autoComplete="off"
              className="options-input"
            />
            <label htmlFor="text" className="options-label">
              Modifications des déplacements
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
              <input
                type="text"
                name="options"
                list="options"
                autoComplete="off"
                placeholder="Fréquence"
                className="options-input"
              />
              <select id="options" className="options-select">
                <option>Quotidien</option>
                <option>Hebdomadaire</option>
                <option>Mensuel</option>
                <option>Annuel</option>
              </select>
            </div>
          </div>
          <div className="right-cont">
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
              <option>Privé</option>
              <option>Professionnel</option>
              <option>Mixte</option>
            </select>
            <label htmlFor="text" className="options-label">
              Si mixte, merci de préciser
            </label>
            <select name="options" className="options-input" defaultValue="Non">
              <option value="Non">Non</option>
              <option value="Oui">Oui</option>
            </select>
          </div>
        </div>
      </form>
      <div className="options-button">
        <button type="button" onClick={handleSubmit} className="next-page">
          Valider
        </button>
      </div>
    </>
  );
}

export default Options;
