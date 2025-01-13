import "./Result.css";
import CardResultGreen from "../../components/CardResultGreen/CardResultGreen";
import CardResultRed from "../../components/CardResultRed/CardResultRed";
import FilAriane from "../../components/FilAriane";

function Result() {
  return (
    <>
      <div className="result_container">
        <FilAriane
          currentStep="Results"
          progress={{
            Matricule: true,
            Habits: true,
            Options: true,
            Results: true,
          }}
        />
        <h2>Resultat</h2>
        <div className="all-grid-container">
          <div className="grid-red-container">
            <div className="grid-red-item">valeur</div>
            <div className="grid-red-col-top">valeur</div>
            <div className="grid-red-item">valeur</div>
            <div className="grid-red-item">valeur</div>
            <div className="grid-red-item">valeur</div>
            <div className="grid-red-item">valeur</div>
            <div className="grid-red-item">valeur</div>
            <div className="grid-red-row">valeur</div>
            <div className="grid-red-col-bottom">valeur</div>
          </div>
          <div className="grid-green-container">
            <div className="grid-green-item">valeur</div>
            <div className="grid-green-item">valeur</div>
            <div className="grid-green-col-top">valeur</div>
            <div className="grid-green-item">valeur</div>
            <div className="grid-green-item">valeur</div>
            <div className="grid-green-item">valeur</div>
            <div className="grid-green-item">valeur</div>
            <div className="grid-green-row">valeur</div>
            <div className="grid-green-col-bottom">valeur</div>
          </div>
        </div>
        <div className="result_card_container">
          <CardResultGreen />
          <CardResultRed />
        </div>
      </div>
    </>
  );
}

export default Result;
