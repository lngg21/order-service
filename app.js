const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mocked orders
let orders = [
  { id: 101, item: 'Laptop', quantity: 1, status: 'Pending' },
  { id: 102, item: 'Mouse', quantity: 2, status: 'Shipped' }
];

app.get('/orders', (req, res) => {
  res.json({ orders });
});

app.post('/orders', (req, res) => {
  const { item, quantity } = req.body;
  if (!item || !quantity) {
    return res.status(400).json({ error: 'Item and quantity are required' });
  }

  const newOrder = {
    id: 100 + orders.length + 1,
    item,
    quantity,
    status: 'Pending'
  };
  
  orders.push(newOrder);
  res.status(201).json({ message: 'Order created', order: newOrder });
});

module.exports = app;
