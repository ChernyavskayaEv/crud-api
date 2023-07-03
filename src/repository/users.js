const db = new Map();

export const getAll = () => {
  const users = [];
  db.forEach((value) => users.push(value));
  return users;
};

export default {
  getAll,
};
