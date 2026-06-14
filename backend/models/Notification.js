const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.BIGINT, allowNull: false },
  message: { type: DataTypes.STRING(500), allowNull: false },
  demandId: { type: DataTypes.BIGINT, allowNull: true },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'Notifications', timestamps: true });

Notification.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId' });

module.exports = Notification;
