document.getElementById("attendanceDate").value = todayDate;
updatedClassSelector();
let classSelector = document.getElementById("classDropdown");
let stdAttendance = document.getElementById('attendanceDate').value

function viewAttendance() {
    stdAttendance = document.getElementById('attendanceDate').value
  // Dummy data for demonstration
  var getAttendanceUrl = urls.getAttendance;
  if (validateUserStorage.length >= 1) {
    clearTable();
    const tableBody = document
      .getElementById("attendanceTable")
      .getElementsByTagName("tbody")[0];
      tableBody.innerHTML = ''
    validateUserStorage.sort((a, b) => {
      return a.userId - b.userId;
    });
    var filteredData = [];
    // validateUserStorage.forEach((d) => {
    //   if (d.class == classSelector.value && d.date == stdAttendance) {
    //     filteredData.push(d);
    //   }
    // });
    localStorage.allAttendance.forEach(function(val){
      if(val.date == document.getElementById("attendanceDate").value && val.stdclass == document.getElementById("classDropdown").value) {
        filteredData = val.students;
        localStorage.singleAttendanceData = val;
      }
  })
  filteredData.forEach((item) => {
      const row = tableBody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1); // for ID
      const cell3 = row.insertCell(2); // for name
      const cell4 = row.insertCell(3); // for status
      const cell5 = row.insertCell(4); // for DB ID
      const cell6 = row.insertCell(5); // for Date 

      cell1.innerHTML = '<input type="checkbox">';
      cell2.innerText = item.userId;
      cell3.innerText = item.name;
      cell4.innerText = item.status;
      cell5.innerText = item._id;
      cell6.innerText = item.date;

      cell5.classList.add("hiddenCol");
      cell6.classList.add("hiddenCol");

      if (item.status == "Present") {
        row.classList.add("presentCls");
      } else {
        row.classList.add("absentCls");
      }
    });
  } else {
    const tableBody = document
    .getElementById("attendanceTable")
    .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''

    fetch(getAttendanceUrl)
      .then((response) => response.json())
      .then((data) => {
        var filteredData = [];
        var studentsDate = [];
        localStorage.allAttendance = data;
      //   localStorage.allAttendance.forEach(function(val){
      //     if(val.date == document.getElementById("attendanceDate").value && val.stdclass == document.getElementById("classDropdown").value) {
      //       studentsDate = val.students;
      //     }
      // })
        validateUserStorage = [...validateUserStorage, ...studentsDate];
        localStorage.allAttendance.forEach(function(val){
          if(val.date == document.getElementById("attendanceDate").value && val.stdclass == document.getElementById("classDropdown").value) {
            filteredData = val.students;
            localStorage.singleAttendanceData = val;
          }
      })
        // data.forEach((d) => {
        //   if (d.class == classSelector.value && d.date == stdAttendance) {
        //     filteredData.push(d);
        //   }
        // });
        //showOrHide("loadingSpinnerDiv", "addStudentContainer", false);
        //console.log(data);
        clearTable();
        const tableBody = document
          .getElementById("attendanceTable")
          .getElementsByTagName("tbody")[0];
          filteredData.sort((a, b) => {
          return a.userId - b.userId;
        });
        filteredData.forEach((item) => {
          const row = tableBody.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1); // for ID
          const cell3 = row.insertCell(2); // for name
          const cell4 = row.insertCell(3); // for status
          const cell5 = row.insertCell(4); // for DB ID
          const cell6 = row.insertCell(5); // for Date

          cell1.innerHTML = '<input type="checkbox">';
          cell2.innerText = item.userId;
          cell3.innerText = item.name;
          cell4.innerText = item.status;
          cell5.innerText = item._id;
          cell6.innerText = item.date;

          cell5.classList.add("hiddenCol");
          cell6.classList.add("hiddenCol");

          if (item.status == "Present") {
            row.classList.add("presentCls");
          } else {
            row.classList.add("absentCls");
          }
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
}

function updatedClassSelector() {
  let getClassesUrl = urls.getClasses;
  fetch(getClassesUrl)
    .then((response) => response.json())
    .then((data) => {
      classSelector.innerHTML = "";
      console.log(data);
      data.forEach((item) => {
        let optionElement = document.createElement("option");
        optionElement.value = item.name; // You can set the value as needed
        optionElement.text = item.name;
        classSelector.add(optionElement);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
function clearTable() {
  var table = document
    .getElementById("attendanceTable")
    .getElementsByTagName("tbody")[0];
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function submitAttendance_() {
  debugger
  var table = document.getElementById("attendanceTable");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  let attendanceDate = document.getElementById('attendanceDate').value;
  var data = [];
  let updateStudentData = {};
  let DBID = 2;

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    if (cells.length > 3) {
        updateStudentData = {};
      // Check if row has enough cells
      var checkbox = cells[0].getElementsByTagName("input")[0];
      var id = cells[1].innerText;
      var name = cells[2].innerText;
      var status = cells[3].innerText;
      updateStudentData.status = status;
      updateStudentData.date = attendanceDate;
      DBID = cells[4].innerText;
      data.push({ id: id, name: name, status: status });
      const updateStudentUrl = urls.updateStudent.replace(":id", DBID);

      const updateAttendanceOption = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(updateStudentData), // Convert the data to JSON format
      };
      if(checkbox.checked){
        fetch(updateStudentUrl, updateAttendanceOption)
        .then((response) => response.json()) // Assuming the response is in JSON format
        .then((data) => {})
        .catch((error) => {
          console.error("Student Update Failed..:", error);
        });
      }
      
    }
  }
  // var attendanceStatusText = document.getElementById("attendanceStatusText");
  // attendanceStatusText.style.visibility = "visible";
  // attendanceStatusText.innerText = "Submitted!!";
  // attendanceStatusText.style.color = "#20f30d";
  // attendanceStatusText.style.background = "#664848";
  // attendanceStatusText.style.padding = "3px";
  // attendanceStatusText.style.borderRadius = "10px";
  // setTimeout(function () {
  //   attendanceStatusText.style.visibility = "hidden";
  // }, 2000);
  // console.log("Attendance Data:", data);
  // Get the selected row
  //const dbStdId = selectedRow.cells[4].innerText;

  //   const updateStudentUrl = urls.updateStudent.replace(":id", DBID);

  //   const updateAttendanceOption = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json", // Set the content type to JSON
  //     },
  //     body: JSON.stringify(updateStudentData), // Convert the data to JSON format
  //   };
  //   fetch(updateStudentUrl, updateAttendanceOption)
  //     .then((response) => response.json()) // Assuming the response is in JSON format
  //     .then((data) => {
  //     })
  //     .catch((error) => {
  //       console.error("Student Update Failed..:", error);
  //     });
}

function submitAttendance() {
  debugger;
  var table = document.getElementById("attendanceTable");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  let attendanceDate = document.getElementById("attendanceDate").value;
  var currentClass = document.getElementById("classDropdown").value;
  var data = [];
  let updateStudentData = {};
  let DBID = 2;
  let studentData = [];
  let studentDataCheckArr = [];
  let tableData = [];
  let tableDataObj = {};

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    if (cells.length > 3) {
      var checkbox = cells[0].getElementsByTagName("input")[0];
      var id = cells[1].innerText;
      var name = cells[2].innerText;
      var status = cells[3].innerText;
      var dbId = cells[4].innerText;
      var obj = {};
      obj.status = status;
      tableDataObj[dbId] = obj; 
    }
  };

  localStorage.singleAttendanceData.students.forEach(function(val){
    if(tableDataObj[val._id]){
      val.status = tableDataObj[val._id].status;
    }
    studentData.push(val);
  })

  updateStudentData.date = attendanceDate;
  updateStudentData.students = studentData;
  updateStudentData.stdclass = currentClass;
  const updateAttendanceOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(updateStudentData), // Convert the data to JSON format
  };
  var updateAttendanceUrl = urls.updateAttendance.replace(":id", localStorage.singleAttendanceData._id);
  fetch(updateAttendanceUrl, updateAttendanceOption)
    .then((response) => response.json()) // Assuming the response is in JSON format
    .then((data) => {
      const tableBody = document
        .getElementById("attendanceTable")
        .getElementsByTagName("tbody")[0];
      tableBody.innerHTML = "";
    })
    .catch((error) => {
      console.error("Student Update Failed..:", error);
    });
}
