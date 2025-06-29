const db = require('./database');

class AccesoSalidas {
  constructor({ id, movimiento, fecha_hora, puerta, tiempo_estadia, VEHICULO_id }) {
    this.id = id;
    this.movimiento = movimiento;
    this.fecha_hora = fecha_hora;
    this.puerta = puerta;
    this.tiempo_estadia = tiempo_estadia;
    this.VEHICULO_id = VEHICULO_id;
  }

  // Getters y setters
  getId() { return this.id; }
  setId(id) { this.id = id; }
  getMovimiento() { return this.movimiento; }
  setMovimiento(m) { this.movimiento = m; }
  getFechaHora() { return this.fecha_hora; }
  setFechaHora(f) { this.fecha_hora = f; }
  getPuerta() { return this.puerta; }
  setPuerta(p) { this.puerta = p; }
  getTiempoEstadia() { return this.tiempo_estadia; }
  setTiempoEstadia(t) { this.tiempo_estadia = t; }
  getVehiculoId() { return this.VEHICULO_id; }
  setVehiculoId(id) { this.VEHICULO_id = id; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM ACCESO_SALIDAS');
    database.end();
    return rows;
  }

  static async getById(id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM ACCESO_SALIDAS WHERE id = ?', [id]);
    database.end();
    return rows[0];
  }

  static async create(acceso) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO ACCESO_SALIDAS (movimiento, fecha_hora, puerta, tiempo_estadia, VEHICULO_id) VALUES (?, ?, ?, ?, ?)',
      [acceso.movimiento, acceso.fecha_hora, acceso.puerta, acceso.tiempo_estadia, acceso.VEHICULO_id]
    );
    database.end();
    return result.insertId;
  }

  static async update(id, acceso) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE ACCESO_SALIDAS SET movimiento=?, fecha_hora=?, puerta=?, tiempo_estadia=?, VEHICULO_id=? WHERE id=?',
      [acceso.movimiento, acceso.fecha_hora, acceso.puerta, acceso.tiempo_estadia, acceso.VEHICULO_id, id]
    );
    database.end();
  }

  static async delete(id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM ACCESO_SALIDAS WHERE id = ?', [id]);
    database.end();
  }
}

module.exports = AccesoSalidas;
