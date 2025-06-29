const db = require('./database');

class ReporteIncidencia {
  constructor({ VEHICULO_id, INCIDENCIA_id, fecha_hora }) {
    this.VEHICULO_id = VEHICULO_id;
    this.INCIDENCIA_id = INCIDENCIA_id;
    this.fecha_hora = fecha_hora;
  }

  // Getters y setters
  getVehiculoId() { return this.VEHICULO_id; }
  setVehiculoId(id) { this.VEHICULO_id = id; }
  getIncidenciaId() { return this.INCIDENCIA_id; }
  setIncidenciaId(id) { this.INCIDENCIA_id = id; }
  getFechaHora() { return this.fecha_hora; }
  setFechaHora(f) { this.fecha_hora = f; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM REPORTE_INCIDENCIA');
    database.end();
    return rows;
  }

  static async getById(VEHICULO_id, INCIDENCIA_id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM REPORTE_INCIDENCIA WHERE VEHICULO_id = ? AND INCIDENCIA_id = ?', [VEHICULO_id, INCIDENCIA_id]);
    database.end();
    return rows[0];
  }

  static async create(reporte) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO REPORTE_INCIDENCIA (VEHICULO_id, INCIDENCIA_id, fecha_hora) VALUES (?, ?, ?)',
      [reporte.VEHICULO_id, reporte.INCIDENCIA_id, reporte.fecha_hora]
    );
    database.end();
    return result.insertId;
  }

  static async update(VEHICULO_id, INCIDENCIA_id, reporte) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE REPORTE_INCIDENCIA SET fecha_hora=? WHERE VEHICULO_id=? AND INCIDENCIA_id=?',
      [reporte.fecha_hora, VEHICULO_id, INCIDENCIA_id]
    );
    database.end();
  }

  static async delete(VEHICULO_id, INCIDENCIA_id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM REPORTE_INCIDENCIA WHERE VEHICULO_id = ? AND INCIDENCIA_id = ?', [VEHICULO_id, INCIDENCIA_id]);
    database.end();
  }
}

module.exports = ReporteIncidencia;
