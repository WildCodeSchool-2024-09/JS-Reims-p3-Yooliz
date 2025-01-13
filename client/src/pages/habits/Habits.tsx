import { Link } from "react-router-dom";
import FilAriane from "../../components/FilAriane";
import "./Habits.css";

function Habits() {
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
        <h2>Mes habitudes</h2>
        <div className="habits-container">
          <div className="input-container">
            <label htmlFor="distance"> distance</label>
            <input
              type="text"
              name="distance"
              id="distance"
              className="distance-input"
            />
          </div>
          <p>km</p>
          <div className="input-container">
            <label htmlFor="frequence"> frequence</label>
            <input
              type="text"
              name="frequence"
              id="frequence"
              className="frequence-input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="frequence"> </label>
            <select name="option" id="habits-option" className="option">
              <option value="jour">jours </option>
              <option value="mois">mois </option>
              <option value="années">années </option>
            </select>
          </div>
        </div>
        <div className="habits-container">
          <div className="input-container">
            <label htmlFor="distance"> distance</label>
            <input
              type="text"
              name="distance"
              id="distance"
              className="distance-input"
            />
          </div>
          <p>km</p>
          <div className="input-container">
            <label htmlFor="frequence"> frequence</label>
            <input
              type="text"
              name="frequence"
              id="frequence"
              className="frequence-input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="frequence"> </label>
            <select name="option" id="habits-option" className="option">
              <option value="jour">jours </option>
              <option value="mois">mois </option>
              <option value="années">années </option>
            </select>
          </div>
        </div>
        <div className="options-button">
          <Link to="/options" className="next-page">
            Valider
          </Link>
        </div>
      </div>
    </>
  );
}

export default Habits;
