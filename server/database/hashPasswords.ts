import argon2 from "argon2";
import "dotenv/config";
import databaseClient from "./client";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

async function hashStoredPasswords() {
  try {
    const [users] = await databaseClient.query(
      "SELECT id, email FROM website_user",
    );
    const hashedPassword = await argon2.hash("password", hashingOptions);

    interface User {
      id: number;
      email: string;
    }

    for (const user of users as User[]) {
      await databaseClient.query(
        "UPDATE website_user SET hashed_password = ? WHERE id = ?",
        [hashedPassword, user.id],
      );
    }
    process.exit(0);
  } catch (error) {
    console.error("Error updating passwords:", error);
    process.exit(1);
  }
}

hashStoredPasswords();
