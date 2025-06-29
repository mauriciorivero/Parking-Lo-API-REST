const mysql = require('mysql2');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'parkingadmin',
      password: 'Park1n_Adm1n',
      database: 'ParkingLot',
      port: 8889
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Conexión exitosa a MySQL');
        }
      });
    });
  }

  end() {
    this.connection.end();
  }
}

module.exports = Database;
