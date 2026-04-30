const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tanggal_dibuat: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'notes',
    timestamps: false
});

module.exports = Note;
