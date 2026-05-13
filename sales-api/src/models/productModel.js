const db = require('../../data/db');

class ProductModel {
  findAll() {
    return db.products;
  }

  findById(id) {
    return db.products.find((p) => p.id === id) || null;
  }

  create({ name, description, price, stock }) {
    const product = {
      id: String(db.nextId.products++),
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      createdAt: new Date().toISOString(),
    };
    db.products.push(product);
    return product;
  }

  update(id, { name, description, price, stock }) {
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = {
      ...db.products[index],
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price: parseFloat(price) }),
      ...(stock !== undefined && { stock: parseInt(stock) }),
      updatedAt: new Date().toISOString(),
    };

    db.products[index] = updated;
    return updated;
  }

  delete(id) {
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    db.products.splice(index, 1);
    return true;
  }
}

module.exports = new ProductModel();
