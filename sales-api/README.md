Estrutura de instalação do projeto:

1 - Instalação

```bash
npm install
npm start        
npm run dev       
```

O servidor começa em: `http://localhost:3000`

---

Estrutura completa:

```
sales-api/
├── data/
│   └── db.js                  
├── src/
│   ├── app.js                 
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── clientController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── productModel.js
│   │   ├── clientModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── clientRoutes.js
│   │   └── orderRoutes.js
│   └── middlewares/
│       └── errorHandler.js
└── package.json
```



Produtos ( `/api/products` ):

| Método | Rota               | Descrição             |
|--------|--------------------|-----------------------|
| GET    | /api/products      | Listar todos          |
| GET    | /api/products/:id  | Buscar por ID         |
| POST   | /api/products      | Criar produto         |
| PUT    | /api/products/:id  | Atualizar produto     |
| DELETE | /api/products/:id  | Remover produto       |

**Body para POST/PUT:**
```json
{
  "name": "Notebook Pro",
  "description": "Notebook de alta performance",
  "price": 4999.99,
  "stock": 25
}
```

---

 CLIENTES — (`/api/clients`):

| Método | Rota              | Descrição         |
|--------|-------------------|-------------------|
| GET    | /api/clients      | Listar todos      |
| GET    | /api/clients/:id  | Buscar por ID     |
| POST   | /api/clients      | Criar cliente     |
| PUT    | /api/clients/:id  | Atualizar cliente |
| DELETE | /api/clients/:id  | Remover cliente   |


```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "address": "Rua das Flores, 123 - São Paulo, SP"
}
```

---

Requisições: (`/api/orders`)

| Método | Rota                    | Descrição              |
|--------|-------------------------|------------------------|
| GET    | /api/orders             | Listar todos           |
| GET    | /api/orders?clientId=1  | Filtrar por cliente    |
| GET    | /api/orders/:id         | Buscar por ID (enriquecido) |
| POST   | /api/orders             | Criar pedido           |
| PATCH  | /api/orders/:id/status  | Atualizar status       |
| DELETE | /api/orders/:id         | Remover pedido         |


```json
{
  "clientId": "1",
  "items": [
    { "productId": "1", "quantity": 1 },
    { "productId": "2", "quantity": 2 }
  ]
}
```


```json
{ "status": "completed" }
```
> Status válidos: `pending`, `processing`, `completed`, `cancelled`

---

Necessidades para o projeto ser funcional:

- Ao criar um pedido, o **estoque é desocntado** automaticamente.
- Não é possível criar pedido com quantidade maior que o estoque disponível.
- E-mails de clientes são **únicos** (retorna 409 em duplicata).
- Campos obrigatórios são validados com retorno **400 Bad Request**.
- Pedidos enriquecidos (`GET /orders/:id`) retornam dados completos do cliente e produtos.
