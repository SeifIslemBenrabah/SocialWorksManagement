const {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/database");
const User = require("./User")
const Programme = require("./Programme")
class Demand extends Model {}
Demand.init(
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        userId:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        programmeId:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM('Accepted','Complet','Waiting','Incomplet'),
            allowNull:false,
            defaultValue: 'Waiting'
        }
    },
    {
        sequelize,  
        modelName: 'Demand',
        timestamps: false,
      }
);

Demand.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Demand.belongsTo(Programme,{foreignKey: "programmeId",onDelete: "CASCADE"})

module.exports = Demand;