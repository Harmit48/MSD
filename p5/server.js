const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let items = [
  { id: 1, name: "Dell XPS 15", category: "Laptops", price: 145000, inStock: true },
  { id: 2, name: "Logitech MX Master 3S", category: "Accessories", price: 8999, inStock: true },
  { id: 3, name: "Keychron K2 Mechanical", category: "Keyboards", price: 7499, inStock: false }
];

app.get('/api/items', (req, res) => res.json({ success: true, count: items.length, data: items }));
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: "Item not found" });
  res.json({ success: true, data: item });
});
app.post('/api/items', (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: "Name and Price are required" });
  const newItem = { id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1, name, category: category || "General", price: Number(price), inStock: true };
  items.push(newItem);
  res.status(201).json({ success: true, message: "Item created", data: newItem });
});
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Item not found" });
  const del = items.splice(idx, 1)[0];
  res.json({ success: true, message: "Item deleted", data: del });
});

app.listen(PORT, () => console.log("Practical 05 running on http://localhost:" + PORT));
