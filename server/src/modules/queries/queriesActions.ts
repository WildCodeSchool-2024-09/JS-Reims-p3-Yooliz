import type { RequestHandler } from "express";

import queriesRepository from "./queriesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const queries = await queriesRepository.readAll();
    res.json(queries);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const queryId = Number(req.params.id);
    const query = await queriesRepository.read(queryId);
    if (query == null) {
      res.sendStatus(404);
    } else {
      res.json(query);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { contact_email, category, message } = req.body;

    if (!contact_email || !category || !message) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const validCategories = ["Renouvellement", "Flotte", "Besoin", "Autre"];
    if (!validCategories.includes(category)) {
      res.status(400).json({
        message: `Invalid category. Must be one of: ${validCategories.join(
          ", ",
        )}`,
      });
      return;
    }

    const insertId = await queriesRepository.create({
      contact_email,
      category,
      message,
    });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updatedQuery = {
      id: Number(req.params.id),
      contact_email: req.body.contact_email,
      category: req.body.category,
      message: req.body.message,
      submit_date: new Date(req.body.submit_date),
    };
    await queriesRepository.update(updatedQuery.id, {
      message: updatedQuery.message,
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const queryId = Number(req.params.id);
    await queriesRepository.delete(queryId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, remove };
