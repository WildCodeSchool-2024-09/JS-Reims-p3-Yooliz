import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

interface QueryRow extends RowDataPacket {
  id: number;
  contact_email: string;
  submit_date: Date;
  category: "Renouvellement" | "Flotte" | "Besoin" | "Autre";
  message: string;
}

class QueriesRepository {
  async create(query: Omit<QueryRow, "id" | "submit_date">) {
    const validCategories = ["Renouvellement", "Flotte", "Besoin", "Autre"];
    if (!validCategories.includes(query.category)) {
      throw new Error(
        `Invalid category. Must be one of: ${validCategories.join(", ")}`,
      );
    }

    const [result] = await databaseClient.query<ResultSetHeader>(
      "INSERT INTO queries (contact_email, category, message) VALUES (?, ?, ?)",
      [query.contact_email, query.category, query.message],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      "select * from queries",
    );
    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      "select * from queries where id = ?",
      [id],
    );
    return rows[0];
  }

  async update(id: number, changes: { message: string }) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      "select * from queries where id = ?",
      [id],
    );
    const existingQuery = rows[0];

    if (!existingQuery) {
      return { affectedRows: 0 };
    }
    const [result] = await databaseClient.query<ResultSetHeader>(
      "update queries set message = ? where id = ?",
      [changes.message, id],
    );

    return result;
  }

  async delete(id: number) {
    await databaseClient.query<ResultSetHeader>(
      "delete from queries where id = ?",
      [id],
    );
  }
}

export default new QueriesRepository();
