require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { initializeRoles } = require('./models/UserRole');

const userRoute = require('./Routes/user.route');
const loginRoute = require('./Routes/login.route');
const CategorieRoute = require('./Routes/Categorie.route');
const ProgrammeRoute = require('./Routes/Programme.route');
const DemandeRoute = require('./Routes/Demande.route');
const MeetRoute = require('./Routes/Meet.route');
const MeetingPvRoute = require('./Routes/MeetingPv.route');
const PaymentRoute = require('./Routes/Payment.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));

app.use('/login', loginRoute);
app.use('/users', userRoute);
app.use('/Categorie', CategorieRoute);
app.use('/Programme', ProgrammeRoute);
app.use('/Demand', DemandeRoute);
app.use('/Meet', MeetRoute);
app.use('/MeetingPv', MeetingPvRoute);
app.use('/payment', PaymentRoute);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully');
    await initializeRoles();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
