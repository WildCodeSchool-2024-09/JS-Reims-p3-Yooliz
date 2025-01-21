import "./CardResultGreen.css";

interface CardResultGreenProps {
  title: string;
  vehicleImage: string;
  vehicleName: string;
  costs: {
    electricity: string;
    savings: string;
  };
  emissions: {
    difference: string;
  };
  consumption: string;
  autonomy: string;
}

function CardResultGreen({
  title,
  vehicleImage,
  vehicleName,
  costs,
  emissions,
  consumption,
  autonomy,
}: CardResultGreenProps) {
  return (
    <div className="card_green">
      <div className="card_green_content">
        <h2>{title}</h2>
        <img src={vehicleImage} alt={vehicleName} />
        <div className="card_green_info">
          <h3>{vehicleName}</h3>
          <div className="info_section">
            <h4>Coûts</h4>
            <p>Électricité : {costs.electricity}</p>
            <p>Économies : {costs.savings}</p>
          </div>
          <div className="info_section">
            <h4>Émissions</h4>
            <p>{emissions.difference}</p>
          </div>
          <div className="info_section">
            <h4>Performance</h4>
            <p>Consommation : {consumption}</p>
            <p>Autonomie : {autonomy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardResultGreen;
