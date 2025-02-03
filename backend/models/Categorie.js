const { DataTypes, Model } = require('sequelize');
const sequelize = require("../config/database");

class Categorie extends Model {}

Categorie.init(
  {
    id: { 
      type: DataTypes.BIGINT, 
      autoIncrement: true,
      primaryKey: true
    },
    CategorieName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
  },
  {
    sequelize,  
    modelName: 'Categorie',
    timestamps: false,
  }
);
Categorie.associate = (models) => {
    Categorie.hasMany(models.Programme, { foreignKey: "categorieId", onDelete: "CASCADE" });
};

module.exports = Categorie;
