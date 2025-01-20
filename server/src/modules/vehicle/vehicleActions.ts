import type { NextFunction, Request, RequestHandler, Response } from "express";

// To infity and beyond
// Import access to data
import vehicleRepository from "./vehicleRepository";

const browse: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      res.status(401).json({ message: "Accès non autorisé : Token manquant." });
      return;
    }

    const userId = Number(req.auth?.sub ?? 4); // Utilise 4 comme valeur par défaut
    const vehicles = await vehicleRepository.readAll(userId);

    res.json(vehicles); // Envoie la réponse
  } catch (err) {
    next(err); // Passer les erreurs au middleware de gestion des erreurs
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
