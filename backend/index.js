const express = require('express');
const app = express();
const sequelize = require('./config/database');  
require('dotenv').config();  
const userRoute = require('./Routes/user.route');
const loginRoute = require('./Routes/login.route');
const CategorieRoute = require('./Routes/Categorie.route')
const ProgrammeRoute = require('./Routes/Programme.route')
const DemandeRoute = require('./Routes/Demande.route')
const MeetRoute = require('./Routes/Meet.route')
const { initializeRoles } = require('./models/UserRole');
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoute);  
app.use('/login', loginRoute); 
app.use('/Categorie',CategorieRoute)
app.use('/Programme',ProgrammeRoute)
app.use('/Demand',DemandeRoute)
app.use('/Meet',MeetRoute)
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
console.log("Registered Models and Associations:");
console.log(sequelize.models); // Check if all models are registered

Object.keys(sequelize.models).forEach(modelName => {
    if (sequelize.models[modelName].associations) {
        console.log(`Model: ${modelName}`);
        console.log("Associations:", sequelize.models[modelName].associations);
    }
});

startServer();
