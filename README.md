# Parking Lot API REST

Este proyecto es una API REST construida con Node.js, Express.js y MySQL.

## Instalación y ejecución

1. Clona el repositorio y entra a la carpeta del proyecto.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Configura tu base de datos MySQL con el script `Script-SQL-ParkingLot.sql` (incluido en la raíz).
4. Asegúrate de que los parámetros de conexión en `models/database.js` coincidan con tu entorno.
5. Inicia el servidor:
   ```sh
   npm start
   ```

## Endpoints disponibles y ejemplos de uso

### CELDA
- **GET** `/api/celdas` — Lista todas las celdas
- **GET** `/api/celdas/:id` — Obtiene una celda por id
- **POST** `/api/celdas`
  - Entrada:
    ```json
    { "tipo": "Carro", "estado": "Libre" }
    ```
  - Respuesta:
    ```json
    { "id": 1 }
    ```
- **PUT** `/api/celdas/:id`
  - Entrada:
    ```json
    { "tipo": "Carro", "estado": "Ocupado" }
    ```
  - Respuesta:
    ```json
    { "message": "Celda actualizada" }
    ```
- **DELETE** `/api/celdas/:id`
  - Respuesta:
    ```json
    { "message": "Celda eliminada" }
    ```

### USUARIO
- **GET** `/api/usuarios`
- **GET** `/api/usuarios/:id`
- **POST** `/api/usuarios`
  - Entrada:
    ```json
    {
      "tipo_documento": "CC",
      "numero_documento": "123456",
      "primer_nombre": "Juan",
      "segundo_nombre": "Carlos",
      "primer_apellido": "Pérez",
      "segundo_apellido": "Gómez",
      "direccion_correo": "juan@mail.com",
      "numero_celular": "3001234567",
      "foto_perfil": "img/juan.jpg",
      "estado": "activo",
      "clave": "clave123",
      "PERFIL_USUARIO_id": 1
    }
    ```
  - Respuesta:
    ```json
    { "id": 1 }
    ```
- **PUT** `/api/usuarios/:id` (igual estructura que POST)
- **DELETE** `/api/usuarios/:id`

### VEHICULO
- **GET** `/api/vehiculos`
- **GET** `/api/vehiculos/:id`
- **POST** `/api/vehiculos`
  - Entrada:
    ```json
    { "placa": "ABC123", "color": "rojo", "modelo": "2020", "marca": "Toyota", "tipo": "Carro", "USUARIO_id_usuario": 1 }
    ```
  - Respuesta:
    ```json
    { "id": 1 }
    ```
- **PUT** `/api/vehiculos/:id` (igual estructura que POST)
- **DELETE** `/api/vehiculos/:id`

### PERFIL_USUARIO
- **GET** `/api/perfiles`
- **GET** `/api/perfiles/:id`
- **POST** `/api/perfiles`
  - Entrada:
    ```json
    { "perfil": "administrador" }
    ```
  - Respuesta:
    ```json
    { "id": 1 }
    ```
- **PUT** `/api/perfiles/:id`
  - Entrada:
    ```json
    { "perfil": "usuario" }
    ```
  - Respuesta:
    ```json
    { "message": "Perfil actualizado" }
    ```
- **DELETE** `/api/perfiles/:id`

### PICO_PLACA
- **GET** `/api/picoplaca`
- **GET** `/api/picoplaca/:id`
- **POST** `/api/picoplaca`
  - Entrada:
    ```json
    { "tipo_vehiculo": "Carro", "numero": "1", "dia": "Lunes" }
    ```
- **PUT** `/api/picoplaca/:id` (igual estructura que POST)
- **DELETE** `/api/picoplaca/:id`

### ACCESO_SALIDAS
- **GET** `/api/accesosalidas`
- **GET** `/api/accesosalidas/:id`
- **POST** `/api/accesosalidas`
  - Entrada:
    ```json
    { "movimiento": "Entrada", "fecha_hora": "2025-04-06 19:22:53", "puerta": "Puerta 1", "tiempo_estadia": 0, "VEHICULO_id": 1 }
    ```
- **PUT** `/api/accesosalidas/:id` (igual estructura que POST)
- **DELETE** `/api/accesosalidas/:id`

### INCIDENCIA
- **GET** `/api/incidencias`
- **GET** `/api/incidencias/:id`
- **POST** `/api/incidencias`
  - Entrada:
    ```json
    { "nombre": "Robo de vehiculo" }
    ```
- **PUT** `/api/incidencias/:id` (igual estructura que POST)
- **DELETE** `/api/incidencias/:id`

### REPORTE_INCIDENCIA
- **GET** `/api/reportesincidencia`
- **GET** `/api/reportesincidencia/:vehiculo_id/:incidencia_id`
- **POST** `/api/reportesincidencia`
  - Entrada:
    ```json
    { "VEHICULO_id": 1, "INCIDENCIA_id": 10, "fecha_hora": "2025-04-06 19:22:53" }
    ```
- **PUT** `/api/reportesincidencia/:vehiculo_id/:incidencia_id` (igual estructura que POST)
- **DELETE** `/api/reportesincidencia/:vehiculo_id/:incidencia_id`

### HISTORIAL_PARQUEO
- **GET** `/api/historiales`
- **GET** `/api/historiales/:celda_id/:vehiculo_id`
- **POST** `/api/historiales`
  - Entrada:
    ```json
    { "CELDA_id": 1, "VEHICULO_id": 1, "fecha_hora": "2025-04-06 19:22:53" }
    ```
- **PUT** `/api/historiales/:celda_id/:vehiculo_id` (igual estructura que POST)
- **DELETE** `/api/historiales/:celda_id/:vehiculo_id`

---

Puedes probar todos los endpoints usando Postman o cualquier cliente HTTP.
