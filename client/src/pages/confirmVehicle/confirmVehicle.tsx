import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import add_car from "../../assets/images/add.png";
import FilAriane from "../../components/FilAriane";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import "./confirmVehicle.css";

interface Vehicle {
  license_plate: string;
  brand: string;
  model: string;
  engine: {
    power_type: string;
    horsepower: number;
  };
}

function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleData } = location.state;
  const [vehicles, setVehicles] = useState([vehicleData]);
  const [newLicensePlate, setNewLicensePlate] = useState("");

  const handleAddVehicle = async () => {
    const response = await fetch(
      `https://api-yooliz-blush.vercel.app/api/vehicles?license_plate=${newLicensePlate}`,
    );
    if (response.ok) {
      const data = await response.json();
      const newVehicle: Vehicle | undefined = data.find(
        (vehicle: Vehicle) => vehicle.license_plate === newLicensePlate,
      );
      if (newVehicle) {
        setVehicles([...vehicles, newVehicle]);
        setNewLicensePlate("");
      } else {
        alert("No vehicle found with the provided license plate");
      }
    } else {
      alert("Failed to fetch vehicle data");
    }
  };

  const handleConfirm = () => {
    navigate("/habits", { state: { vehicles } });
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
          <VehicleCard key={vehicle.license_plate} vehicleData={vehicle} />
        ))}
        <div className="add-item">
          <input
            type="text"
            placeholder="Entrez une autre plaque d'immatriculation"
            className="matricule_left_input"
            value={newLicensePlate}
            onChange={(e) => setNewLicensePlate(e.target.value)}
          />
          <button
            className="add-item-button"
            type="button"
            onClick={handleAddVehicle}
          >
            <img className="add-car" src={add_car} alt="Add car" />
          </button>
        </div>
        <button
          className="confirmation-button"
          type="button"
          onClick={handleConfirm}
        >
          Valider et passer à l'étape suivante
        </button>
      </div>
    </>
  );
}

export default Confirm;
