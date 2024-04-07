import type { UserRegistrationModel, UserLoginModel, UserModel } from '@app/types/model/user';
import type DB from '../../class/DB';
import type { UUID } from 'crypto';

const usersService = {
  async registration(user: UserRegistrationModel, db: DB): Promise<UUID> {
    const data = await db.insert({
      fields: 'name, email, password',
      tables: 'service.users',
      values: [user.name, user.email, user.password],
      returning: 'id'
    });

    const id = data.rows[0].id as UUID;
    return id;
  },

  async login(user: UserLoginModel, db: DB) {
    return db.select<UserModel>({
      text: `SELECT id, name, email FROM service.users WHERE email='${user.login}' AND password='${user.password}' AND removed='false'`
    });
  }
};

export default usersService;
