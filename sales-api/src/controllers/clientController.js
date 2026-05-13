const clientModel = require('../models/clientModel');

class ClientController {
  // GET /api/clients
  getAll(req, res) {
    const clients = clientModel.findAll();
    res.json({ success: true, count: clients.length, data: clients });
  }

  // GET /api/clients/:id
  getById(req, res, next) {
    try {
      const client = clientModel.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ success: false, message: 'Cliente não encontrado.' });
      }
      res.json({ success: true, data: client });
    } catch (err) {
      next(err);
    }
  }

  // POST /api/clients
  create(req, res, next) {
    try {
      const { name, email, address } = req.body;
      if (!name || !email || !address) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios: name, email, address.',
        });
      }

      const existing = clientModel.findByEmail(email);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'E-mail já cadastrado.',
        });
      }

      const client = clientModel.create({ name, email, address });
      res.status(201).json({ success: true, data: client });
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/clients/:id
  update(req, res, next) {
    try {
      const client = clientModel.update(req.params.id, req.body);
      if (!client) {
        return res.status(404).json({ success: false, message: 'Cliente não encontrado.' });
      }
      res.json({ success: true, data: client });
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/clients/:id
  delete(req, res, next) {
    try {
      const deleted = clientModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Cliente não encontrado.' });
      }
      res.json({ success: true, message: 'Cliente removido com sucesso.' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ClientController();
