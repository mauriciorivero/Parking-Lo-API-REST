const db = require('./database');

class PerfilUsuario {
  constructor(id, perfil) {
    this.id = id;
    this.perfil = perfil;
  }

  // Getters y setters
  getId() { return this.id; }
  setId(id) { this.id = id; }
  getPerfil() { return this.perfil; }
  setPerfil(perfil) { this.perfil = perfil; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM PERFIL_USUARIO');
    database.end();
    return rows;
  }

  static async getById(id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM PERFIL_USUARIO WHERE id = ?', [id]);
    database.end();
    return rows[0];
  }

  static async create(perfil) {
    const database = new db();
    const [result] = await database.connection.promise().query('INSERT INTO PERFIL_USUARIO (perfil) VALUES (?)', [perfil]);
    database.end();
    return result.insertId;
  }

  static async update(id, perfil) {
    const database = new db();
    await database.connection.promise().query('UPDATE PERFIL_USUARIO SET perfil = ? WHERE id = ?', [perfil, id]);
    database.end();
  }

  static async delete(id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM PERFIL_USUARIO WHERE id = ?', [id]);
    database.end();
  }
}

module.exports = PerfilUsuario;
