import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type Engine = {
  id: number;
  horsepower: number;
  power_type: "electric" | "gas";
  consumption: number | null;
  autonomy_km: number;
  refill_price: number;
};

class EngineRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM engine WHERE id = ?",
      [id],
    );
    return rows[0] as Engine;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM engine");
    return rows as Engine[];
  }
}

export default new EngineRepository();
