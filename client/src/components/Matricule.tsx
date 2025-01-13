import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Matricule.css";
import add_car from "../assets/images/add.png";

interface Vehicle {
  license_plate: string;
  brand: string;
  model: string;
}

interface MatriculeProps {
  onValidate: () => void;
}

export default function Matricule({ onValidate }: MatriculeProps) {
  const [immatriculation, setImmatriculation] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let vehicleData:
      | { brand?: string; model?: string; license_plate?: string }
      | undefined;
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
      vehicleData = {
        brand,
        model,
      };
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
    <div>
      <h2 className="h2_vehicule">Mon véhicule</h2>
      <div className="box-comparator">
        <div className="box_immatriculation">
          <div className="comparator_child">
            <h3 className="matricule_h3">Immatriculation</h3>
            <div className="add_car">
              <img className="add_item" src={add_car} alt="" />
              <input
                type="text"
                placeholder="Entrez votre plaque d'immatriculation"
                className="matricule_left_input"
                value={immatriculation}
                onChange={handleImmatriculationChange}
                maxLength={9}
              />
            </div>
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
            <input
              className="matricule_input"
              type="text"
              placeholder="Marque"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <input
              className="matricule_input"
              type="text"
              placeholder="Modele"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <button className="matricule" type="button" onClick={handleSubmit}>
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
