const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.get("/report", attendanceController.getAttendanceReport);
router.get("/:date", attendanceController.getAttendanceByDate);
router.post("/", attendanceController.markAttendance);

module.exports = router;
