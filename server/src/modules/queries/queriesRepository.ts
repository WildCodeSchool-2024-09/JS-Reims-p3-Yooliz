import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Query = {
  id: number;
  contact_email: string;
  submit_date: Date;
  category: "Renouvelement" | "Flotte" | "Besoin" | "Autre";
  message: string;
};

class QueriesRepository {
  async create(query: Omit<Query, "id" | "submit_date">) {
    const [result] = await databaseClient.query<Result>(
      "insert into queries (contact_email, category, message) values (?, ?, ?)",
      [query.contact_email, query.category, query.message],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from queries");
    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from queries where id = ?",
      [id],
    );
    return rows[0];
  }

  async update(id: number, changes: { message: string }) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from queries where id = ?",
      [id],
    );
    const existingQuery = rows[0];

    if (!existingQuery) {
      return { affectedRows: 0 };
    }
    const [result] = await databaseClient.query<Result>(
      "update queries set message = ? where id = ?",
      [changes.message, id],
    );

    return result;
  }

  async delete(id: number) {
    await databaseClient.query<Result>("delete from queries where id = ?", [
      id,
    ]);
  }
}

export default new QueriesRepository();
