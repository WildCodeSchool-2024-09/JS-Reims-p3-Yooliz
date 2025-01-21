import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Matricule.css";

interface MatriculeProps {
  onValidate: () => void;
}

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  price: number;
  engine: {
    power_type: string;
    consumption: number;
    autonomy_km: number | null;
    horsepower: number;
  };
  license_plate: string;
  car_picture: string;
}

export default function Matricule({ onValidate }: MatriculeProps) {
  const [immatriculation, setImmatriculation] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch(
        "https://api-yooliz-blush.vercel.app/api/vehicles",
      );
      const data: Vehicle[] = await response.json();
      setVehicles(data);
      const uniqueBrands = Array.from(
        new Set(data.map((vehicle: Vehicle) => vehicle.brand)),
      );
      setBrands(uniqueBrands);
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const filteredModels = vehicles
      .filter(
        (vehicle) =>
          vehicle.brand === brand && vehicle.engine.power_type !== "électrique",
      )
      .map((vehicle) => vehicle.model);
    setModels(filteredModels);
  }, [brand, vehicles]);

  const handleSubmit = async () => {
    let vehicleData: Vehicle | undefined;
    if (immatriculation) {
      const response = await fetch(
        `https://api-yooliz-blush.vercel.app/api/vehicles?license_plate=${immatriculation}`,
      );
      if (response.ok) {
        const data = await response.json();
        vehicleData = data.find(
          (vehicle: Vehicle) => vehicle.license_plate === immatriculation,
        );
        if (!vehicleData) {
          alert("No vehicle found with the provided license plate");
          return;
        }
      } else {
        alert("Failed to fetch vehicle data");
        return;
      }
    } else {
      vehicleData = vehicles.find(
        (vehicle) => vehicle.brand === brand && vehicle.model === model,
      );
      if (!vehicleData) {
        alert("No vehicle found with the provided brand and model");
        return;
      }
    }
    onValidate();
    navigate("/confirm", { state: { vehicleData } });
  };

  const handleImmatriculationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length > 2) value = `${value.slice(0, 2)}-${value.slice(2)}`;
    if (value.length > 6) value = `${value.slice(0, 6)}-${value.slice(6, 8)}`;
    setImmatriculation(value);
  };

  const isValidImmatriculation = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/.test(
    immatriculation,
  );

  return (
    <div className="matricule_container">
      <h2 className="h2_vehicule">Mon véhicule</h2>
      <div className="box-comparator">
        <div className="box_immatriculation">
          <div className="comparator_child">
            <h3 className="matricule_h3">Immatriculation</h3>
            <div className="add_car">
              <input
                type="text"
                placeholder="Entrez votre plaque d'immatriculation"
                className="matricule_left_input"
                value={immatriculation}
                onChange={handleImmatriculationChange}
                maxLength={9}
              />
            </div>
            <p
              className="info-plaque-text"
              style={{
                color: "#FF0000",
                fontSize: "12px",
                fontFamily: "var(--font-family-texte)",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Veuillez entrer une plaque valide au format AB-123-CD. <br />
              <br /> Si vous disposez d'une ancienne plaque, veuillez nous
              contacter via <a href="/contact">notre formulaire</a>.
            </p>
          </div>
          <button
            className="matricule"
            type="submit"
            onClick={handleSubmit}
            disabled={!isValidImmatriculation}
            style={{
              cursor: isValidImmatriculation ? "pointer" : "not-allowed",
            }}
          >
            Valider
          </button>
        </div>
        <div className="mat_separator">
          <hr />
          <p>ou</p>
          <hr />
        </div>
        <div className="registred_info">
          <h3 className="matricule_h3">Informations du véhicule</h3>
          <div className="car_info">
            <select
              className="matricule_input"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Sélectionnez une marque</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              className="matricule_input"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!brand}
            >
              <option value="">Sélectionnez un modèle</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <button
            className="matricule"
            type="button"
            onClick={handleSubmit}
            disabled={!brand || !model}
            style={{ cursor: brand && model ? "pointer" : "not-allowed" }}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
