import users from '../repository/users.js';
import { ServerError } from '../errors/errors.js';

export const routing = {
  '/api/users': async (req) => {
    switch (req.method) {
      case 'GET':
        return users.getAll();

      default:
        throw new ServerError(404);
    }
  },
};
