# Parking Lot API - Technical Reference

## Table of Contents
- [Application Architecture](#application-architecture)
- [Database Layer](#database-layer)
- [Model Classes](#model-classes)
- [Route Handlers](#route-handlers)
- [Code Patterns](#code-patterns)
- [Development Guidelines](#development-guidelines)
- [Testing Strategies](#testing-strategies)

## Application Architecture

### Main Application (`app.js`)

The main application file follows Express.js conventions and sets up the server with middleware and route handlers.

#### Application Structure
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route Mounting
app.use('/api', exampleRoutes);
app.use('/api/celdas', celdaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/perfiles', perfilUsuarioRoutes);
app.use('/api/picoplaca', picoPlacaRoutes);
app.use('/api/accesosalidas', accesoSalidasRoutes);
app.use('/api/incidencias', incidenciaRoutes);
app.use('/api/reportesincidencia', reporteIncidenciaRoutes);
app.use('/api/historiales', historialParqueoRoutes);
```

#### Key Components
- **Express Configuration**: JSON parsing middleware for request body handling
- **Route Organization**: Modular route structure with dedicated handlers for each entity
- **Error Handling**: Basic error handling at the route level
- **Server Initialization**: Standard Express server setup with configurable port

## Database Layer

### Database Class (`models/database.js`)

The Database class provides a singleton-like pattern for MySQL connections.

#### Class Definition
```javascript
class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'parkingadmin',
      password: 'Park1n_Adm1n',
      database: 'ParkingLot',
      port: 8889
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) reject(err);
        else resolve('Conexión exitosa a MySQL');
      });
    });
  }

  end() {
    this.connection.end();
  }
}
```

#### Usage Pattern
Each model method creates a new database instance, performs the operation, and closes the connection:
```javascript
static async getAll() {
  const database = new db();
  const [rows] = await database.connection.promise().query('SELECT * FROM TABLE');
  database.end();
  return rows;
}
```

### Database Design Considerations
- **Connection Management**: Each operation creates a new connection to avoid connection pooling issues
- **Promise-based Operations**: Uses mysql2's promise API for async/await compatibility
- **Error Handling**: Database errors are propagated to the route level
- **Transaction Support**: Not currently implemented but can be added for complex operations

## Model Classes

### Base Model Pattern

All models follow a consistent structure with the following components:

#### 1. Constructor Pattern
```javascript
class Entity {
  constructor({ prop1, prop2, prop3 }) {
    this.prop1 = prop1;
    this.prop2 = prop2;
    this.prop3 = prop3;
  }
}
```

#### 2. Getter/Setter Methods
```javascript
// Getter
getProp1() { return this.prop1; }

// Setter
setProp1(value) { this.prop1 = value; }
```

#### 3. Static CRUD Methods
```javascript
static async getAll() { /* Implementation */ }
static async getById(id) { /* Implementation */ }
static async create(data) { /* Implementation */ }
static async update(id, data) { /* Implementation */ }
static async delete(id) { /* Implementation */ }
```

### Model Method Implementations

#### GET Operations
```javascript
static async getAll() {
  const database = new db();
  const [rows] = await database.connection.promise().query('SELECT * FROM TABLE_NAME');
  database.end();
  return rows;
}

static async getById(id) {
  const database = new db();
  const [rows] = await database.connection.promise().query(
    'SELECT * FROM TABLE_NAME WHERE id = ?', 
    [id]
  );
  database.end();
  return rows[0];
}
```

#### CREATE Operations
```javascript
static async create(entity) {
  const database = new db();
  const [result] = await database.connection.promise().query(
    'INSERT INTO TABLE_NAME (col1, col2, col3) VALUES (?, ?, ?)',
    [entity.col1, entity.col2, entity.col3]
  );
  database.end();
  return result.insertId;
}
```

#### UPDATE Operations
```javascript
static async update(id, entity) {
  const database = new db();
  await database.connection.promise().query(
    'UPDATE TABLE_NAME SET col1=?, col2=?, col3=? WHERE id=?',
    [entity.col1, entity.col2, entity.col3, id]
  );
  database.end();
}
```

#### DELETE Operations
```javascript
static async delete(id) {
  const database = new db();
  await database.connection.promise().query(
    'DELETE FROM TABLE_NAME WHERE id = ?', 
    [id]
  );
  database.end();
}
```

### Special Model Methods

#### Usuario Model Extensions
```javascript
// Custom query method for document-based lookup
static async getByNumeroDocumento(numero_documento) {
  const database = new db();
  const [rows] = await database.connection.promise().query(
    'SELECT * FROM USUARIO WHERE numero_documento = ?', 
    [numero_documento]
  );
  database.end();
  return rows[0];
}
```

#### Composite Key Models (ReporteIncidencia, HistorialParqueo)
```javascript
// Modified methods for composite primary keys
static async getById(key1, key2) {
  const database = new db();
  const [rows] = await database.connection.promise().query(
    'SELECT * FROM TABLE WHERE col1 = ? AND col2 = ?', 
    [key1, key2]
  );
  database.end();
  return rows[0];
}

static async update(key1, key2, entity) {
  const database = new db();
  await database.connection.promise().query(
    'UPDATE TABLE SET col3=? WHERE col1=? AND col2=?',
    [entity.col3, key1, key2]
  );
  database.end();
}

static async delete(key1, key2) {
  const database = new db();
  await database.connection.promise().query(
    'DELETE FROM TABLE WHERE col1 = ? AND col2 = ?', 
    [key1, key2]
  );
  database.end();
}
```

## Route Handlers

### Standard Route Pattern

All route files follow the same structure:

#### 1. Dependencies and Setup
```javascript
const express = require('express');
const Model = require('../models/modelName');
const router = express.Router();
```

#### 2. Route Definitions
```javascript
// GET all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Model.getAll();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single resource
router.get('/:id', async (req, res) => {
  try {
    const resource = await Model.getById(req.params.id);
    if (resource) res.json(resource);
    else res.status(404).json({ error: 'Resource not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create resource
router.post('/', async (req, res) => {
  try {
    const id = await Model.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update resource
router.put('/:id', async (req, res) => {
  try {
    await Model.update(req.params.id, req.body);
    res.json({ message: 'Resource updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE resource
router.delete('/:id', async (req, res) => {
  try {
    await Model.delete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

#### 3. Export
```javascript
module.exports = router;
```

### Route Variations

#### Single Parameter Routes
Most routes use single ID parameters:
```javascript
router.get('/:id', async (req, res) => {
  const resource = await Model.getById(req.params.id);
  // ... handling
});
```

#### Composite Parameter Routes
Some routes handle composite keys:
```javascript
router.get('/:key1/:key2', async (req, res) => {
  const resource = await Model.getById(req.params.key1, req.params.key2);
  // ... handling
});

router.put('/:key1/:key2', async (req, res) => {
  await Model.update(req.params.key1, req.params.key2, req.body);
  // ... handling
});
```

#### Special Lookup Routes
```javascript
// Usuario model has document-based lookup
router.get('/documento/:numero_documento', async (req, res) => {
  const usuario = await Usuario.getByNumeroDocumento(req.params.numero_documento);
  // ... handling
});
```

### Error Handling Strategy

#### HTTP Status Codes
- **200**: Successful GET/PUT operations
- **201**: Successful POST operations (resource creation)
- **404**: Resource not found
- **500**: Server errors (database, validation, etc.)

#### Error Response Format
```javascript
{
  "error": "Human-readable error message"
}
```

#### Error Handling Implementation
```javascript
try {
  // Operation logic
} catch (err) {
  res.status(500).json({ error: err.message });
}
```

## Code Patterns

### Async/Await Pattern
All database operations use async/await for better readability:
```javascript
router.get('/', async (req, res) => {
  try {
    const data = await Model.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### Database Connection Pattern
```javascript
// Standard pattern for database operations
static async operation() {
  const database = new db();
  try {
    const [result] = await database.connection.promise().query(query, params);
    return result;
  } finally {
    database.end();
  }
}
```

### Parameter Extraction Pattern
```javascript
// Path parameters
const id = req.params.id;
const { key1, key2 } = req.params;

// Request body
const data = req.body;
const { prop1, prop2 } = req.body;
```

### Response Pattern
```javascript
// Success responses
res.json(data);                           // GET operations
res.status(201).json({ id });             // POST operations
res.json({ message: 'Operation success' }); // PUT/DELETE operations

// Error responses
res.status(404).json({ error: 'Not found' });
res.status(500).json({ error: err.message });
```

## Development Guidelines

### File Organization
```
models/
├── database.js        # Database connection class
├── entityName.js      # One file per entity model
└── ...

routes/
├── entityName.js      # One file per entity routes
└── ...
```

### Naming Conventions
- **Files**: camelCase (e.g., `perfilUsuario.js`)
- **Classes**: PascalCase (e.g., `PerfilUsuario`)
- **Methods**: camelCase (e.g., `getById`)
- **Variables**: camelCase (e.g., `usuarioData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_PORT`)

### Model Development Pattern
1. Define constructor with all properties
2. Add getter/setter methods for each property
3. Implement static CRUD methods
4. Add custom query methods if needed
5. Follow consistent error handling

### Route Development Pattern
1. Import required dependencies
2. Create router instance
3. Define all CRUD routes
4. Add custom routes if needed
5. Export router

### Database Query Guidelines
- Always use parameterized queries to prevent SQL injection
- Use promise-based methods for async operations
- Close database connections after operations
- Handle errors appropriately

## Testing Strategies

### Manual Testing
Use curl commands or tools like Postman to test endpoints:
```bash
# Test GET endpoint
curl http://localhost:3000/api/usuarios

# Test POST endpoint
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"data": "value"}'

# Test PUT endpoint
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"data": "updated_value"}'

# Test DELETE endpoint
curl -X DELETE http://localhost:3000/api/usuarios/1
```

### Automated Testing (Recommended)
Consider implementing:
- Unit tests for model methods
- Integration tests for API endpoints
- Database migration tests
- Error handling tests

### Test Framework Suggestions
```javascript
// Example using Jest and Supertest
const request = require('supertest');
const app = require('../app');

describe('Usuario API', () => {
  test('GET /api/usuarios should return all users', async () => {
    const response = await request(app)
      .get('/api/usuarios')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/usuarios should create user', async () => {
    const userData = {
      tipo_documento: 'CC',
      numero_documento: '123456789',
      primer_nombre: 'Test'
    };

    const response = await request(app)
      .post('/api/usuarios')
      .send(userData)
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
  });
});
```

### Database Testing
- Use test database separate from development
- Implement database seeding for consistent test data
- Clean up test data after each test run

---

This technical reference provides comprehensive coverage of the internal architecture, patterns, and development guidelines for the Parking Lot REST API. Use this document as a guide for understanding the codebase structure and implementing new features following established patterns.