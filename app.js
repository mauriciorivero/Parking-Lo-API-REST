const express = require('express');
const exampleRoutes = require('./routes/example');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', exampleRoutes);

app.get('/', (req, res) => {
  res.send('API REST Parking Lot funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
