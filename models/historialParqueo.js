const db = require('./database');

class HistorialParqueo {
  constructor({ CELDA_id, VEHICULO_id, fecha_hora }) {
    this.CELDA_id = CELDA_id;
    this.VEHICULO_id = VEHICULO_id;
    this.fecha_hora = fecha_hora;
  }

  // Getters y setters
  getCeldaId() { return this.CELDA_id; }
  setCeldaId(id) { this.CELDA_id = id; }
  getVehiculoId() { return this.VEHICULO_id; }
  setVehiculoId(id) { this.VEHICULO_id = id; }
  getFechaHora() { return this.fecha_hora; }
  setFechaHora(f) { this.fecha_hora = f; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM HISTORIAL_PARQUEO');
    database.end();
    return rows;
  }

  static async getById(CELDA_id, VEHICULO_id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM HISTORIAL_PARQUEO WHERE CELDA_id = ? AND VEHICULO_id = ?', [CELDA_id, VEHICULO_id]);
    database.end();
    return rows[0];
  }

  static async create(historial) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO HISTORIAL_PARQUEO (CELDA_id, VEHICULO_id, fecha_hora) VALUES (?, ?, ?)',
      [historial.CELDA_id, historial.VEHICULO_id, historial.fecha_hora]
    );
    database.end();
    return result.insertId;
  }

  static async update(CELDA_id, VEHICULO_id, historial) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE HISTORIAL_PARQUEO SET fecha_hora=? WHERE CELDA_id=? AND VEHICULO_id=?',
      [historial.fecha_hora, CELDA_id, VEHICULO_id]
    );
    database.end();
  }

  static async delete(CELDA_id, VEHICULO_id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM HISTORIAL_PARQUEO WHERE CELDA_id = ? AND VEHICULO_id = ?', [CELDA_id, VEHICULO_id]);
    database.end();
  }
}

module.exports = HistorialParqueo;
