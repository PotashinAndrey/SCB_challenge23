import type { UserRegistrationModel } from "@app/types/model/user";
import type DB from "../../class/DB";
import type { UUID } from "node:crypto";

const usersService = {
  async registration(user: UserRegistrationModel, db: DB): Promise<UUID> {
    const data = await db.insert({
      fields: "name, email, password",
      tables: "service.users",
      values: [user.name, user.email, user.password],
      returning: "id"
    });

    const id = data.rows[0].id as UUID;
    return id;
  }
}

export default usersService;
