const db = require('./database');

class PicoPlaca {
  constructor({ id, tipo_vehiculo, numero, dia }) {
    this.id = id;
    this.tipo_vehiculo = tipo_vehiculo;
    this.numero = numero;
    this.dia = dia;
  }

  // Getters y setters
  getId() { return this.id; }
  setId(id) { this.id = id; }
  getTipoVehiculo() { return this.tipo_vehiculo; }
  setTipoVehiculo(tipo) { this.tipo_vehiculo = tipo; }
  getNumero() { return this.numero; }
  setNumero(numero) { this.numero = numero; }
  getDia() { return this.dia; }
  setDia(dia) { this.dia = dia; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM PICO_PLACA');
    database.end();
    return rows;
  }

  static async getById(id) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM PICO_PLACA WHERE id = ?', [id]);
    database.end();
    return rows[0];
  }

  static async create(picoPlaca) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO PICO_PLACA (tipo_vehiculo, numero, dia) VALUES (?, ?, ?)',
      [picoPlaca.tipo_vehiculo, picoPlaca.numero, picoPlaca.dia]
    );
    database.end();
    return result.insertId;
  }

  static async update(id, picoPlaca) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE PICO_PLACA SET tipo_vehiculo=?, numero=?, dia=? WHERE id=?',
      [picoPlaca.tipo_vehiculo, picoPlaca.numero, picoPlaca.dia, id]
    );
    database.end();
  }

  static async delete(id) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM PICO_PLACA WHERE id = ?', [id]);
    database.end();
  }
}

module.exports = PicoPlaca;
