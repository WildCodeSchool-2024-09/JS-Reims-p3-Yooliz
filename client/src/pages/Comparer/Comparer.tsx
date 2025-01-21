import "./Comparer.css";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

function Comparer() {
  return (
    <div>
      <h1>Comparer les véhicules</h1>
      <div className="vehicle-list">
        <VehicleCard
          size="large"
          vehicleData={{
            brand: "Toyota",
            model: "Corolla",
            license_plate: "ABC-123",
            engine: {
              power_type: "1.8L",
              horsepower: 132,
            },
            price: 20000,
            car_picture: "https://example.com/toyota-corolla.jpg",
          }}
        />
      </div>
    </div>
  );
}

export default Comparer;
