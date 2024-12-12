import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Vehicle = {
  id: number;
  owner_id: number;
  brand: string;
  model: string;
  license_plate?: string;
  registration_date: string;
  price: number;
  carbon_footprint: number;
  crit_air_card?: number;
  engine_id: number;
};

class VehicleRepository {
  // The C of CRUD - Create operation

  async create(vehicle: Omit<Vehicle, "id">) {
    // Execute the SQL INSERT query to add a new vehicle to the "vehicle" table
    const [result] = await databaseClient.query<Result>(
      "insert into vehicle (title, user_id) values (?, ?)",
      // [vehicle.title, vehicle.user_id], // TODO: Modify this line to insert the vehicle data
    );

    // Return the ID of the newly inserted vehicle
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific vehicle by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from vehicle where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the vehicle
    return rows[0] as Vehicle;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all vehicles from the "vehicle" table
    const [rows] = await databaseClient.query<Rows>("select * from vehicle");

    // Return the array of vehicles
    return rows as Vehicle[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing vehicle

  // async update(vehicle: Vehicle) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an vehicle by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new VehicleRepository();
