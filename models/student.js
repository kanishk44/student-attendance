const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("Student", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rollNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Student;
