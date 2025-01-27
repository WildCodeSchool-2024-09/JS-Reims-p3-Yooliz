import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import CardResultGreen from "../../components/CardResultGreen/CardResultGreen";
import CardResultRed from "../../components/CardResultRed/CardResultRed";
import { useComparison } from "../../context/ComparisonContext";
import "./MonComparatif.css";

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

type Auth = {
  user: User;
};

function MonComparatif() {
  const navigate = useNavigate();
  const { lastComparison } = useComparison();
  const [selectedFrequency, setSelectedFrequency] = useState<string>(
    lastComparison?.calculations.frequency || "jour",
  );
  const { auth } = useOutletContext<{ auth: Auth }>();

  if (!auth?.user) {
    return <Navigate to="/authentication" />;
  }

  if (!lastComparison) {
    return (
      <div className="no-comparison-container">
        <div className="no-comparison">
          <h2>Aucune comparaison trouvée</h2>
          <p>
            Nous vous invitons à cliquer sur notre logo et effectuer une
            comparaison afin de voir celle-ci s'afficher ici.
          </p>
        </div>
      </div>
    );
  }

  function normalizeToDaily(value: number, originalFrequency: string): number {
    const frequencies = {
      jour: 1,
      semaine: 7,
      mois: 30,
      an: 365,
    };

    return (
      value / (frequencies[originalFrequency as keyof typeof frequencies] || 1)
    );
  }

  function formatFrequency(
    cost: number,
    originalFrequency: string,
    targetFrequency: string,
  ): string {
    const frequencies = {
      jour: 1,
      semaine: 7,
      mois: 30,
      an: 365,
    };

    const dailyValue = normalizeToDaily(cost, originalFrequency);

    const factor =
      frequencies[targetFrequency as keyof typeof frequencies] || 1;
    const formattedCost = (dailyValue * factor).toFixed(2);

    return `${formattedCost} €/${targetFrequency}`;
  }

  return (
    <div className="result_container">
      <h2>Ma dernière comparaison</h2>

      <div className="annual_summary">
        <div className="summary-header">
          <h3>Bilan</h3>
          <select
            className="frequency-select"
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
          >
            <option value="jour">Quotidien</option>
            <option value="semaine">Hebdomadaire</option>
            <option value="mois">Mensuel</option>
            <option value="an">Annuel</option>
          </select>
        </div>

        <p>
          Coût en carburant :{" "}
          {formatFrequency(
            lastComparison.calculations.fuelCost,
            lastComparison.calculations.frequency,
            selectedFrequency,
          )}
        </p>
        <p>
          Coût en électricité :{" "}
          {formatFrequency(
            lastComparison.calculations.electricCost,
            lastComparison.calculations.frequency,
            selectedFrequency,
          )}
        </p>
        <p>
          Distance : {lastComparison.calculations.distance} km par{" "}
          {lastComparison.calculations.frequency}
        </p>
        <p>
          <strong>Économies potentielles :</strong>{" "}
          {formatFrequency(
            lastComparison.calculations.savings,
            lastComparison.calculations.frequency,
            selectedFrequency,
          )}
        </p>
        <p>
          <strong>Réduction d'émissions de CO2 :</strong>{" "}
          {lastComparison.calculations.co2Emission.toFixed(0)} kg par an
        </p>
      </div>
      <button
        type="button"
        className="makenew-button"
        onClick={() => navigate("/")}
      >
        Faire une nouvelle comparaison
      </button>
      <div className="result_cards">
        <CardResultRed
          title="Votre véhicule actuel"
          vehicleName={`${lastComparison.vehicleData.brand} ${lastComparison.vehicleData.model}`}
          vehicleImage={lastComparison.vehicleData.car_picture}
          costs={{
            fuel: formatFrequency(
              lastComparison.calculations.fuelCost,
              lastComparison.calculations.frequency,
              "jour",
            ),
            total: formatFrequency(
              lastComparison.calculations.fuelCost,
              lastComparison.calculations.frequency,
              selectedFrequency,
            ),
          }}
          emissions={{
            co2: `${lastComparison.calculations.co2Emission.toFixed(0)} kg CO2`,
            difference: `+${lastComparison.calculations.co2Emission.toFixed(0)} kg CO2`,
          }}
          consumption={`${lastComparison.vehicleData.engine.consumption}L/100km`}
        />

        <CardResultGreen
          title="Alternative électrique"
          vehicleName={`${lastComparison.electricVehicle?.brand} ${lastComparison.electricVehicle?.model}`}
          vehicleImage={lastComparison.electricVehicle?.car_picture || ""}
          costs={{
            electricity: formatFrequency(
              lastComparison.calculations.electricCost,
              lastComparison.calculations.frequency,
              "jour",
            ),
            savings: formatFrequency(
              lastComparison.calculations.savings,
              lastComparison.calculations.frequency,
              selectedFrequency,
            ),
          }}
          emissions={{
            difference: `${lastComparison.calculations.co2Emission.toFixed(0)} kg CO2 économisés`,
          }}
          consumption={`${lastComparison.electricVehicle?.engine.consumption || 0}kWh/100km`}
          autonomy={`${lastComparison.electricVehicle?.engine.autonomy_km || 0} km`}
        />
      </div>
    </div>
  );
}

export default MonComparatif;
