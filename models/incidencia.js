const db = require('./database');

class Incidencia {
  constructor({ id, nombre }) {
    this.id = id;
    this.nombre = nombre;
  }

  // Getters y setters
  getId() { return this.id; }
  setId(id) { this.id = id; }
  getNombre() { return this.nombre; }
  setNombre(nombre) { this.nombre = nombre; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM INCIDENCIA');
    database.end();
    return rows;
  }

  static async getById(id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM INCIDENCIA WHERE id = ?', [id]);
    database.end();
    return rows[0];
  }

  static async create(incidencia) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO INCIDENCIA (nombre) VALUES (?)',
      [incidencia.nombre]
    );
    database.end();
    return result.insertId;
  }

  static async update(id, incidencia) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE INCIDENCIA SET nombre=? WHERE id=?',
      [incidencia.nombre, id]
    );
    database.end();
  }

  static async delete(id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM INCIDENCIA WHERE id = ?', [id]);
    database.end();
  }
}

module.exports = Incidencia;
