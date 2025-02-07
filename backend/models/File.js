const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const File = sequelize.define(
    "File",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        demandeId: { // Foreign key
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        classMethods: {
            associate: function(models) {
              File.belongsTo(models.Demande)
            }}
      
    },
    {
        sequelize,
        modelName: "File",
        timestamps: true,
    }
);

module.exports = File;
