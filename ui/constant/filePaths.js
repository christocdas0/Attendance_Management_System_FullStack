let filePath = {
    loginPage : "loginPage.html",
    adminPage : "adminWelcomePage.html",
    admin : "adminWelcomePage.html",
    studentWelcomePage : 'studentWelcomePage.html',
    student : 'studentWelcomePage.html',
    adminAddPage : 'addAdmin.html',
    teachersWelcomePage : 'teachersWelcomePage.html',
    teacher : 'teachersWelcomePage.html'
}

let passwords = {
    adminUserName : 'admin',
    adminPassword : 'admin',
    studentUserName : 'student',
    studentPassword : 'student',
    teacherUserName : 'teacher',
    teacherPassword : 'teacher'
}

let urls = {
    // for Students
    getStudents : 'http://localhost:5000/api/students',
    addStudent : 'http://localhost:5000/api/students/addstudent', // POST call
	updateStudent : "http://localhost:5000/api/students/updatestudent/:id", // PUT call
	deleteStudent : "http://localhost:5000/api/students/delete/:id", // delete call

    // for teachers

    getTeachers : 'http://localhost:5000/api/teachers',
    addTeacher : 'http://localhost:5000/api/teachers/addteacher', // POST call
	updateTeacher : "http://localhost:5000/api/teachers/updateteacher/:id", // PUT call
	deleteTeacher : "http://localhost:5000/api/teachers/delete/:id", // delete call

    // For Admin
    getUsers : "http://localhost:5000/api/admin",
    addUser : 'http://localhost:5000/api/admin/adduser', // POST CALL
    updateUser : "http://localhost:5000/api/admin/updateuser/:id", // PUT CALL
    deleteUser : "http://localhost:5000/api/admin/delete/:id", // delete Call.

    // for classes
    // For Admin
    getClasses : "http://localhost:5000/api/class",
    addClass : 'http://localhost:5000/api/class/addclass', // POST CALL
    updateClass : "http://localhost:5000/api/class/updateclass/:id", // PUT CALL
    deleteClass : "http://localhost:5000/api/class/delete/:id", // delete Call.

    /// for attendance ]
    getAttendance : "http://localhost:5000/api/attendance",
    addAttendance : 'http://localhost:5000/api/attendance/addattendance', // POST CALL
    updateAttendance : "http://localhost:5000/api/attendance/updateattendance/:id", // PUT CALL
    deleteAttendance : "http://localhost:5000/api/attendance/delete/:id" // delete Call.

}

let localStorage = {};
let validateUserStorage = [];
let attendanceTableData = [];
let currAttendanceData = [];

// common function for show/hide container before ajax call. it will act like loader
function showOrHide(loader, container, flag){
    container = document.getElementById(container);
	loader = document.getElementById(loader);
	if(flag){
		container.style.display = 'none';
		loader.style.display = 'flex';
	}else{
		container.style.display = 'flex';
		loader.style.display = 'none';
	}
}

function clearFields(id, cls,userName, name, passwrd){
	id && (document.getElementById(id).value = "");
    cls && (document.getElementById(cls).value = "");
    userName && (document.getElementById(userName).value = "");
    name && (document.getElementById(name).value = "");
    passwrd && (document.getElementById(passwrd).value = "");
}

function clearTable(tblId) {
    const tableBody = document
        .getElementById(tblId)
        .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = '';
}



 // Getting Current date.
  // Create a new date object
  const date = new Date();

  // Get the day, month, and year from the date object
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if day < 10
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();

  // Create the formatted date string
  const todayDate = `${day}-${month}-${year}`;

//   After login need to show the user name

let globalUserName = '';