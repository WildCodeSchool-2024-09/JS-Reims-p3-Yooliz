import "./VehicleCard.css";

interface VehicleData {
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
};

function VehicleCard({ vehicleData }: VehicleCardProps) {
  if (!vehicleData || !vehicleData.engine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vehicle-card">
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
