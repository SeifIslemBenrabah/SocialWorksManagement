const express = require('express')
const app = express()
const sequelize = require('./config/database');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json())
async function startServer() {
    try {
      await sequelize.sync({ force: false }); // Sync database (force: false to prevent data loss)
      console.log('Database synchronized successfully!');
  
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(` Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error(' Database sync error:', error);
    }
  }
  
  startServer();