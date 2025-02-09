const { DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");
const Programme = require("./Programme")
class Pcondition extends Model {}

Pcondition.init(
  {
    id: { 
      type: DataTypes.BIGINT, 
      autoIncrement: true, 
      primaryKey: true 
    },
    programmeId: { 
        type: DataTypes.BIGINT, 
        allowNull: false
      },
    Condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Pcondition'
  }
);


module.exports = Pcondition;
