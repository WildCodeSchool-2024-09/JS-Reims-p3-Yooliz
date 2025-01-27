import "./VehicleCard.css";
import { useState } from "react";

interface VehicleData {
  id: number;
  brand: string;
  model: string;
  license_plate: string;
  engine: {
    power_type: string;
    horsepower: number;
  };
  price: number;
  car_picture: string;
}

type VehicleCardProps = {
  vehicleData: VehicleData;
  size: "small" | "large";
};

function VehicleCard({ vehicleData, size }: VehicleCardProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  if (!vehicleData || !vehicleData.engine) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    fetch(`http://localhost:3310/api/vehicles/${vehicleData.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsDeleted(true);
        } else {
          console.error("Failed to delete vehicle");
        }
      })
      .catch((error) => {
        console.error("Error deleting vehicle:", error);
      });
    setIsDeleted(!isDeleted);
  };

  if (isDeleted) {
    return <div className="vehicle-card-suppressed" />;
  }

  return (
    <div
      className={`vehicle-card card-size--${size} ${isDeleted ? "deleted" : ""}`}
    >
      <button
        type="button"
        onClick={handleDelete}
        className={`delete-button ${isDeleted ? "hidden" : ""}`}
      >
        Supprimer
      </button>
      <img
        className="vehicle-image"
        src={vehicleData.car_picture}
        alt={`${vehicleData.brand} ${vehicleData.model}`}
      />
      <h2 className="vehicle-name">
        {vehicleData.brand} {vehicleData.model}
      </h2>
      <div className="vehicle-description">
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Immatriculation <span className="two-points">:</span>
          </span>
          <span className="value">{vehicleData.license_plate}</span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Carburant <span className="two-points">:</span>
          </span>
          <span className="value">{vehicleData.engine.power_type}</span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Puissance <span className="two-points">:</span>
          </span>
          <span className="value">{vehicleData.engine.horsepower} chevaux</span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Prix <span className="two-points">:</span>
          </span>
          <span className="value">{vehicleData.price} €</span>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
