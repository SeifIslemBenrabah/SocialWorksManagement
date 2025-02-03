const {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/database");
class Programme extends Model {}
Programme.init(
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        categorieId:{
            type: DataTypes.BIGINT,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM('active','Expired'),
            allowNull:false,
            unique:true,
            defaultValue: 'active'
        }
    }
);
Programme.associate = (models) =>{
    Programme.belongsTo(models.Categorie,{foreignKey:'categorieId',onDelete:'CASCADE'});
    Programme.hasMany(models.Pcondition,{foreignKey:'programmeId',onDelete:'CASCADE'});
}
module.exports = Programme;