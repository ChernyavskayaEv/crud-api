import { ServerError } from '../errors/errors.js';

export const validateNewUserData = ({ username, age, hobbies }) => {
  if (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === 'string')
  )
    return true;
  throw new ServerError(400, 'Invalid user data');
};

export const validateUserData = ({
  username = '',
  age = 0,
  hobbies = [''],
}) => {
  if (
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === 'string')
  )
    return true;
  throw new ServerError(400, 'Invalid user data');
};

export const validateId = (uuid) => {
  const regex =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  if (!regex.test(uuid)) throw new ServerError(400, `Invalid user id`);
  return true;
};

// export const validRequestId = (id) => {
//   console.log(validId(id));
//   if (!validId(id)) throw new ServerError(404, `Invalid user id`);
//   //   const requestedUser = users.getUser({ id });
//   //   if (!requestedUser) throw new ServerError(404, `User with ${id} not found`);
//   return requestedUser;
// };

// export const validRequestData = (data) => {
//   if (!validDataUser(data)) {
//     throw new ServerError(400, 'Invalid user data');
//   }
//   return data;
// };
