import type { RequestHandler } from "express";

import engineRepository from "./engineRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const engines = await engineRepository.readAll();
    res.json(engines);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const engineId = Number(req.params.id);
    const engine = await engineRepository.read(engineId);
    if (engine == null) {
      res.sendStatus(404);
    } else {
      res.json(engine);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
