const {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/database");
const Account = require('./Account')
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
Meet.belongsToMany(Account, {through: "MeetMembers",foreignKey: "meetId",otherKey: "accountId",scope: {userRoleId: [3, 4, 5, 6]}});
Account.belongsToMany(Meet, {through: "MeetMembers",foreignKey: "accountId",otherKey: "meetId",});
module.exports = Meet;
