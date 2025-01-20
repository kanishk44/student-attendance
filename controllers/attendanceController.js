const Attendance = require("../models/attendance");
const Student = require("../models/student");
const { Op } = require("sequelize");

exports.markAttendance = async (req, res) => {
  try {
    const { date, attendanceData } = req.body;

    // Delete existing attendance for the date if any
    await Attendance.destroy({ where: { date } });

    // Create new attendance records
    const attendanceRecords = attendanceData.map((record) => ({
      date,
      StudentId: record.studentId,
      status: record.status,
    }));

    await Attendance.bulkCreate(attendanceRecords);
    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const attendance = await Attendance.findAll({
      where: { date },
      include: [Student],
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceReport = async (req, res) => {
  try {
    const students = await Student.findAll();
    const totalDates = await Attendance.count({
      distinct: true,
      col: "date",
    });

    const report = await Promise.all(
      students.map(async (student) => {
        const presentCount = await Attendance.count({
          where: {
            StudentId: student.id,
            status: "present",
          },
        });

        return {
          student: student,
          attendedClasses: presentCount,
          totalClasses: totalDates,
          percentage: totalDates
            ? ((presentCount / totalDates) * 100).toFixed(2)
            : 0,
        };
      })
    );

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
