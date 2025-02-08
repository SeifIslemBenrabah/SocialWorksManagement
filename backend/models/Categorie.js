const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Categorie = sequelize.define("Categorie", {
    id: { 
        type: DataTypes.BIGINT, 
        autoIncrement: true,
        primaryKey: true
    },
    CategorieName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});



module.exports = Categorie;
