import "./Compte.css";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  address: string;
  phone_number: string;
};

type Auth = {
  user: User;
  message: string;
};

type Context = {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
};

function Compte() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { auth, setAuth } = useOutletContext() as Context;
  const [isdisabled, setIsDisabled] = useState(true);
  const [firstname, setFirstname] = useState(auth?.user?.firstname || "");
  const [lastname, setLastname] = useState(auth?.user?.lastname || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    auth?.user?.phone_number || "",
  );
  const [address, setAddress] = useState(auth?.user?.address || "");
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const validatePhoneNumber = (phone: string) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!auth || !auth.user) {
        console.error("User is not authenticated.");
        return;
      }

      try {
        const userId = auth.user.id;
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/vehicles?userId=${userId}`,
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
      } catch (error) {}
    };
    fetchData();
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ phone: "", email: "", firstname: "", lastname: "" });

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Le numéro de téléphone doit contenir 10 chiffres",
      }));
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            phone_number: phoneNumber,
            firstname,
            lastname,
            address,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setIsDisabled(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Erreur lors de la mise à jour",
      }));
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (response.ok) {
        setAuth(null);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <div className="compte">
        <div className="deco">
          <button type="button" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
        <div className="user">
          <img src={avatar} alt="" className="avatar" />
          <div className="info-box">
            <div className="user-info">
              <form className="user-info-perso" onSubmit={handleSubmit}>
                <div className="info-box">
                  <div className="input-compte">
                    <div className="label-input">
                      <label htmlFor="prenom">Prénom</label>
                      <input
                        type="text"
                        title={firstname}
                        disabled={isdisabled}
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                      />
                    </div>
                    <div className="label-input">
                      <label htmlFor="nom">Nom</label>
                      <input
                        type="text"
                        title={lastname}
                        disabled={isdisabled}
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                      />
                    </div>
                    <div className="label-input">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        title={email}
                        disabled={isdisabled}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="label-input">
                      <label htmlFor="phoneNumber">Numéro de telephone</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        disabled={isdisabled}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errors.phone && (
                        <span className="error">{errors.phone}</span>
                      )}
                    </div>
                    <div className="label-input">
                      <label htmlFor="adresse">Adresse</label>
                      <input
                        type="text"
                        title={address}
                        disabled={isdisabled}
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </div>
                    <div className="compte-button-container">
                      <button
                        type={isdisabled ? "submit" : "button"}
                        onClick={() => setIsDisabled(!isdisabled)}
                        disabled={false}
                      >
                        {isdisabled ? "Modifier" : "Enregistrer"}
                      </button>
                    </div>
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
                    id: vehicle.id,
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
        </div>
        <div className="user-info-vehicle-2">
          <div className="compte-box">
            <div className="vehicule">
              <p>Mes informations</p>
              <button type="button">Modifier mes véhicules ✏️</button>
            </div>
            <div className="box-contenu">
              {vehicles?.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  size="small"
                  vehicleData={{
                    id: vehicle.id,
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
        </div>
        <div className="compte-question">
          <button type="button">?</button>
        </div>
      </div>
    </>
  );
}
export default Compte;
