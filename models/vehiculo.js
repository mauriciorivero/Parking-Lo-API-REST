const db = require('./database');

class Vehiculo {
  constructor({ id, placa, color, modelo, marca, tipo, USUARIO_id_usuario }) {
    this.id = id;
    this.placa = placa;
    this.color = color;
    this.modelo = modelo;
    this.marca = marca;
    this.tipo = tipo;
    this.USUARIO_id_usuario = USUARIO_id_usuario;
  }

  // Getters y setters
  getId() { return this.id; }
  setId(id) { this.id = id; }
  getPlaca() { return this.placa; }
  setPlaca(placa) { this.placa = placa; }
  getColor() { return this.color; }
  setColor(color) { this.color = color; }
  getModelo() { return this.modelo; }
  setModelo(modelo) { this.modelo = modelo; }
  getMarca() { return this.marca; }
  setMarca(marca) { this.marca = marca; }
  getTipo() { return this.tipo; }
  setTipo(tipo) { this.tipo = tipo; }
  getUsuarioId() { return this.USUARIO_id_usuario; }
  setUsuarioId(id) { this.USUARIO_id_usuario = id; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM VEHICULO');
    database.end();
    return rows;
  }

  static async getById(id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM VEHICULO WHERE id = ?', [id]);
    database.end();
    return rows[0];
  }

  static async create(vehiculo) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO VEHICULO (placa, color, modelo, marca, tipo, USUARIO_id_usuario) VALUES (?, ?, ?, ?, ?, ?)',
      [vehiculo.placa, vehiculo.color, vehiculo.modelo, vehiculo.marca, vehiculo.tipo, vehiculo.USUARIO_id_usuario]
    );
    database.end();
    return result.insertId;
  }

  static async update(id, vehiculo) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE VEHICULO SET placa=?, color=?, modelo=?, marca=?, tipo=?, USUARIO_id_usuario=? WHERE id=?',
      [vehiculo.placa, vehiculo.color, vehiculo.modelo, vehiculo.marca, vehiculo.tipo, vehiculo.USUARIO_id_usuario, id]
    );
    database.end();
  }

  static async delete(id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM VEHICULO WHERE id = ?', [id]);
    database.end();
  }
}

module.exports = Vehiculo;
