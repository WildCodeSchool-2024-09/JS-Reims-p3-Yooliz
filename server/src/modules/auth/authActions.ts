import type { RequestHandler } from "express";

import argon2 from "argon2";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

export default { hashPassword };
