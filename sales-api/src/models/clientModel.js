const db = require('../../data/db');

class ClientModel {
  findAll() {
    return db.clients;
  }

  findById(id) {
    return db.clients.find((c) => c.id === id) || null;
  }

  findByEmail(email) {
    return db.clients.find((c) => c.email === email) || null;
  }

  create({ name, email, address }) {
    const client = {
      id: String(db.nextId.clients++),
      name,
      email,
      address,
      createdAt: new Date().toISOString(),
    };
    db.clients.push(client);
    return client;
  }

  update(id, { name, email, address }) {
    const index = db.clients.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updated = {
      ...db.clients[index],
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(address !== undefined && { address }),
      updatedAt: new Date().toISOString(),
    };

    db.clients[index] = updated;
    return updated;
  }

  delete(id) {
    const index = db.clients.findIndex((c) => c.id === id);
    if (index === -1) return false;
    db.clients.splice(index, 1);
    return true;
  }
}

module.exports = new ClientModel();
