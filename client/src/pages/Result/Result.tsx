import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardResultGreen from "../../components/CardResultGreen/CardResultGreen";
import CardResultRed from "../../components/CardResultRed/CardResultRed";
import FilAriane from "../../components/FilAriane";
import "./Result.css";

interface Vehicle {
  brand: string;
  model: string;
  car_picture: string;
  engine: {
    power_type: string;
    consumption: number;
  };
}

interface ElectricVehicle extends Vehicle {
  car_picture: string;
  engine: {
    power_type: string;
    consumption: number;
    autonomy_km: number;
  };
}

interface ComparisonData {
  fuelCost: number;
  electricCost: number;
  savings: number;
  co2Emission: number;
  electricConsumption: number;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const multipliers = { jour: 1, semaine: 7, mois: 30, an: 365 };
  const { vehicleData, habitsData, optionsData, user } = location.state || {};

  // Validate required data
  useEffect(() => {
    if (!vehicleData || !habitsData || !habitsData.option) {
      navigate("/");
      return;
    }
  }, [vehicleData, habitsData, navigate]);

  const [electricVehicle, setElectricVehicle] =
    useState<ElectricVehicle | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(
    null,
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFrequency, setSelectedFrequency] = useState<
    keyof typeof multipliers
  >((habitsData?.option as keyof typeof multipliers) || "jour");

  const formatFrequency = (value: number, frequency: string) => {
    return `${value.toFixed(2)} € par ${frequency}`;
  };

  useEffect(() => {
    if (!vehicleData || !habitsData) {
      navigate("/");
      return;
    }

    const fetchAndCalculate = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api-yooliz-blush.vercel.app/api/vehicles",
        );
        const data = await response.json();

        const similarElectricVehicle = data.find(
          (vehicle: ElectricVehicle) =>
            vehicle.brand === vehicleData.brand &&
            vehicle.engine.power_type === "électrique",
        );
        setElectricVehicle(similarElectricVehicle || null);

        const fuelPrice = 1.8;
        const electricityPrice = 0.15;
        const totalDistance =
          habitsData.distance *
          multipliers[habitsData.option as keyof typeof multipliers];

        const fuelCost =
          (vehicleData.engine.consumption / 100) *
          habitsData.distance *
          fuelPrice;
        const electricCost = similarElectricVehicle
          ? (similarElectricVehicle.engine.consumption / 100) *
            habitsData.distance *
            electricityPrice
          : 0;

        setComparisonData({
          fuelCost,
          electricCost,
          savings: fuelCost - electricCost,
          co2Emission: vehicleData.engine.consumption * totalDistance * 2.31,
          electricConsumption: similarElectricVehicle
            ? similarElectricVehicle.engine.consumption * totalDistance
            : 0,
        });

        await fetch(`${import.meta.env.VITE_API_URL}/api/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user?.id || 0,
            email: user?.email || "",
            vehicle_brand: vehicleData.brand,
            vehicle_model: vehicleData.model,
            compared_vehicle_brand: similarElectricVehicle?.brand || "",
            compared_vehicle_model: similarElectricVehicle?.model || "",
            yearly_savings: (fuelCost - electricCost) * 365,
            distance: habitsData.distance,
            insurance_cost: optionsData.insuranceCost || null,
            trip_type: optionsData.tripType || null,
            mixed_trip_details: optionsData.mixedTripDetails || null,
            renewal_date: optionsData.renewalDate || null,
            different_brand: optionsData.differentBrand || null,
            trip_modifications: optionsData.tripModifications || null,
          }),
        });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCalculate();
  }, [
    vehicleData,
    habitsData,
    navigate,
    user?.id,
    user?.email,
    optionsData.insuranceCost,
    optionsData.tripType,
    optionsData.mixedTripDetails,
    optionsData.renewalDate,
    optionsData.differentBrand,
    optionsData.tripModifications,
  ]);

  if (isLoading) return <div>Calcul des résultats en cours...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!comparisonData) return <div>Aucune donnée disponible</div>;

  const calculateCost = (
    cost: number,
    originalFrequency: keyof typeof multipliers,
    targetFrequency: keyof typeof multipliers,
  ) => {
    return (
      (cost / multipliers[originalFrequency]) * multipliers[targetFrequency]
    );
  };

  const calculateDistance = (
    distance: number,
    originalFrequency: keyof typeof multipliers,
    targetFrequency: keyof typeof multipliers,
  ) => {
    const distanceMultipliers = {
      jour: { jour: 1, semaine: 1 * 7, mois: 1 * 30, an: 1 * 365 },
      semaine: {
        jour: 1 / 7,
        semaine: 1,
        mois: (1 / 7) * 30,
        an: (1 / 7) * 365,
      },
      mois: { jour: 1 / 30, semaine: (1 / 30) * 7, mois: 1, an: 1 * 12 },
      an: { jour: 1 / 365, semaine: (1 / 365) * 7, mois: 1 / 12, an: 1 },
    };
    return distance * distanceMultipliers[originalFrequency][targetFrequency];
  };

  const fuelCost = calculateCost(
    comparisonData.fuelCost,
    habitsData.option,
    selectedFrequency,
  );
  const electricCost = calculateCost(
    comparisonData.electricCost,
    habitsData.option,
    selectedFrequency,
  );
  const displayDistance = calculateDistance(
    habitsData.distance,
    habitsData.option,
    selectedFrequency,
  );

  if (!vehicleData || !habitsData) {
    return <div>Données manquantes. Redirection...</div>;
  }

  return (
    <>
      <FilAriane
        currentStep="Results"
        progress={{
          Matricule: true,
          Habits: true,
          Options: true,
          Results: true,
        }}
      />
      <div className="result_container">
        <h2>Résultat de la comparaison</h2>
        <div className="annual_summary">
          <div className="summary-header">
            <h3>Bilan</h3>
            <select
              className="frequency-select"
              value={selectedFrequency}
              onChange={(e) =>
                setSelectedFrequency(e.target.value as keyof typeof multipliers)
              }
            >
              <option value="jour">Quotidien</option>
              <option value="semaine">Hebdomadaire</option>
              <option value="mois">Mensuel</option>
              <option value="an">Annuel</option>
            </select>
          </div>
          <p>
            Coût en carburant : {formatFrequency(fuelCost, selectedFrequency)}
          </p>
          <p>
            Coût en électricité :{" "}
            {formatFrequency(electricCost, selectedFrequency)}
          </p>
          <p>
            Distance : {displayDistance.toFixed(0)} km par {selectedFrequency}
          </p>
          <p>
            <strong>Économies potentielles :</strong>{" "}
            {formatFrequency(
              calculateCost(
                comparisonData.savings,
                habitsData.option,
                selectedFrequency,
              ),
              selectedFrequency,
            )}
          </p>
          <p>
            <strong>Réduction d'émissions de CO2 :</strong>{" "}
            {comparisonData.co2Emission.toFixed(0)} kg par an
          </p>
        </div>
        <div className="result_cards">
          <CardResultRed
            title="Votre véhicule actuel"
            vehicleImage={vehicleData.car_picture}
            vehicleName={`${vehicleData.brand} ${vehicleData.model}`}
            costs={{
              fuel: formatFrequency(
                calculateCost(
                  comparisonData.fuelCost,
                  habitsData.option,
                  "jour",
                ),
                "jour",
              ),
              total: formatFrequency(
                calculateCost(
                  comparisonData.fuelCost,
                  habitsData.option,
                  selectedFrequency,
                ),
                selectedFrequency,
              ),
            }}
            emissions={{
              co2: `${comparisonData.co2Emission.toFixed(0)} kg CO2`,
              difference: `+${comparisonData.co2Emission.toFixed(0)} kg CO2 supplémentaires`,
            }}
            consumption={`${vehicleData.engine.consumption}L/100km`}
          />
          <CardResultGreen
            title="Alternative électrique"
            vehicleImage={electricVehicle?.car_picture || ""}
            vehicleName={`${electricVehicle?.brand || ""} ${electricVehicle?.model || ""}`}
            costs={{
              electricity: formatFrequency(
                calculateCost(
                  comparisonData.electricCost,
                  habitsData.option,
                  "jour",
                ),
                "jour",
              ),
              savings: formatFrequency(
                calculateCost(
                  comparisonData.savings,
                  habitsData.option,
                  selectedFrequency,
                ),
                selectedFrequency,
              ),
            }}
            emissions={{
              difference: `${comparisonData.co2Emission.toFixed(0)} kg CO2 économisés`,
            }}
            consumption={`${electricVehicle?.engine.consumption || 0}kWh/100km`}
            autonomy={`${electricVehicle?.engine.autonomy_km || 0} km`}
          />
        </div>
      </div>
    </>
  );
};

export default Result;
