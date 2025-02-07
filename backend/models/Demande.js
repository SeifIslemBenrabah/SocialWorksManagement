const {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/database");
const User = require("./User")
const Programme = require("./Programme")
const File = require("./File")
class Demande extends Model {
}
Demande.init(
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        userId:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        programmeId:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM('Accepted','Complet','Waiting','Incomplet'),
            allowNull:false,
            defaultValue: 'Waiting'
        }
    },
    {
        sequelize,  
        modelName: 'Demande',
        timestamps: true,
      }
);

Demande.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Demande.belongsTo(Programme,{foreignKey: "programmeId",onDelete: "CASCADE"})

module.exports = Demande;