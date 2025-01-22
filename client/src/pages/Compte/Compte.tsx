import "./Compte.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import avatar from "../../assets/images/538474-user_512x512.webp";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  licensePlate: string;
  powerType: string;
  horsepower: number;
  price: number;
  imageUrl: string;
}

type User = {
  id: number;
  email: string;
  isAdmin?: boolean;
  firstname: string;
  lastname: string;
  adress: string;
  phoneNumber: string;
};

type Auth = {
  user: User;
  message: string;
};

function Compte() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { auth } = useOutletContext() as { auth: Auth | null };
  const [isdisabled, setIsDisabled] = useState(false);
  const [firstname, setFirstname] = useState(auth?.user?.firstname || "");
  const [lastname, setLastname] = useState(auth?.user?.lastname || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(auth?.user?.phoneNumber || "");
  const [adress, setAdress] = useState(auth?.user?.adress || "");

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth?.user?.id;
      try {
        const response = await fetch(
          `http://localhost:3310/api/vehicles?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
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
  }, [auth?.user?.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("click");
    const userId = auth?.user?.id;
    const updatedUser = {
      firstname,
      lastname,
      email,
      phoneNumber,
      adress,
    };
    console.info(updatedUser);
    try {
      const response = await fetch(
        `http://localhost:3310/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedUser),
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.info("handleSubmit", error);
    }
  };

  return (
    <>
      <div className="compte">
        <div className="user">
          <img src={avatar} alt="" className="avatar" />
          <div className="info-box">
            <div className="user-info">
              <form className="user-info-perso" onSubmit={handleSubmit}>
                <div className="info-box">
                  <div className="nickname">
                    <h2>user_nickname</h2>
                    <button
                      type="submit"
                      onClick={() => setIsDisabled(!isdisabled)}
                      disabled={false}
                    >
                      {isdisabled ? "Modifier" : "Enregistrer"}
                    </button>
                  </div>
                  <div className="input-compte">
                    <input
                      type="text"
                      title={firstname}
                      disabled={isdisabled}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                      type="text"
                      title={lastname}
                      disabled={isdisabled}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <input
                      type="text"
                      title={email}
                      disabled={isdisabled}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="text"
                      title={phoneNumber}
                      disabled={isdisabled}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      title={adress}
                      disabled={isdisabled}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </div>
                </div>
              </form>
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
                <VehicleCard
                  key={vehicle.id}
                  size="small"
                  vehicleData={{
                    brand: vehicle.brand,
                    model: vehicle.model,
                    license_plate: vehicle.licensePlate,
                    engine: {
                      power_type: vehicle.powerType,
                      horsepower: vehicle.horsepower,
                    },
                    price: vehicle.price,
                    car_picture: vehicle.imageUrl,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="compte-box">
            <div className="comparaison">
              <p>Mes dernières comparaisons</p>
            </div>
            <div className="box-contenu">
              <div className="box-card">
                <div className="car-card-red"> </div>
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
