const express = require('express');
const app = express();
const sequelize = require('./config/database');  
require('dotenv').config();  
const userRoute = require('./Routes/user.route');
const loginRoute = require('./Routes/login.route');
const { initializeRoles } = require('./models/UserRole');
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoute);  
app.use('/login', loginRoute); 

async function startServer() {
  try {
    await sequelize.authenticate(); 
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully!');
    await initializeRoles()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database sync error:', error);
    process.exit(1); 
  }
}

startServer();
