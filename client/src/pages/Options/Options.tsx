import "./Options.css";
import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import FilAriane from "../../components/FilAriane";

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

function Options() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useOutletContext<{ auth: Auth | null }>();
  const { vehicleData, habitsData } = location.state || {};

  const [insuranceCost, setInsuranceCost] = useState("");
  const [tripType, setTripType] = useState("");
  const [mixedTripDetails, setMixedTripDetails] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [differentBrand, setDifferentBrand] = useState("");
  const [tripModifications, setTripModifications] = useState("");

  const handleSubmit = () => {
    const optionsData = {
      insuranceCost: insuranceCost ? Number.parseFloat(insuranceCost) : null,
      tripType: tripType || null,
      mixedTripDetails: mixedTripDetails || null,
      renewalDate: renewalDate || null,
      differentBrand: differentBrand || null,
      tripModifications: tripModifications || null,
    };

    if (!auth) {
      navigate("/authentication", {
        state: {
          redirectTo: "/result",
          vehicleData,
          habitsData,
          optionsData,
        },
      });
    } else {
      navigate("/result", {
        state: {
          vehicleData,
          habitsData,
          optionsData,
          user: auth.user,
        },
      });
    }
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
        <p className="options-p">
          Ces informations nous aideront à personnaliser nos conseils. <br />{" "}
          Vous pouvez les ignorer et passer directement au calcul de vos
          économies.
        </p>
      </div>
      <form action="" className="options-form">
        <fieldset className="options-section">
          <legend className="options-legend">Informations Génériques</legend>
          <label htmlFor="date" className="options-label">
            Date prévisionnelle du renouvellement ?
          </label>
          <select
            name="date"
            id="date"
            className="options-select"
            value={renewalDate}
            onChange={(e) => setRenewalDate(e.target.value)}
          >
            <option value="">Sélectionnez une option</option>
            <option value="3-mois">3 mois</option>
            <option value="6-mois">6 mois</option>
            <option value="1-an">1 an</option>
          </select>

          <label htmlFor="differentBrand" className="options-label">
            Souhaitez-vous changer de marque ?
          </label>
          <input
            type="text"
            id="differentBrand"
            placeholder="Ex: Mercedes"
            className="options-input"
            value={differentBrand}
            onChange={(e) => setDifferentBrand(e.target.value)}
          />

          <label htmlFor="insuranceCost" className="options-label">
            Coût de l'assurance à l'année
          </label>
          <input
            type="text"
            id="insuranceCost"
            placeholder="Ex: 840€"
            className="options-input"
            value={insuranceCost}
            onChange={(e) => setInsuranceCost(e.target.value)}
          />
        </fieldset>

        <fieldset className="options-section">
          <legend className="options-legend">
            Options liées aux Déplacements
          </legend>
          <label htmlFor="tripType" className="options-label">
            Type de déplacements
          </label>
          <select
            id="tripType"
            className="options-select"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="">Sélectionnez une option</option>
            <option value="Privé">Privé</option>
            <option value="Professionnel">Professionnel</option>
            <option value="Mixte">Mixte</option>
          </select>

          {tripType === "Mixte" && (
            <>
              <label htmlFor="mixedTripDetails" className="options-label">
                Si mixte, merci de préciser
              </label>
              <select
                id="mixedTripDetails"
                className="options-input"
                value={mixedTripDetails}
                onChange={(e) => setMixedTripDetails(e.target.value)}
              >
                <option value="Non">Non</option>
                <option value="Oui">Oui</option>
              </select>
            </>
          )}

          <label htmlFor="tripModifications" className="options-label">
            Modifications des déplacements
          </label>
          <div className="options-roulage-container">
            <input
              type="text"
              id="tripModifications"
              placeholder="Ex: 20km"
              className="options-input"
              value={tripModifications}
              onChange={(e) => setTripModifications(e.target.value)}
            />
            <select id="tripFrequency" className="options-select">
              <option>Quotidien</option>
              <option>Hebdomadaire</option>
              <option>Mensuel</option>
              <option>Annuel</option>
            </select>
          </div>
        </fieldset>
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
