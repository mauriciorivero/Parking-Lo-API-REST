# Parking Lot REST API - Comprehensive Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Database Configuration](#database-configuration)
- [Models](#models)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [Development Setup](#development-setup)
- [Usage Examples](#usage-examples)

## Project Overview

The Parking Lot REST API is a comprehensive backend solution for managing parking lot operations built with Node.js, Express.js, and MySQL. It provides complete CRUD functionality for managing parking spaces, users, vehicles, incidents, and access control.

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js ^4.18.2
- **Database**: MySQL with mysql2 ^3.14.1
- **Architecture**: MVC Pattern

### Key Features
- User management with profiles
- Vehicle registration and tracking
- Parking space (celda) management
- Access control with entry/exit logging
- Incident reporting system
- Parking history tracking
- Pico y Placa enforcement

## Architecture

### Project Structure
```
parking-lot-api-rest/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── models/                # Data models and database interactions
│   ├── database.js        # Database connection configuration
│   ├── usuario.js         # User model
│   ├── vehiculo.js        # Vehicle model
│   ├── celda.js          # Parking cell model
│   ├── perfilUsuario.js   # User profile model
│   ├── incidencia.js      # Incident model
│   ├── reporteIncidencia.js # Incident report model
│   ├── accesoSalidas.js   # Access/exit model
│   ├── historialParqueo.js # Parking history model
│   └── picoPlaca.js       # Pico y Placa model
├── routes/                # API route handlers
│   ├── usuario.js         # User routes
│   ├── vehiculo.js        # Vehicle routes
│   ├── celda.js          # Parking cell routes
│   ├── perfilUsuario.js   # User profile routes
│   ├── incidencia.js      # Incident routes
│   ├── reporteIncidencia.js # Incident report routes
│   ├── accesoSalidas.js   # Access/exit routes
│   ├── historialParqueo.js # Parking history routes
│   ├── picoPlaca.js       # Pico y Placa routes
│   └── example.js         # Example/test routes
└── Script-SQL-ParkingLot.sql # Database schema
```

## Database Configuration

### Database Class (`models/database.js`)

The Database class manages MySQL connections using the mysql2 library.

#### Configuration
```javascript
{
  host: 'localhost',
  user: 'parkingadmin',
  password: 'Park1n_Adm1n',
  database: 'ParkingLot',
  port: 8889
}
```

#### Methods
- `constructor()`: Initializes MySQL connection
- `connect()`: Returns a Promise for database connection
- `end()`: Closes the database connection

#### Usage Example
```javascript
const Database = require('./models/database');
const db = new Database();
await db.connect();
// Perform database operations
db.end();
```

## Models

All models follow a consistent pattern with getter/setter methods and static CRUD operations.

### Base Model Pattern

Each model includes:
- Constructor with property initialization
- Getter and setter methods for each property
- Static methods for CRUD operations:
  - `getAll()`: Retrieve all records
  - `getById(id)`: Retrieve single record by ID
  - `create(data)`: Create new record
  - `update(id, data)`: Update existing record
  - `delete(id)`: Delete record

### Usuario Model (`models/usuario.js`)

Manages user accounts and authentication.

#### Properties
```javascript
{
  id_usuario: Number,           // Primary key
  tipo_documento: String,       // Document type (CC, TI, etc.)
  numero_documento: String,     // Document number
  primer_nombre: String,        // First name
  segundo_nombre: String,       // Second name (optional)
  primer_apellido: String,      // First surname
  segundo_apellido: String,     // Second surname (optional)
  direccion_correo: String,     // Email address
  numero_celular: String,       // Mobile phone number
  foto_perfil: String,          // Profile picture path
  estado: String,               // Status (activo, inactivo)
  clave: String,                // Password
  PERFIL_USUARIO_id: Number     // Foreign key to user profile
}
```

#### Special Methods
- `getByNumeroDocumento(numero_documento)`: Find user by document number

### Vehiculo Model (`models/vehiculo.js`)

Manages vehicle registration and information.

#### Properties
```javascript
{
  id: Number,                   // Primary key
  placa: String,                // License plate
  color: String,                // Vehicle color
  modelo: String,               // Model year
  marca: String,                // Brand/manufacturer
  tipo: String,                 // Type (Carro, Moto, etc.)
  USUARIO_id_usuario: Number    // Foreign key to user
}
```

### Celda Model (`models/celda.js`)

Manages parking spaces/cells.

#### Properties
```javascript
{
  id: Number,                   // Primary key
  tipo: String,                 // Type (Carro, Moto)
  estado: String                // Status (Libre, Ocupado)
}
```

### Additional Models

All other models (PerfilUsuario, Incidencia, ReporteIncidencia, AccesoSalidas, HistorialParqueo, PicoPlaca) follow the same pattern with their respective properties and CRUD operations.

## API Endpoints

### Base URL
All endpoints are prefixed with `/api`

### Response Format
All endpoints return JSON responses with consistent structure:

#### Success Response
```javascript
// GET requests
{
  "data": [...] // Array or single object
}

// POST requests
{
  "id": 1 // Created resource ID
}

// PUT/DELETE requests
{
  "message": "Operation successful"
}
```

#### Error Response
```javascript
{
  "error": "Error message description"
}
```

### Usuario Endpoints

#### GET `/api/usuarios`
Retrieve all users.

**Response:**
```javascript
[
  {
    "id_usuario": 1,
    "tipo_documento": "CC",
    "numero_documento": "123456789",
    "primer_nombre": "Juan",
    "segundo_nombre": "Carlos",
    "primer_apellido": "Pérez",
    "segundo_apellido": "Gómez",
    "direccion_correo": "juan@email.com",
    "numero_celular": "3001234567",
    "foto_perfil": "img/juan.jpg",
    "estado": "activo",
    "clave": "encrypted_password",
    "PERFIL_USUARIO_id": 1
  }
]
```

#### GET `/api/usuarios/:id`
Retrieve user by ID.

**Parameters:**
- `id` (path): User ID

**Response:** Single user object or 404 error

#### GET `/api/usuarios/documento/:numero_documento`
Retrieve user by document number.

**Parameters:**
- `numero_documento` (path): Document number

**Response:** Single user object or 404 error

#### POST `/api/usuarios`
Create new user.

**Request Body:**
```javascript
{
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "Gómez",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "img/juan.jpg",
  "estado": "activo",
  "clave": "password123",
  "PERFIL_USUARIO_id": 1
}
```

**Response:**
```javascript
{
  "id": 1
}
```

#### PUT `/api/usuarios/:id`
Update existing user.

**Parameters:**
- `id` (path): User ID

**Request Body:** Same as POST request

**Response:**
```javascript
{
  "message": "Usuario actualizado"
}
```

#### DELETE `/api/usuarios/:id`
Delete user.

**Parameters:**
- `id` (path): User ID

**Response:**
```javascript
{
  "message": "Usuario eliminado"
}
```

### Vehiculo Endpoints

#### GET `/api/vehiculos`
Retrieve all vehicles.

**Response:**
```javascript
[
  {
    "id": 1,
    "placa": "ABC123",
    "color": "rojo",
    "modelo": "2020",
    "marca": "Toyota",
    "tipo": "Carro",
    "USUARIO_id_usuario": 1
  }
]
```

#### GET `/api/vehiculos/:id`
Retrieve vehicle by ID.

#### POST `/api/vehiculos`
Create new vehicle.

**Request Body:**
```javascript
{
  "placa": "ABC123",
  "color": "rojo",
  "modelo": "2020",
  "marca": "Toyota",
  "tipo": "Carro",
  "USUARIO_id_usuario": 1
}
```

#### PUT `/api/vehiculos/:id`
Update existing vehicle.

#### DELETE `/api/vehiculos/:id`
Delete vehicle.

### Celda Endpoints

#### GET `/api/celdas`
Retrieve all parking cells.

**Response:**
```javascript
[
  {
    "id": 1,
    "tipo": "Carro",
    "estado": "Libre"
  }
]
```

#### GET `/api/celdas/:id`
Retrieve parking cell by ID.

#### POST `/api/celdas`
Create new parking cell.

**Request Body:**
```javascript
{
  "tipo": "Carro",
  "estado": "Libre"
}
```

#### PUT `/api/celdas/:id`
Update parking cell status.

**Request Body:**
```javascript
{
  "tipo": "Carro",
  "estado": "Ocupado"
}
```

#### DELETE `/api/celdas/:id`
Delete parking cell.

### PerfilUsuario Endpoints

#### GET `/api/perfiles`
Retrieve all user profiles.

#### POST `/api/perfiles`
Create new user profile.

**Request Body:**
```javascript
{
  "perfil": "administrador"
}
```

### PicoPlaca Endpoints

#### GET `/api/picoplaca`
Retrieve all pico y placa restrictions.

#### POST `/api/picoplaca`
Create new pico y placa restriction.

**Request Body:**
```javascript
{
  "tipo_vehiculo": "Carro",
  "numero": "1",
  "dia": "Lunes"
}
```

### AccesoSalidas Endpoints

#### GET `/api/accesosalidas`
Retrieve all access/exit records.

#### POST `/api/accesosalidas`
Create new access/exit record.

**Request Body:**
```javascript
{
  "movimiento": "Entrada",
  "fecha_hora": "2025-01-15 14:30:00",
  "puerta": "Puerta 1",
  "tiempo_estadia": 0,
  "VEHICULO_id": 1
}
```

### Incidencia Endpoints

#### GET `/api/incidencias`
Retrieve all incident types.

#### POST `/api/incidencias`
Create new incident type.

**Request Body:**
```javascript
{
  "nombre": "Robo de vehiculo"
}
```

### ReporteIncidencia Endpoints

#### GET `/api/reportesincidencia`
Retrieve all incident reports.

#### GET `/api/reportesincidencia/:vehiculo_id/:incidencia_id`
Retrieve specific incident report by vehicle and incident IDs.

#### POST `/api/reportesincidencia`
Create new incident report.

**Request Body:**
```javascript
{
  "VEHICULO_id": 1,
  "INCIDENCIA_id": 1,
  "fecha_hora": "2025-01-15 14:30:00"
}
```

#### PUT `/api/reportesincidencia/:vehiculo_id/:incidencia_id`
Update incident report.

#### DELETE `/api/reportesincidencia/:vehiculo_id/:incidencia_id`
Delete incident report.

### HistorialParqueo Endpoints

#### GET `/api/historiales`
Retrieve all parking history records.

#### GET `/api/historiales/:celda_id/:vehiculo_id`
Retrieve specific parking history by cell and vehicle IDs.

#### POST `/api/historiales`
Create new parking history record.

**Request Body:**
```javascript
{
  "CELDA_id": 1,
  "VEHICULO_id": 1,
  "fecha_hora": "2025-01-15 14:30:00"
}
```

#### PUT `/api/historiales/:celda_id/:vehiculo_id`
Update parking history record.

#### DELETE `/api/historiales/:celda_id/:vehiculo_id`
Delete parking history record.

## Error Handling

All endpoints implement consistent error handling:

### HTTP Status Codes
- `200`: Successful GET/PUT operations
- `201`: Successful POST operations
- `404`: Resource not found
- `500`: Internal server error

### Error Response Format
```javascript
{
  "error": "Detailed error message"
}
```

### Common Error Scenarios
1. **Resource Not Found (404)**: When requesting non-existent records
2. **Database Connection Error (500)**: When database is unavailable
3. **Validation Error (500)**: When required fields are missing
4. **Foreign Key Constraint (500)**: When referencing non-existent related records

## Authentication

Currently, the API does not implement authentication middleware. User passwords are stored in the `clave` field of the Usuario model. For production use, consider implementing:

1. JWT token-based authentication
2. Password hashing (bcrypt)
3. Role-based access control using PERFIL_USUARIO
4. API rate limiting

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL database server
- npm package manager

### Installation Steps

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd parking-lot-api-rest
npm install
```

2. **Database setup:**
```bash
# Import the database schema
mysql -u root -p < Script-SQL-ParkingLot.sql
```

3. **Configure database connection:**
Edit `models/database.js` with your MySQL credentials:
```javascript
{
  host: 'your-host',
  user: 'your-username',
  password: 'your-password',
  database: 'ParkingLot',
  port: 3306
}
```

4. **Start the server:**
```bash
npm start
```

The server will start on port 3000 (or PORT environment variable).

### Testing Database Connection
```bash
node test-db-connection.js
```

## Usage Examples

### Complete User Registration Flow

1. **Create user profile:**
```bash
curl -X POST http://localhost:3000/api/perfiles \
  -H "Content-Type: application/json" \
  -d '{"perfil": "usuario"}'
```

2. **Register user:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "tipo_documento": "CC",
    "numero_documento": "123456789",
    "primer_nombre": "Juan",
    "primer_apellido": "Pérez",
    "direccion_correo": "juan@email.com",
    "numero_celular": "3001234567",
    "estado": "activo",
    "clave": "password123",
    "PERFIL_USUARIO_id": 1
  }'
```

3. **Register vehicle:**
```bash
curl -X POST http://localhost:3000/api/vehiculos \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC123",
    "color": "rojo",
    "modelo": "2020",
    "marca": "Toyota",
    "tipo": "Carro",
    "USUARIO_id_usuario": 1
  }'
```

### Parking Management Flow

1. **Create parking cell:**
```bash
curl -X POST http://localhost:3000/api/celdas \
  -H "Content-Type: application/json" \
  -d '{"tipo": "Carro", "estado": "Libre"}'
```

2. **Record vehicle entry:**
```bash
curl -X POST http://localhost:3000/api/accesosalidas \
  -H "Content-Type: application/json" \
  -d '{
    "movimiento": "Entrada",
    "fecha_hora": "2025-01-15 14:30:00",
    "puerta": "Puerta 1",
    "tiempo_estadia": 0,
    "VEHICULO_id": 1
  }'
```

3. **Update cell status to occupied:**
```bash
curl -X PUT http://localhost:3000/api/celdas/1 \
  -H "Content-Type: application/json" \
  -d '{"tipo": "Carro", "estado": "Ocupado"}'
```

4. **Create parking history record:**
```bash
curl -X POST http://localhost:3000/api/historiales \
  -H "Content-Type: application/json" \
  -d '{
    "CELDA_id": 1,
    "VEHICULO_id": 1,
    "fecha_hora": "2025-01-15 14:30:00"
  }'
```

### Incident Reporting Flow

1. **Create incident type:**
```bash
curl -X POST http://localhost:3000/api/incidencias \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Daño al vehiculo"}'
```

2. **Report incident:**
```bash
curl -X POST http://localhost:3000/api/reportesincidencia \
  -H "Content-Type: application/json" \
  -d '{
    "VEHICULO_id": 1,
    "INCIDENCIA_id": 1,
    "fecha_hora": "2025-01-15 15:00:00"
  }'
```

### Data Retrieval Examples

1. **Get all available parking spaces:**
```bash
curl http://localhost:3000/api/celdas | jq '.[] | select(.estado == "Libre")'
```

2. **Get user's vehicles:**
```bash
curl http://localhost:3000/api/vehiculos | jq '.[] | select(.USUARIO_id_usuario == 1)'
```

3. **Get parking history for specific vehicle:**
```bash
curl http://localhost:3000/api/historiales | jq '.[] | select(.VEHICULO_id == 1)'
```

### Bulk Operations

For handling multiple records, you can use the provided endpoints in loops or consider implementing batch endpoints for better performance.

### Error Handling Example

```javascript
// Example error handling in client code
async function createUser(userData) {
  try {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    const result = await response.json();
    console.log('User created with ID:', result.id);
    return result;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
}
```

---

This documentation provides comprehensive coverage of all public APIs, functions, and components in the Parking Lot REST API. For additional support or feature requests, please refer to the project repository or contact the development team.