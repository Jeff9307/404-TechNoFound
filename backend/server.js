
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = '404-tech-no-found-secret-key'; // En un proyecto real, usar variables de entorno

// --- Middleware ---
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// --- Base de Datos (Simulada) ---
const dbPath = path.join(__dirname, 'db.json');

const readDB = () => {
  const dbRaw = fs.readFileSync(dbPath);
  return JSON.parse(dbRaw);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// --- Middleware de Autenticación ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No hay token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido
    req.user = user;
    next();
  });
};

// --- Rutas API ---

// 1. Productos y Categorías
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const db = readDB();
  if (category) {
    const filteredProducts = db.products.filter(p => p.category === category);
    return res.json(filteredProducts);
  }
  res.json(db.products);
});

app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories);
});

// 2. Autenticación
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  const db = readDB();
  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  const newUser = {
    id: db.users.length + 1,
    email,
    password, // En un proyecto real, hashear la contraseña
    cart: []
  };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// 3. Carrito de Compras
app.get('/api/cart', authenticateToken, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  
  // Devolver detalles completos de los productos en el carrito
  const cartDetails = user.cart.map(item => {
      const product = db.products.find(p => p.id === item.productId);
      return { ...product, quantity: item.quantity };
  });

  res.json(cartDetails);
});

app.post('/api/cart', authenticateToken, (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || quantity == null) {
      return res.status(400).json({ message: "ID de producto y cantidad son requeridos" });
  }

  const db = readDB();
  const userIndex = db.users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  const user = db.users[userIndex];
  const productInCartIndex = user.cart.findIndex(item => item.productId === productId);

  if (quantity <= 0) { // Eliminar del carrito
      if (productInCartIndex > -1) {
          user.cart.splice(productInCartIndex, 1);
      }
  } else { // Añadir o actualizar
      if (productInCartIndex > -1) {
          user.cart[productInCartIndex].quantity = quantity;
      } else {
          user.cart.push({ productId, quantity });
      }
  }
  
  db.users[userIndex] = user;
  writeDB(db);
  res.status(200).json(user.cart);
});

// 4. Pedidos (Simulado)
app.post('/api/orders', authenticateToken, (req, res) => {
    const db = readDB();
    const userIndex = db.users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ message: "Usuario no encontrado" });

    // Vaciar el carrito después de "comprar"
    db.users[userIndex].cart = [];
    writeDB(db);

    // Lógica de Stripe (simulada) iría aquí
    res.status(200).json({ message: "¡Compra finalizada con éxito! Gracias por tu pedido." });
});


// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
