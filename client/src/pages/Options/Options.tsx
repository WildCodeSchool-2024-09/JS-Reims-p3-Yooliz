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
      <div className="options-sub-container">
        <label htmlFor="date" className="options-label">
          <p className="options-p">
            Date provisionnel du renouvellement de la flotte ou du vehicule ?{" "}
          </p>
          <input type="date" id="date" name="date" className="options-input" />
        </label>
        <label htmlFor="text" className="options-label">
          <p className="options-p">Autres options ? </p>
          <input
            type="text"
            name="options"
            list="options"
            autoComplete="off"
            placeholder="option-1"
            className="options-input"
          />
          <datalist id="options">
            <option>#</option>
            <option>#</option>
            <option>#</option>
            <option>#</option>
            <option>#</option>
          </datalist>
        </label>
        <label htmlFor="text" className="options-label">
          <p className="options-p">Autres options ? </p>
          <input
            type="text"
            name="options"
            list="options-2"
            autoComplete="off"
            placeholder="option-2"
            className="options-input"
          />
          <datalist id="options-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </datalist>
        </label>
      </div>
      <div className="options-button">
        <Link to="/" className="next-page">
          Valider
        </Link>
      </div>
    </>
  );
}

export default Options;
