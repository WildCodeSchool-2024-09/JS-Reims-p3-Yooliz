import "./Compte.css";
import { useEffect, useState } from "react";
import avatar from "../../assets/images/538474-user_512x512.webp";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

interface Vehicle {
  id: number;
  brand: string;

  model: string;
  imageUrl: string;
  licensePlate?: string;
  registrationDate: string;
  price?: number;
  carbonFootprint?: number;
  critAirCard?: number;
  horsepower?: number;
  powerType: "diesel" | "électrique" | "essence";
  consumption?: number;
  autonomyKm?: number;
  refillPrice?: number;
  drivenDistance?: number;
  fuelCost?: number;
  year?: number;
}

function Compte() {
  const [person, setPerson] = useState({
    name: "compte",
    prenom: "user",
    img: "avatar",
    pays: "user_info",
    ville: "nickname",
    siret: "nickname",
  });

  const modifyPerson = () => {
    setPerson(person);
    console.info(person);
  };

  // Call the function
  modifyPerson();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const userId = 1;
      try {
        const response = await fetch(
          `http://localhost:3310/api/vehicles?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.info("fetchData", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="compte">
        <div className="user">
          <img src={avatar} alt="" className="avatar" />
          <div className="user-info">
            <div className="nickname">
              <h2>user_nickname</h2>
              <button type="button" onClick={modifyPerson}>
                ✏️
              </button>
            </div>
            <div className="user-info-perso">
              <p>Nom</p>
              <p>Prénom</p>
              <p>Nombre de véhicules</p>
              <p>Pays</p>
              <p>Ville</p>
              <p>Numéro de siret</p>
            </div>
          </div>
        </div>
        <hr />

        <div className="user-info-vehicle">
          <div className="compte-box">
            <div className="vehicule">
              <p>Mes véhicules</p>
              <button type="button">Modifier mes véhicules ✏️</button>
            </div>
            <div className="box-contenu">
              {vehicles?.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
          <div className="compte-box">
            <div className="comparaison">
              <p>Mes dernières comparaisons</p>
            </div>
            <div className="box-contenu">
              <div className="box-card">
                <div className="car-card-red">
                  {vehicles?.map((vehicle) => (
                    <div key={vehicle.id}>
                      {vehicle.brand} {vehicle.model}
                    </div>
                  ))}
                </div>
                <div className="car-card-green"> </div>
              </div>
            </div>
          </div>
        </div>
        <div className="compte-question">
          <button type="button">?</button>
        </div>
      </div>
    </>
  );
}
export default Compte;
