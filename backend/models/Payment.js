const {DataTypes,Model} = require('sequelize')
const sequelize = require('../config/database')
class Payment extends Model {}
Payment.init(
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey:true
        },
        paymentTitle:{
            type: DataTypes.STRING,
            allowNull:false
        },
        paymentDate:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        paymentMontant:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        paymentType:{
            type:DataTypes.ENUM('Oncasement','Decasement'),
            allowNull:false,
            defaultValue:'Oncasement'
        }
    },{
        sequelize,
        modelName:'Payment',
        timestamps:true
    }
)
module.exports =Payment;