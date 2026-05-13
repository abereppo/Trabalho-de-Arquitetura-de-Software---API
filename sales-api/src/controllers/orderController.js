const orderModel = require('../models/orderModel');
const clientModel = require('../models/clientModel');
const productModel = require('../models/productModel');

const VALID_STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

class OrderController {
  // GET /api/orders
  getAll(req, res) {
    const { clientId } = req.query;
    const orders = clientId
      ? orderModel.findByClientId(clientId)
      : orderModel.findAll();
    res.json({ success: true, count: orders.length, data: orders });
  }

  // GET /api/orders/:id
  getById(req, res, next) {
    try {
      const order = orderModel.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Pedido não encontrado.' });
      }

      // Enrich with client and product details
      const client = clientModel.findById(order.clientId);
      const enrichedItems = order.items.map((item) => ({
        ...item,
        product: productModel.findById(item.productId),
      }));

      res.json({
        success: true,
        data: { ...order, client, items: enrichedItems },
      });
    } catch (err) {
      next(err);
    }
  }

  // POST /api/orders
  create(req, res, next) {
    try {
      const { clientId, items } = req.body;

      if (!clientId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios: clientId e items (array não vazio).',
        });
      }

      // Validate client
      const client = clientModel.findById(clientId);
      if (!client) {
        return res.status(404).json({ success: false, message: 'Cliente não encontrado.' });
      }

      // Validate items and calculate total
      let total = 0;
      const validatedItems = [];

      for (const item of items) {
        const { productId, quantity } = item;
        if (!productId || !quantity || quantity < 1) {
          return res.status(400).json({
            success: false,
            message: 'Cada item deve ter productId e quantity (>= 1).',
          });
        }

        const product = productModel.findById(productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Produto com id "${productId}" não encontrado.`,
          });
        }

        if (product.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: `Estoque insuficiente para o produto "${product.name}". Disponível: ${product.stock}.`,
          });
        }

        // Deduct stock
        productModel.update(productId, { stock: product.stock - quantity });

        const unitPrice = product.price;
        total += unitPrice * quantity;
        validatedItems.push({ productId, quantity, unitPrice });
      }

      const order = orderModel.create({ clientId, items: validatedItems, total: parseFloat(total.toFixed(2)) });
      res.status(201).json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/orders/:id/status
  updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      if (!status || !VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status inválido. Use um dos seguintes: ${VALID_STATUSES.join(', ')}.`,
        });
      }

      const order = orderModel.updateStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Pedido não encontrado.' });
      }
      res.json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/orders/:id
  delete(req, res, next) {
    try {
      const deleted = orderModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Pedido não encontrado.' });
      }
      res.json({ success: true, message: 'Pedido removido com sucesso.' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrderController();
