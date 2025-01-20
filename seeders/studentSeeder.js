const Student = require("../models/student");
const sequelize = require("../config/database");

const students = [
  { name: "John Doe", rollNumber: "2023001" },
  { name: "Jane Smith", rollNumber: "2023002" },
  { name: "Michael Johnson", rollNumber: "2023003" },
  { name: "Emily Brown", rollNumber: "2023004" },
  { name: "David Wilson", rollNumber: "2023005" },
  { name: "Sarah Davis", rollNumber: "2023006" },
  { name: "James Miller", rollNumber: "2023007" },
  { name: "Emma Taylor", rollNumber: "2023008" },
  { name: "William Anderson", rollNumber: "2023009" },
  { name: "Olivia Thomas", rollNumber: "2023010" },
];

async function seedStudents() {
  try {
    await sequelize.sync();

    // Check if data already exists
    const count = await Student.count();
    if (count === 0) {
      await Student.bulkCreate(students);
      console.log("Sample students data has been inserted");
    } else {
      console.log("Students table already has data, skipping seeding");
    }
  } catch (error) {
    console.error("Error seeding students:", error);
  } finally {
    await sequelize.close();
  }
}

seedStudents();
