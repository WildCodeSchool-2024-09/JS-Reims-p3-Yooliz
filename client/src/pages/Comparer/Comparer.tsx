import "./Comparer.css";
import { useEffect, useState } from "react";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import type { Vehicle } from "../../types/types";

function Comparer() {
  const [vehicleId, setVehicleId] = useState<number>(1);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api-yooliz-lhexs1fkj-paradises-projects-11b7cb6c.vercel.app/api/vehicles/${vehicleId}`,
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du véhicule");
        }

        const data: Vehicle = await response.json();
        setVehicle(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement du véhicule.</p>;

  return (
    <div>
      <h1>Comparer les véhicules</h1>
      <input
        type="number"
        value={vehicleId}
        onChange={(e) => setVehicleId(Number(e.target.value))}
        placeholder="Entrez l'ID du véhicule"
      />
      <div className="vehicle-list">
        {vehicle && <VehicleCard key={vehicle.id} vehicle={vehicle} />}
      </div>
    </div>
  );
}

export default Comparer;
