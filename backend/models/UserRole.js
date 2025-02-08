const { DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");

class UserRole extends Model {}

UserRole.init(
  {
    id: { 
      type: DataTypes.BIGINT, 
      primaryKey: true
    },
    roletype:{
      type: DataTypes.ENUM('Admin', 'Employee', 'Committee'),
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,  // Pass the sequelize instance here
    modelName: 'UserRole',
    timestamps: false,
    tableName:'UserRoles'
  }
);

const predefinedRoles = [
  { id: 1, roletype: 'Admin', roleName: null },
  { id: 2, roletype: 'Employee', roleName: null },
  { id: 3, roletype: 'Committee', roleName: 'President' },
  { id: 4, roletype: 'Committee', roleName: 'Vice President' },
  { id: 5, roletype: 'Committee', roleName: 'Treasurer' },
  { id: 6, roletype: 'Committee', roleName: 'Normal Member' },
];

async function initializeRoles() {
  for (const role of predefinedRoles) {
    await UserRole.findOrCreate({ where: { id: role.id }, defaults: role });
  }
}

module.exports = { UserRole, initializeRoles };
