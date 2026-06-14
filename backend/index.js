require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const { initializeRoles } = require('./models/UserRole');
const User = require('./models/User');
const Account = require('./models/Account');

const userRoute = require('./Routes/user.route');
const loginRoute = require('./Routes/login.route');
const CategorieRoute = require('./Routes/Categorie.route');
const ProgrammeRoute = require('./Routes/Programme.route');
const DemandeRoute = require('./Routes/Demande.route');
const MeetRoute = require('./Routes/Meet.route');
const MeetingPvRoute = require('./Routes/MeetingPv.route');
const PaymentRoute = require('./Routes/Payment.route');
const NotificationRoute = require('./Routes/Notification.route');

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
app.use('/notifications', NotificationRoute);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

async function initializeAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@esi-sba.dz';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@1234';

  const existing = await User.findOne({ where: { email: adminEmail } });
  if (existing) return;

  const hashed = await bcrypt.hash(adminPassword, 10);
  const user = await User.create({ fullName: 'Admin', email: adminEmail });
  await Account.create({ userId: user.id, roleId: 1, password: hashed });
  console.log(`Default admin created → email: ${adminEmail}  password: ${adminPassword}`);
}

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully');
    await initializeRoles();
    await initializeAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
