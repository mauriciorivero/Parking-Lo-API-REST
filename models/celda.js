const db = require('./database');

class Celda {
  constructor({ id, tipo, estado }) {
    this.id = id;
    this.tipo = tipo;
    this.estado = estado;
  }

  // Getters y setters
  getId() { return this.id; }
  setId(id) { this.id = id; }
  getTipo() { return this.tipo; }
  setTipo(tipo) { this.tipo = tipo; }
  getEstado() { return this.estado; }
  setEstado(estado) { this.estado = estado; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM CELDA');
    database.end();
    return rows;
  }

  static async getById(id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM CELDA WHERE id = ?', [id]);
    database.end();
    return rows[0];
  }

  static async create(celda) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO CELDA (tipo, estado) VALUES (?, ?)',
      [celda.tipo, celda.estado]
    );
    database.end();
    return result.insertId;
  }

  static async update(id, celda) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE CELDA SET tipo=?, estado=? WHERE id=?',
      [celda.tipo, celda.estado, id]
    );
    database.end();
  }

  static async delete(id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM CELDA WHERE id = ?', [id]);
    database.end();
  }
}

module.exports = Celda;
