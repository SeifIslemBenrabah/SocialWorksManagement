const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MeetingPv = sequelize.define(
    "MeetingPv",
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
        meetingPvId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "MeetingPv",
        timestamps: true,
    }
);

module.exports = MeetingPv;
