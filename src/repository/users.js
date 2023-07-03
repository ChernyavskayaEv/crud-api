import { randomUUID } from 'node:crypto';

import { ServerError } from '../errors/errors.js';

const db = new Map();

const userExists = (id) => {
  if (!db.has(id)) throw new ServerError(404, `User with ${id} not found`);
  return true;
};

export const getAll = () => {
  const users = [];
  db.forEach((value) => users.push(value));
  return users;
};

export const getUser = (id) => {
  userExists(id);
  return db.get(id);
};

export const createUser = ({ username, age, hobbies }) => {
  const id = randomUUID();
  db.set(id, { id, username, age, hobbies });
  return db.get(id);
};

export const updateUser = (
  id,
  { username = null, age = null, hobbies = [] }
) => {
  userExists(id);
  const values = Object.entries({ username, age, hobbies })
    .filter(([k, v]) => (Array.isArray(v) ? v.length > 0 : !!v))
    .reduce((a, [k, v]) => ({ ...a, [k]: v }), {});
  const updatedRecord = { ...db.get(id), ...values };
  db.set(id, updatedRecord);
  return updatedRecord;
};

export const deleteUser = (id) => {
  userExists(id);
  db.delete(id);
  return true;
};

export default {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
