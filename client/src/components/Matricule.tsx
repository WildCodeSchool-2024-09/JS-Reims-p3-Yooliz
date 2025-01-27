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
  const [showError, setShowError] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [, setIsValidFormat] = useState(true);
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

  const formatLicensePlate = (value: string): string => {
    const cleaned = value.replace(/-/g, "").toUpperCase();

    if (cleaned.length > 5) {
      return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
    }
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const validateFormat = (value: string): boolean => {
    if (value.length < 3) return true;

    const cleaned = value.replace(/-/g, "");
    const pattern = /^[A-Z]{2}\d{0,3}[A-Z]{0,2}$/;

    if (!pattern.test(cleaned)) return false;

    if (cleaned.length === 7) {
      return /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(cleaned);
    }

    if (cleaned.length >= 3) {
      const pos3to5 = cleaned.slice(2, 5);
      if (pos3to5.length > 0 && !/^\d*$/.test(pos3to5)) return false;
    }

    return true;
  };

  const handleImmatriculationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;
    if (value.length <= 9) {
      value = formatLicensePlate(value);
      setImmatriculation(value);
      const isValid = validateFormat(value);
      setIsValidFormat(isValid && value.replace(/-/g, "").length === 7);
      setShowError(!isValid && value.length >= 3);
    }
  };

  const isValidImmatriculation = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/.test(
    immatriculation,
  );

  const styles = {
    buttonContainer: {
      height: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    errorMessage: {
      color: "#FF0000",
      fontSize: "12px",
      fontFamily: "var(--font-family-texte)",
      textAlign: "center" as const,
      lineHeight: "1.5",
      padding: "10px",
      backgroundColor: "#FFF",
      borderRadius: "5px",
      width: "100%",
      height: "40px",
      margin: "40px 0",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
    },
    button: {
      height: "40px",
      margin: "40px 0",
      cursor: (isValid: boolean) => (isValid ? "pointer" : "not-allowed"),
    },
  };

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
            <div style={styles.buttonContainer}>
              {showError ? (
                <div style={styles.errorMessage}>
                  <p>Veuillez entrer une plaque valide au format AB-123-CD.</p>
                  <p>
                    Si vous disposez d'une ancienne plaque, merci de prendre
                    contact via&nbsp;
                    <a href="/contact" style={{ textDecoration: "underline" }}>
                      notre formulaire
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <button
                  className="matricule"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isValidImmatriculation}
                  style={{
                    ...styles.button,
                    cursor: styles.button.cursor(isValidImmatriculation),
                  }}
                >
                  Valider
                </button>
              )}
            </div>
          </div>
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
