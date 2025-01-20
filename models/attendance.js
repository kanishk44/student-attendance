const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Student = require("./student");

const Attendance = sequelize.define("Attendance", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("present", "absent"),
    allowNull: false,
  },
});

Attendance.belongsTo(Student);
Student.hasMany(Attendance);

module.exports = Attendance;
