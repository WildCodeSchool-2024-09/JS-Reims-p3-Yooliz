import type { RequestHandler } from "express";
import historyRepository from "./historyRepository";
const browse: RequestHandler = async (req, res, next) => {
  try {
    const history = await historyRepository.readAll();
    res.json(history);
  } catch (err) {
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const newEntry = {
      user_id: req.body.user_id,
      email: req.body.email,
      vehicle_brand: req.body.vehicle_brand,
      vehicle_model: req.body.vehicle_model,
      compared_vehicle_brand: req.body.compared_vehicle_brand,
      compared_vehicle_model: req.body.compared_vehicle_model,
      yearly_savings: req.body.yearly_savings,
      distance: req.body.distance,
      insurance_cost: req.body.insurance_cost || null,
      trip_type: req.body.trip_type || null,
      mixed_trip_details: req.body.mixed_trip_details || null,
      renewal_date: req.body.renewal_date || null,
      different_brand: req.body.different_brand || null,
      trip_modifications: req.body.trip_modifications || null,
    };
    const insertId = await historyRepository.create(newEntry);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
export default { browse, add };
