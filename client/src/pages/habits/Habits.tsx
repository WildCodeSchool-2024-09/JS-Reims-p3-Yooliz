import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilAriane from "../../components/FilAriane";
import "./Habits.css";

function Habits() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleData } = location.state || {};

  const [distance, setDistance] = useState("");
  const [option, setOption] = useState("jour");
  const [distanceError, setDistanceError] = useState("");

  const validateNumber = (value: string) => {
    return /^\d*\.?\d*$/.test(value);
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumber(value)) {
      setDistance(value);
      setDistanceError("");
    } else {
      setDistanceError("Veuillez entrer un nombre valide");
    }
  };

  const isFormValid =
    distance !== "" && !distanceError && validateNumber(distance);

  const handleSubmit = () => {
    if (!isFormValid) return;

    const habitsData = {
      distance: Number.parseFloat(distance),
      option,
    };
    navigate("/options", { state: { vehicleData, habitsData } });
  };

  return (
    <>
      <FilAriane
        currentStep="Habits"
        progress={{
          Matricule: true,
          Habits: true,
          Options: false,
          Results: false,
        }}
      />
      <div className="habits">
        <h2>Mes habitudes de déplacement</h2>
        <div className="habits-container">
          <div className="input-container">
            <div className="input-line-container">
              <span>Je parcours en moyenne</span>
              <input
                type="text"
                name="distance"
                placeholder="Ex: 15"
                className={`distance-input ${distanceError ? "error-habits" : ""}`}
                value={distance}
                onChange={handleDistanceChange}
              />
              <span>
                <strong>km</strong> &nbsp;par
              </span>
              <select
                name="frequence"
                className="option"
                value={option}
                onChange={(e) => setOption(e.target.value)}
              >
                <option value="jour">Jour</option>
                <option value="semaine">Semaine</option>
                <option value="mois">Mois</option>
                <option value="an">An</option>
              </select>
            </div>
            {distanceError && (
              <span className="error-message-habits">{distanceError}</span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`validate-button ${!isFormValid ? "disabled" : ""}`}
        >
          Valider
        </button>
      </div>
    </>
  );
}

export default Habits;
