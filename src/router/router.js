import users from '../repository/users.js';
import { ServerError } from '../errors/errors.js';
import {
  validateNewUserData,
  validateUserData,
  validateId,
} from '../validators/validators.js';

const getBody = async (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const data = Buffer.concat(chunks);
      try {
        const params = JSON.parse(data.toString());
        resolve(params);
      } catch (error) {
        reject(new ServerError(400));
      }
    });
  });

const getParams = (url) => {
  return url.split('/')[3];
};

export const routing = {
  '/api/users': async (req) => {
    switch (req.method) {
      case 'GET':
        const idGetRequest = getParams(req.url);
        if (!idGetRequest) {
          return users.getAll();
        }
        validateId(idGetRequest);
        const requestedUser = users.getUser(idGetRequest);
        return requestedUser;
      case 'POST':
        const idPostRequest = getParams(req.url);
        if (idPostRequest) {
          throw new ServerError(404);
        }
        const dataOfNewUser = await getBody(req);
        validateNewUserData(dataOfNewUser);
        const newUser = users.createUser(dataOfNewUser);
        return newUser;
      case 'PUT':
        const idUpdateRequest = getParams(req.url);
        validateId(idUpdateRequest);
        const dataOfUpdatedUser = await getBody(req);
        validateUserData(dataOfUpdatedUser);
        const updatedUser = users.updateUser(
          idUpdateRequest,
          dataOfUpdatedUser
        );
        return updatedUser;
      case 'DELETE':
        const idDeleteRequest = getParams(req.url);
        validateId(idDeleteRequest);
        return users.deleteUser(idDeleteRequest);
      default:
        throw new ServerError(404);
    }
  },
};
