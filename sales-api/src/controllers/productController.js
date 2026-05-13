const productModel = require('../models/productModel');

class ProductController {
  // GET /api/products
  getAll(req, res) {
    const products = productModel.findAll();
    res.json({ success: true, count: products.length, data: products });
  }

  // GET /api/products/:id
  getById(req, res, next) {
    try {
      const product = productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
      }
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }

  // POST /api/products
  create(req, res, next) {
    try {
      const { name, description, price, stock } = req.body;
      if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios: name, price, stock.',
        });
      }
      const product = productModel.create({ name, description, price, stock });
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/products/:id
  update(req, res, next) {
    try {
      const product = productModel.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
      }
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/products/:id
  delete(req, res, next) {
    try {
      const deleted = productModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
      }
      res.json({ success: true, message: 'Produto removido com sucesso.' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
