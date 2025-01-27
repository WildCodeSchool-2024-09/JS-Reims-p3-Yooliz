import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilAriane from "../../components/FilAriane";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import "./confirmVehicle.css";

function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleData } = location.state;
  const [vehicles] = useState([vehicleData]);

  const handleConfirm = () => {
    navigate("/habits", { state: { vehicleData: vehicles[0] } });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <FilAriane
        currentStep="Matricule"
        progress={{
          Matricule: true,
          Habits: false,
          Options: false,
          Results: false,
        }}
      />
      <h2>Confirmation des informations</h2>
      <div className="box-confirmation">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.license_plate}
            vehicleData={vehicle}
            size="large"
          />
        ))}
        <button
          className="confirmation-button"
          type="button"
          onClick={handleConfirm}
          disabled={vehicles.length === 0}
        >
          Valider et passer à l'étape suivante
        </button>
        <button
          className="modify-button"
          type="button"
          onClick={handleGoBack}
          disabled={vehicles.length === 0}
        >
          Changer mon choix de véhicule
        </button>
      </div>
    </>
  );
}

export default Confirm;
