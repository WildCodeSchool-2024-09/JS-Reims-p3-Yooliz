import type { RequestHandler } from "express";

// To infity and beyond
// Import access to data
import vehicleRepository from "./vehicleRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all vehicles
    const vehicles = await vehicleRepository.readAll();

    // Respond with the vehicles in JSON format
    res.json(vehicles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific vehicle based on the provided ID
    const vehicleId = Number(req.params.id);
    const vehicle = await vehicleRepository.read(vehicleId);

    // If the vehicle is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the vehicle in JSON format
    if (vehicle == null) {
      res.sendStatus(404);
    } else {
      res.json(vehicle);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newVehicle = {
      owner_id: req.body.owner_id,
      brand: req.body.brand,
      model: req.body.model,
      license_plate: req.body.license_plate,
      registration_date: req.body.registration_date,
      price: req.body.price,
      engine_id: req.body.engine_id,
      carbon_footprint: req.body.carbon_footprint || 0,
    };

    const insertId = await vehicleRepository.create(newVehicle);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error("Erreur lors de l'ajout d'un véhicule :", err);
    next(err);
  }
};

export default { browse, read, add };
