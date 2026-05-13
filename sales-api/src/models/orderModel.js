const db = require('../../data/db');

class OrderModel {
  findAll() {
    return db.orders;
  }

  findById(id) {
    return db.orders.find((o) => o.id === id) || null;
  }

  findByClientId(clientId) {
    return db.orders.filter((o) => o.clientId === clientId);
  }

  create({ clientId, items, total }) {
    const order = {
      id: String(db.nextId.orders++),
      clientId,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    db.orders.push(order);
    return order;
  }

  updateStatus(id, status) {
    const index = db.orders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    db.orders[index] = {
      ...db.orders[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return db.orders[index];
  }

  delete(id) {
    const index = db.orders.findIndex((o) => o.id === id);
    if (index === -1) return false;
    db.orders.splice(index, 1);
    return true;
  }
}

module.exports = new OrderModel();
