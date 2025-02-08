const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, 
});
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully!');
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
  }
}
sequelize.sync({ force: false })
testConnection();

module.exports = sequelize;
