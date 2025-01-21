import "./CardResultRed.css";

interface CardResultRedProps {
  title: string;
  vehicleImage: string;
  vehicleName: string;
  costs: {
    fuel: string;
    total: string;
  };
  emissions: {
    co2: string;
    difference: string;
  };
  consumption: string;
}

function CardResultRed({
  title,
  vehicleImage,
  vehicleName,
  costs,
  emissions,
  consumption,
}: CardResultRedProps) {
  return (
    <div className="card_red">
      <div className="card_red_content">
        <h2>{title}</h2>
        <img src={vehicleImage} alt={vehicleName} />
        <div className="card_red_info">
          <h3>{vehicleName}</h3>
          <div className="info_section">
            <h4>Coûts</h4>
            <p>Carburant : {costs.fuel}</p>
            <p>Total : {costs.total}</p>
          </div>
          <div className="info_section">
            <h4>Émissions</h4>
            <p>CO2 : {emissions.co2}</p>
            <p>{emissions.difference}</p>
          </div>
          <div className="info_section">
            <h4>Consommation</h4>
            <p>{consumption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardResultRed;
