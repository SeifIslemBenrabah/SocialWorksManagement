const {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/database");
const Account = require('./Account')
const MeetingPv = require('./MeetingPv')
class Meet extends Model {}
Meet.init(
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        date:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        time:{
            type:DataTypes.TIME,
            allowNull:false
        }
    },
    {
        sequelize,  
        modelName: 'Meet',
        timestamps: false,
      }
)
Meet.belongsToMany(Account, {through: "MeetMembers",
    foreignKey: "meetId",
    otherKey: "accountId",
    scope: {roleId: [3, 4, 5, 6]}});
Account.belongsToMany(Meet, {through: "MeetMembers",
    foreignKey: "accountId",
    otherKey: "meetId",});

Meet.hasMany(MeetingPv,{foreignKey:"meetingPvId",onDelete:"CASCADE"});
MeetingPv.belongsTo(Meet,{foreignKey:"meetingPvId",onDelete:"CASCADE"});
module.exports = Meet;
