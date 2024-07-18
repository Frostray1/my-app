const express = require('express');
const router = express.Router();

const generateRandomToken = () => {
  return Math.random().toString(36).substring(2);
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = generateRandomToken();
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

const clients = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'] },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['loser'] },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'] },
  { key: '4', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'] },
  { key: '5', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'] },
  { key: '6', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'] },
  { key: '7', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'] },
];

const orders = [
  { key: '1', orderNumber: 'ORD001', client: 'John Brown', total: 100, status: 'Completed' },
  { key: '2', orderNumber: 'ORD002', client: 'Jim Green', total: 150, status: 'Processing' },
  { key: '3', orderNumber: 'ORD003', client: 'Joe Black', total: 200, status: 'Completed' },
  { key: '4', orderNumber: 'ORD004', client: 'John Brown', total: 250, status: 'Cancelled' },
  { key: '5', orderNumber: 'ORD005', client: 'Jim Green', total: 300, status: 'Processing' },
  { key: '6', orderNumber: 'ORD006', client: 'Joe Black', total: 350, status: 'Completed' },
  { key: '7', orderNumber: 'ORD007', client: 'John Brown', total: 400, status: 'Processing' },
  { key: '8', orderNumber: 'ORD008', client: 'Jim Green', total: 450, status: 'Cancelled' },
  { key: '9', orderNumber: 'ORD009', client: 'Joe Black', total: 500, status: 'Completed' },
  { key: '10', orderNumber: 'ORD010', client: 'John Brown', total: 550, status: 'Processing' },
  { key: '11', orderNumber: 'ORD011', client: 'Jim Green', total: 600, status: 'Completed' },
  { key: '12', orderNumber: 'ORD012', client: 'Joe Black', total: 650, status: 'Cancelled' },
  { key: '13', orderNumber: 'ORD013', client: 'John Brown', total: 700, status: 'Processing' },
  { key: '14', orderNumber: 'ORD014', client: 'Jim Green', total: 750, status: 'Completed' },
  { key: '15', orderNumber: 'ORD015', client: 'Joe Black', total: 800, status: 'Cancelled' },
  { key: '16', orderNumber: 'ORD016', client: 'John Brown', total: 850, status: 'Processing' },
  { key: '17', orderNumber: 'ORD017', client: 'Jim Green', total: 900, status: 'Completed' },
  { key: '18', orderNumber: 'ORD018', client: 'Joe Black', total: 950, status: 'Processing' },
  { key: '19', orderNumber: 'ORD019', client: 'John Brown', total: 1000, status: 'Cancelled' },
  { key: '20', orderNumber: 'ORD020', client: 'Jim Green', total: 1050, status: 'Completed' },
];

// Новый маршрут для получения данных заказов
router.get('/getOrders', (req, res) => {
  res.json(orders);
});

// Новый маршрут для получения данных клиентов
router.get('/getClients', (req, res) => {
  res.json(clients);
});

// Новый маршрут для удаления заказа
router.delete('/deleteOrder/:key', (req, res) => {
  const { key } = req.params;
  const index = orders.findIndex(order => order.key === key);
  if (index !== -1) {
    orders.splice(index, 1);
    res.status(200).json({ message: 'Order deleted successfully' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Новый маршрут для изменения заказа
router.put('/updateOrder/:key', (req, res) => {
  const { key } = req.params;
  const { orderNumber, client, total, status } = req.body;
  const index = orders.findIndex(order => order.key === key);
  if (index !== -1) {
    orders[index] = { key, orderNumber, client, total, status };
    res.status(200).json({ message: 'Order updated successfully' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Новый маршрут для добавления заказа
router.post('/addOrder', (req, res) => {
  const { orderNumber, client, total, status } = req.body;
  const key = (orders.length + 1).toString();
  orders.push({ key, orderNumber, client, total, status });
  res.status(201).json({ message: 'Order added successfully' });
});

// Новый маршрут для удаления клиента
router.delete('/deleteClient/:key', (req, res) => {
  const { key } = req.params;
  const index = clients.findIndex(client => client.key === key);
  if (index !== -1) {
    clients.splice(index, 1);
    res.status(200).json({ message: 'Client deleted successfully' });
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Новый маршрут для изменения клиента
router.put('/updateClient/:key', (req, res) => {
  const { key } = req.params;
  const { name, age, address, tags } = req.body;
  const index = clients.findIndex(client => client.key === key);
  if (index !== -1) {
    clients[index] = { key, name, age, address, tags };
    res.status(200).json({ message: 'Client updated successfully' });
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Новый маршрут для добавления клиента
router.post('/addClient', (req, res) => {
  const { name, age, address, tags } = req.body;
  const key = (clients.length + 1).toString();
  clients.push({ key, name, age, address, tags });
  res.status(201).json({ message: 'Client added successfully' });
});

module.exports = router;
