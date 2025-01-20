# Student Attendance Management System

A comprehensive web-based solution for managing student attendance records. Built with modern web technologies, this system enables teachers to efficiently track attendance, generate reports, and maintain accurate student records.

## Overview

This application provides an intuitive interface for teachers to:

- Record daily student attendance
- Manage and modify attendance records
- Generate detailed attendance reports and analytics
- Access data through a RESTful API

## Core Features

### Attendance Management

- Mark student attendance with a simple present/absent toggle
- Batch attendance marking for multiple students
- Flexible date selection for recording or viewing attendance
- Edit capabilities for existing attendance records

### Reporting System

- Comprehensive attendance statistics
- Individual student attendance percentages
- Class-wide attendance trends
- Exportable attendance reports

### User Interface

- Responsive design that works on all devices
- Intuitive navigation and controls
- Clean, modern aesthetic using Bootstrap 5
- Fast and efficient data entry

## Technical Architecture

### Backend Stack

- **Runtime Environment:** Node.js (v14+)
- **Web Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **API Design:** REST architecture

### Frontend Stack

- **Structure:** HTML5
- **Styling:** CSS3 with Bootstrap 5
- **Interactivity:** JavaScript
- **UI Framework:** Bootstrap 5

## Setup Guide

### Prerequisites

- Node.js (version 14 or higher)
- MySQL Server
- npm (Node Package Manager)

### Installation Steps

1. Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd attendance-system
```

2. Install project dependencies:

```bash
npm install
```

3. Database Configuration:

- Create a MySQL database named 'node-complete'
- Update the configuration in `config/database.js`:

```javascript
{
  username: 'root',
  password: '<Your_Password>',
  database: '<Your_DB_Name>',
  host: 'localhost'
}
```

4. Initialize the database with sample data:

```bash
npm run seed
```

5. Launch the application:

```bash
npm start
```

For development with hot-reloading:

```bash
npm run dev
```

The system will be accessible at `http://localhost:3000`

## API Documentation

### Student Endpoints

#### Get All Students

- Method: `GET`
- Path: `/api/students`
- Response: Array of student objects

#### Create Student

- Method: `POST`
- Path: `/api/students`
- Body: Student object
- Response: Created student object

### Attendance Endpoints

#### Get Date Attendance

- Method: `GET`
- Path: `/api/attendance/:date`
- Response: Attendance records for specified date

#### Mark Attendance

- Method: `POST`
- Path: `/api/attendance`
- Body: Attendance records
- Response: Created attendance records

#### Generate Report

- Method: `GET`
- Path: `/api/attendance/report`
- Response: Comprehensive attendance statistics

## User Guide

1. Access the system through your web browser
2. Use the date picker in the navigation bar to select a date
3. Click "Search" to view or update attendance for the selected date
4. Mark students as present or absent using the provided controls
5. Save your changes using the "Save Attendance" button
6. Access comprehensive statistics via the "Attendance Report" section

## Development

### Contributing Guidelines

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature/YourFeature
```

3. Commit your changes:

```bash
git commit -m 'Add YourFeature'
```

4. Push to your branch:

```bash
git push origin feature/YourFeature
```

5. Submit a Pull Request

## License

Released under the ISC License.

---

For support or questions, please open an issue in the repository.
