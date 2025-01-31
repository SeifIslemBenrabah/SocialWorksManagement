const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/database");
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
      sequelize,
      modelName: 'Account',
      tableName: 'Accounts',
      timestamps: true,
    }
  );

  // Associations
  Account.associate = (models) => {
    Account.belongsTo(models.User, { foreignKey: 'userId' });
    Account.belongsTo(models.UserRole, { foreignKey: 'roleId' });
  };

module.exports = Account
