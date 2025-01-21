export interface WebsiteUser {
  id: number;
  lastname: string;
  firstname: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
  isAdmin?: boolean;
}

export interface Vehicle {
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
  powerType: "électrique" | "essence" | "diesel";
  consumption?: number;
  autonomyKm?: number;
  refillPrice?: number;
  drivenDistance?: number;
  fuelCost?: number;
  year?: number;
}

export interface Company {
  id: number;
  companyName: string;
  ownerId: number;
  fleetSize: number;
  companyAddress: string;
}
