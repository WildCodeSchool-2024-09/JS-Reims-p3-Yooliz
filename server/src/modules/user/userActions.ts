import type { RequestHandler } from "express";

// To infity and beyond
// Import access to data
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await userRepository.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getDetails: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    console.error("Error in getDetails:", err);
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updatedUserInfo = {
      id: Number(req.params.id),
      email: req.body.email,
      phone_number: req.body.phone_number,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
    };
    console.info("action: ", updatedUserInfo);
    await userRepository.update(updatedUserInfo);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const newUser = {
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    // Create the user
    const insertId = await userRepository.create(newUser);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    // Extract the ID of the user to be deleted
    const userId = Number(req.params.id);

    // Delete the user
    await userRepository.delete(userId);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, edit, getDetails, remove };
