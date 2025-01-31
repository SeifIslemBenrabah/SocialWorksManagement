const { DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");

class UserRole extends Model {}

UserRole.init(
  {
    id: { 
      type: DataTypes.BIGINT, 
      primaryKey: true
    },
    roleName: {
        type: DataTypes.ENUM('President', 'Vice President', 'Normal Member', 'Treasurer', 'Employee'),
        allowNull: false,
        unique: true
    },
  },
  {
    sequelize, 
    modelName: 'UserRole', // Use new name
    timestamps: false,
  }
);

const predefinedRoles = [
  { id: 1, roleName: 'President' },
  { id: 2, roleName: 'Vice President' },
  { id: 3, roleName: 'Normal Member' },
  { id: 4, roleName: 'Treasurer' },
  { id: 5, roleName: 'Employee' },
];

async function initializeRoles() {
  for (const role of predefinedRoles) {
    await UserRole.findOrCreate({ where: { id: role.id }, defaults: role });
  }
}

module.exports = { UserRole, initializeRoles };
