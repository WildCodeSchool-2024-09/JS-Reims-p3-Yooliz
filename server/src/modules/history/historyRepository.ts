import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";
type HistoryEntry = {
  user_id: number;
  email: string;
  vehicle_brand: string;
  vehicle_model: string;
  compared_vehicle_brand: string;
  compared_vehicle_model: string;
  yearly_savings: number;
  distance: number;
  insurance_cost: number | null;
  trip_type: string | null;
  mixed_trip_details: string | null;
  renewal_date: string | null;
  different_brand: string | null;
  trip_modifications: string | null;
  comparison_date?: Date;
};
class HistoryRepository {
  async readAll() {
    const [history] = await databaseClient.query<Result>(
      "select * from history",
    );
    return history;
  }
  async create(entry: Omit<HistoryEntry, "id">) {
    const [result] = await databaseClient.query<Result>(
      `insert into history (
        user_id, 
        email, 
        vehicle_brand, 
        vehicle_model, 
        compared_vehicle_brand, 
        compared_vehicle_model, 
        yearly_savings, 
        distance, 
        insurance_cost, 
        trip_type, 
        mixed_trip_details, 
        renewal_date, 
        different_brand, 
        trip_modifications
      ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.user_id,
        entry.email,
        entry.vehicle_brand,
        entry.vehicle_model,
        entry.compared_vehicle_brand,
        entry.compared_vehicle_model,
        entry.yearly_savings,
        entry.distance,
        entry.insurance_cost,
        entry.trip_type,
        entry.mixed_trip_details,
        entry.renewal_date,
        entry.different_brand,
        entry.trip_modifications,
      ],
    );
    return result.insertId;
  }
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from history where id = ?",
      [id],
    );
    return result;
  }
  async update(id: number, changes: { distance: number }) {
    try {
      const [rows] = await databaseClient.query<Result>(
        "SELECT * FROM history WHERE id = ?",
        [id],
      );
      const existingEntry = (rows as unknown as HistoryEntry[])[0];
      if (!existingEntry) {
        return { affectedRows: 0 };
      }
      const [result] = await databaseClient.query<Result>(
        "UPDATE history SET distance = ? WHERE id = ?",
        [changes.distance, id],
      );

      return result;
    } catch (error) {
      console.error("Error updating history:", error);
      throw new Error("Failed to update history entry");
    }
  }
}
export default new HistoryRepository();
