const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/database");
const User = require('./User')
const {UserRole} = require('./UserRole')
class Account extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,  // Pass the sequelize instance here
    modelName: 'Account',
    tableName: 'Accounts',
    timestamps: true,
  }
);

  Account.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  Account.belongsTo(UserRole, { foreignKey: 'roleId' });

module.exports = Account;
