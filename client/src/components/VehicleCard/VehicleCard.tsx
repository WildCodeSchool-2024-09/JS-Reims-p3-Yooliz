import type { Vehicle } from "../../types/types";
import "./VehicleCard.css";

type VehicleCardProps = {
  vehicle: Partial<Vehicle>;
};

function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="vehicle-card">
      <img
        className="vehicle-image"
        src={vehicle?.imageUrl}
        alt={`${vehicle.brand} ${vehicle.model}`}
      />
      <h2 className="vehicle-name">
        {vehicle.brand} {vehicle.model}
      </h2>
      <div className="vehicle-description">
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Immatriculation <span className="two-points">:</span>
          </span>
          <span className="value">{vehicle.licensePlate}</span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Carburant <span className="two-points">:</span>
          </span>
          <span className="value">
            {vehicle?.powerType === "essence" ? "essence" : "diesel"}
          </span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Puissance <span className="two-points">:</span>
          </span>
          <span className="value">{vehicle.horsepower} chevaux</span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Prix <span className="two-points">:</span>
          </span>
          <span className="value">
            {vehicle.price?.toLocaleString("fr-FR")} €
          </span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Consommation <span className="two-points">:</span>
          </span>
          <span className="value">
            {vehicle.consumption}{" "}
            {vehicle.powerType === "électrique" ? "kWh/100km" : "L/100km"}
          </span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Distance mensuelle <span className="two-points">:</span>
          </span>
          <span className="value">{vehicle.drivenDistance} km</span>
        </div>
        <div className="vehicle-detail">
          <span className="vehicle-data-label">
            Empreinte carbone <span className="two-points">:</span>
          </span>
          <span className="value">{vehicle.carbonFootprint} g/km</span>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
