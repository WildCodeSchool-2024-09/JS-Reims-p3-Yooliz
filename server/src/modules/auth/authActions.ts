import argon2 from "argon2";
import type { RequestHandler } from "express";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

import type { JwtPayload } from "jsonwebtoken";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Trop de tentatives de connexion. Réessayez plus tard.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10, // 19 MiB
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      res.status(400).json({ message: "Le mot de passe est requis." });
      return;
    }

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;

    return next();
  } catch (err) {
    console.error("Error while hashing the password:", err);

    return next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email et mot de passe requis." });
      return;
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const isPasswordValid = await argon2.verify(user.hashed_password, password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Identifiants incorrects." });
      return;
    }

    const token = jwt.sign(
      {
        sub: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.APP_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    const { hashed_password, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Connexion réussie.",
      user: userWithoutPassword,
    });

    return;
  } catch (err) {
    console.error("Error during login:", err);
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      res.status(401).json({ message: "Token missing in cookies." });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as MyPayload;

    (req.auth as MyPayload) = decoded;

    next();
  } catch (err) {
    console.error("Error while verifying the token:", err);
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
};

export default { hashPassword, login: [loginLimiter, login], verifyToken };
