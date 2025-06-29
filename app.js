const express = require('express');
const exampleRoutes = require('./routes/example');
const celdaRoutes = require('./routes/celda');
const usuarioRoutes = require('./routes/usuario');
const vehiculoRoutes = require('./routes/vehiculo');
const perfilUsuarioRoutes = require('./routes/perfilUsuario');
const picoPlacaRoutes = require('./routes/picoPlaca');
const accesoSalidasRoutes = require('./routes/accesoSalidas');
const incidenciaRoutes = require('./routes/incidencia');
const reporteIncidenciaRoutes = require('./routes/reporteIncidencia');
const historialParqueoRoutes = require('./routes/historialParqueo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', exampleRoutes);
app.use('/api/celdas', celdaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/perfiles', perfilUsuarioRoutes);
app.use('/api/picoplaca', picoPlacaRoutes);
app.use('/api/accesosalidas', accesoSalidasRoutes);
app.use('/api/incidencias', incidenciaRoutes);
app.use('/api/reportesincidencia', reporteIncidenciaRoutes);
app.use('/api/historiales', historialParqueoRoutes);

app.get('/', (req, res) => {
  res.send('API REST Parking Lot funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
