// In-memory initial data store
let items = [
  { id: 1, name: "Dell XPS 15", category: "Laptops", price: 145000, inStock: true },
  { id: 2, name: "Logitech MX Master 3S", category: "Accessories", price: 8999, inStock: true },
  { id: 3, name: "Keychron K2 Mechanical", category: "Keyboards", price: 7499, inStock: false }
];

// GET: Read all items
exports.getAllItems = (req, res) => {
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
};

// GET: Read single item by ID
exports.getItemById = (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Item with ID ${itemId} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: item
  });
};

// POST: Create a new item
exports.createItem = (req, res) => {
  const { name, category, price, inStock } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name' and 'price' are mandatory fields."
    });
  }

  const newItem = {
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    name,
    category: category || "General",
    price: Number(price),
    inStock: inStock !== undefined ? inStock : true
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: "Item created successfully",
    data: newItem
  });
};

// PUT: Update item by ID
exports.updateItem = (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Cannot update: Item with ID ${itemId} does not exist`
    });
  }

  const { name, category, price, inStock } = req.body;

  items[itemIndex] = {
    ...items[itemIndex],
    ...(name && { name }),
    ...(category && { category }),
    ...(price !== undefined && { price: Number(price) }),
    ...(inStock !== undefined && { inStock })
  };

  res.status(200).json({
    success: true,
    message: `Item ID ${itemId} updated successfully`,
    data: items[itemIndex]
  });
};

// DELETE: Remove item by ID
exports.deleteItem = (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Cannot delete: Item with ID ${itemId} not found`
    });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: `Item '${deletedItem.name}' deleted successfully`,
    data: deletedItem
  });
};