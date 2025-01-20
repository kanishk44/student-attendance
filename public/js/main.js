document.addEventListener("DOMContentLoaded", function () {
  const dateSelector = document.getElementById("dateSelector");
  const searchBtn = document.getElementById("searchBtn");
  const reportBtn = document.getElementById("reportBtn");
  const attendanceList = document.getElementById("attendanceList");
  const reportList = document.getElementById("reportList");

  // Set today's date as default
  dateSelector.valueAsDate = new Date();

  searchBtn.addEventListener("click", loadAttendance);
  reportBtn.addEventListener("click", loadReport);

  async function loadAttendance() {
    const date = dateSelector.value;
    try {
      const [studentsResponse, attendanceResponse] = await Promise.all([
        fetch("/api/students"),
        fetch(`/api/attendance/${date}`),
      ]);

      const students = await studentsResponse.json();
      const attendance = await attendanceResponse.json();

      displayAttendanceForm(students, attendance, date);

      attendanceList.style.display = "block";
      reportList.style.display = "none";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function displayAttendanceForm(students, attendance, date) {
    const attendanceMap = new Map(
      attendance.map((a) => [a.StudentId, a.status])
    );

    const html = `
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Attendance for ${date}</h5>
                </div>
                <div class="card-body">
                    ${students
                      .map(
                        (student) => `
                        <div class="student-row" data-student-id="${
                          student.id
                        }">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <strong>${student.name}</strong> (${
                          student.rollNumber
                        })
                                </div>
                                <div class="col-6">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-success attendance-status ${
                                          attendanceMap.get(student.id) ===
                                          "present"
                                            ? "active"
                                            : ""
                                        }" 
                                                onclick="markStatus(${
                                                  student.id
                                                }, 'present')">Present</button>
                                        <button type="button" class="btn btn-outline-danger attendance-status ${
                                          attendanceMap.get(student.id) ===
                                          "absent"
                                            ? "active"
                                            : ""
                                        }" 
                                                onclick="markStatus(${
                                                  student.id
                                                }, 'absent')">Absent</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="saveAttendance()">Save Attendance</button>
                </div>
            </div>
        `;

    attendanceList.innerHTML = html;
  }

  async function loadReport() {
    try {
      const response = await fetch("/api/attendance/report");
      const report = await response.json();

      const html = `
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Attendance Report</h5>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll Number</th>
                                    <th>Classes Attended</th>
                                    <th>Total Classes</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${report
                                  .map(
                                    (r) => `
                                    <tr>
                                        <td>${r.student.name}</td>
                                        <td>${r.student.rollNumber}</td>
                                        <td>${r.attendedClasses}</td>
                                        <td>${r.totalClasses}</td>
                                        <td>${r.percentage}%</td>
                                    </tr>
                                `
                                  )
                                  .join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

      reportList.innerHTML = html;
      attendanceList.style.display = "none";
      reportList.style.display = "block";
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

// Global functions for attendance marking
function markStatus(studentId, status) {
  const studentRow = document.querySelector(`[data-student-id="${studentId}"]`);
  const buttons = studentRow.querySelectorAll(".attendance-status");

  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase() === status) {
      btn.classList.add("active");
    }
  });
}

async function saveAttendance() {
  const date = document.getElementById("dateSelector").value;
  const studentRows = document.querySelectorAll(".student-row");
  const attendanceData = [];

  studentRows.forEach((row) => {
    const studentId = row.dataset.studentId;
    const presentButton = row.querySelector(".btn-outline-success");
    const absentButton = row.querySelector(".btn-outline-danger");

    if (presentButton.classList.contains("active")) {
      attendanceData.push({ studentId, status: "present" });
    } else if (absentButton.classList.contains("active")) {
      attendanceData.push({ studentId, status: "absent" });
    }
  });

  try {
    const response = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, attendanceData }),
    });

    if (response.ok) {
      alert("Attendance saved successfully!");
    } else {
      alert("Error saving attendance");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error saving attendance");
  }
}
