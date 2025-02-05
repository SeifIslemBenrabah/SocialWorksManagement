const {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/database");
const Pcondition = require("./Pcondition")
const Categorie = require("./Categorie")
class Programme extends Model {}
Programme.init(
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        categorieId:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM('active','expired'),
            allowNull:false,

            defaultValue: 'active'
        }
    },
    {
        sequelize,  
        modelName: 'Programme',
        timestamps: false,
      }
);
Programme.hasMany(Pcondition,{foreignKey:'programmeId',onDelete:'CASCADE'});

Programme.belongsTo(Categorie, { foreignKey: "categorieId", onDelete: "CASCADE" });
module.exports = Programme;