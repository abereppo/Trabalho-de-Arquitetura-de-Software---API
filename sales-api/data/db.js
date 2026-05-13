// In-memory mock database
const db = {
  products: [
    {
      id: '1',
      name: 'Notebook Pro',
      description: 'Notebook de alta performance para profissionais',
      price: 4999.99,
      stock: 25,
      createdAt: new Date('2024-01-10').toISOString(),
    },
    {
      id: '2',
      name: 'Mouse Ergonômico',
      description: 'Mouse sem fio com design ergonômico',
      price: 199.9,
      stock: 100,
      createdAt: new Date('2024-01-12').toISOString(),
    },
    {
      id: '3',
      name: 'Teclado Mecânico',
      description: 'Teclado mecânico com iluminação RGB',
      price: 349.9,
      stock: 60,
      createdAt: new Date('2024-01-15').toISOString(),
    },
  ],

  clients: [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      createdAt: new Date('2024-01-08').toISOString(),
    },
    {
      id: '2',
      name: 'Maria Souza',
      email: 'maria.souza@email.com',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      createdAt: new Date('2024-01-09').toISOString(),
    },
  ],

  orders: [
    {
      id: '1',
      clientId: '1',
      items: [
        { productId: '1', quantity: 1, unitPrice: 4999.99 },
        { productId: '2', quantity: 2, unitPrice: 199.9 },
      ],
      total: 5399.79,
      status: 'completed',
      createdAt: new Date('2024-01-20').toISOString(),
    },
  ],

  nextId: {
    products: 4,
    clients: 3,
    orders: 2,
  },
};

module.exports = db;
