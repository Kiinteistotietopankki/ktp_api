// Mock User "model" - no real DB, just fake data and async functions

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

module.exports = {
  findAll: async () => {
    // Return all users
    return users;
  },
  findById: async (id) => {
    // Find user by id
    return users.find(u => u.id === Number(id)) || null;
  },
  create: async (userData) => {
    // Create new user with fake incremental id
    const newUser = { id: users.length + 1, ...userData };
    users.push(newUser);
    return newUser;
  },
  update: async (id, updateData) => {
    const userIndex = users.findIndex(u => u.id === Number(id));
    if (userIndex === -1) return null;
    users[userIndex] = { ...users[userIndex], ...updateData };
    return users[userIndex];
  },
  delete: async (id) => {
    const userIndex = users.findIndex(u => u.id === Number(id));
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }
};
