const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('./auth/auth');
const userRoutes = require('./routes/user.routes');
const reservasRoutes = require('./routes/reservas.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
const mongoose = require('mongoose');

const corsOptions = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
};

//comento temporalmente las opciones porque me dan un conlicto al momento de registrar usuario
app.use(cors(/* corsOptions */));
app.set('PORT', 3000);
app.use(express.json());
app.use(passport.initialize());

// RUTAS
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/reservas', reservasRoutes);
app.use('/servicios', serviciosRoutes);

// Conexión al puerto 3000
const port = app.get('PORT')
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})

main().catch(err => console.log(err));

// Conexión con MongoDB
async function main() {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
}