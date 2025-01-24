import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  lastname: string;
  firstname: string;
  adresse: string;
  email: string;
  phoneNumber: number;
  hashed_password: string;
  isAdmin: boolean;
};

type UserInfo = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  phone_number: string;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Partial<User>) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into website_user (email, hashed_password) values (?, ?)",
      [user.email, user.hashed_password],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async update(userInfo: UserInfo) {
    await databaseClient.query<Result>(
      "update website_user set email = ?, phone_number = ?, address = ?, firstname = ?, lastname = ? where id = ?",
      [
        userInfo.email,
        userInfo.phone_number,
        userInfo.address,
        userInfo.firstname,
        userInfo.lastname,
        userInfo.id,
      ],
    );
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from website_user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from website_user",
    );

    // Return the array of items
    return rows as User[];
  }

  async findByEmail(email: string) {
    // Execute the SQL SELECT query to retrieve a user by email
    const [rows] = await databaseClient.query<Rows>(
      "select * from website_user where email = ?",
      [email],
    );

    return rows[0] as User | null;
  }

  async findById(userId: string | undefined) {
    // Execute the SQL SELECT query to retrieve a user by email
    const [rows] = await databaseClient.query<Rows>(
      "select * from website_user where id = ?",
      [userId],
    );
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new UserRepository();
