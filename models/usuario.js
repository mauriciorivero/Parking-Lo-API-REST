const db = require('./database');

class Usuario {
  constructor({
    id_usuario, tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion_correo, numero_celular, foto_perfil, estado, clave, PERFIL_USUARIO_id
  }) {
    this.id_usuario = id_usuario;
    this.tipo_documento = tipo_documento;
    this.numero_documento = numero_documento;
    this.primer_nombre = primer_nombre;
    this.segundo_nombre = segundo_nombre;
    this.primer_apellido = primer_apellido;
    this.segundo_apellido = segundo_apellido;
    this.direccion_correo = direccion_correo;
    this.numero_celular = numero_celular;
    this.foto_perfil = foto_perfil;
    this.estado = estado;
    this.clave = clave;
    this.PERFIL_USUARIO_id = PERFIL_USUARIO_id;
  }

  // Getters y setters
  getIdUsuario() { return this.id_usuario; }
  setIdUsuario(id) { this.id_usuario = id; }
  getTipoDocumento() { return this.tipo_documento; }
  setTipoDocumento(tipo) { this.tipo_documento = tipo; }
  getNumeroDocumento() { return this.numero_documento; }
  setNumeroDocumento(num) { this.numero_documento = num; }
  getPrimerNombre() { return this.primer_nombre; }
  setPrimerNombre(n) { this.primer_nombre = n; }
  getSegundoNombre() { return this.segundo_nombre; }
  setSegundoNombre(n) { this.segundo_nombre = n; }
  getPrimerApellido() { return this.primer_apellido; }
  setPrimerApellido(a) { this.primer_apellido = a; }
  getSegundoApellido() { return this.segundo_apellido; }
  setSegundoApellido(a) { this.segundo_apellido = a; }
  getDireccionCorreo() { return this.direccion_correo; }
  setDireccionCorreo(c) { this.direccion_correo = c; }
  getNumeroCelular() { return this.numero_celular; }
  setNumeroCelular(c) { this.numero_celular = c; }
  getFotoPerfil() { return this.foto_perfil; }
  setFotoPerfil(f) { this.foto_perfil = f; }
  getEstado() { return this.estado; }
  setEstado(e) { this.estado = e; }
  getClave() { return this.clave; }
  setClave(c) { this.clave = c; }
  getPerfilUsuarioId() { return this.PERFIL_USUARIO_id; }
  setPerfilUsuarioId(id) { this.PERFIL_USUARIO_id = id; }

  // Métodos CRUD
  static async getAll() {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM USUARIO');
    database.end();
    return rows;
  }

  static async getById(id_usuario) {
    const database = new db();
    const [rows] = await database.connection.promise().query('SELECT * FROM USUARIO WHERE id_usuario = ?', [id_usuario]);
    database.end();
    return rows[0];
  }

  static async create(usuario) {
    const database = new db();
    const [result] = await database.connection.promise().query(
      'INSERT INTO USUARIO (tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion_correo, numero_celular, foto_perfil, estado, clave, PERFIL_USUARIO_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [usuario.tipo_documento, usuario.numero_documento, usuario.primer_nombre, usuario.segundo_nombre, usuario.primer_apellido, usuario.segundo_apellido, usuario.direccion_correo, usuario.numero_celular, usuario.foto_perfil, usuario.estado, usuario.clave, usuario.PERFIL_USUARIO_id]
    );
    database.end();
    return result.insertId;
  }

  static async update(id_usuario, usuario) {
    const database = new db();
    await database.connection.promise().query(
      'UPDATE USUARIO SET tipo_documento=?, numero_documento=?, primer_nombre=?, segundo_nombre=?, primer_apellido=?, segundo_apellido=?, direccion_correo=?, numero_celular=?, foto_perfil=?, estado=?, clave=?, PERFIL_USUARIO_id=? WHERE id_usuario=?',
      [usuario.tipo_documento, usuario.numero_documento, usuario.primer_nombre, usuario.segundo_nombre, usuario.primer_apellido, usuario.segundo_apellido, usuario.direccion_correo, usuario.numero_celular, usuario.foto_perfil, usuario.estado, usuario.clave, usuario.PERFIL_USUARIO_id, id_usuario]
    );
    database.end();
  }

  static async delete(id_usuario) {
    const database = new db();
    await database.connection.promise().query('DELETE FROM USUARIO WHERE id_usuario = ?', [id_usuario]);
    database.end();
  }
}

module.exports = Usuario;
