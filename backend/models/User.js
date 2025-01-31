const { DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");

class User extends Model {}

User.init(
  {
    id: { 
      type: DataTypes.BIGINT, 
      autoIncrement: true, 
      primaryKey: true 
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  {
    sequelize, 
    modelName: 'User',
  }
);

module.exports = User;
