document.getElementById("attendanceDate").value = todayDate;
updatedClassSelector();
let classSelector = document.getElementById("classDropdown");

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

function viewAttendance() {
  let loader = document.getElementById("loaderCont");
  let mainCont = document.getElementById("addAttendanceMainContainer");
  let infoTxt = document.getElementById("infoTxt");
  //loader.style.display = 'flex';
  //mainCont.style.display = 'none';
  var getAttendanceUrl = urls.getAttendance;
  fetch(getAttendanceUrl)
    .then((response) => response.json())
    .then((data) => {
      let currentDateFieldVal = document.getElementById("attendanceDate").value;
      var classSelectorVal = document.getElementById("classDropdown").value;
      let dateCheckFlg = true;
      data.forEach((val) => {
        if (
          val.date == currentDateFieldVal &&
          val.stdclass == classSelectorVal
        ) {
          dateCheckFlg = false;
        }
      });
      if (!dateCheckFlg) {
        // if attendance and class already there.
        infoTxt.style.display = "flex";
        const tableBody = document
          .getElementById("attendanceTable")
          .getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";
      } else {
        // fetch the student data, and filter based one class and show the data to the table.
        infoTxt.style.display = "none";
        loader.style.display = "flex";
        mainCont.style.display = "none";
        fetchStudentData();
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function fetchStudentData() {
  let loader = document.getElementById("loaderCont");
  let mainCont = document.getElementById("addAttendanceMainContainer");
  let infoTxt = document.getElementById("infoTxt");
  var stdUrl = urls.getStudents;
  let getClassesUrl = urls.getClasses;
  fetch(stdUrl)
    .then((response) => response.json())
    .then((data) => {
      var currentClass = document.getElementById("classDropdown").value;
      var currData = [];
      data.forEach((val) => {
        if (val.class == currentClass) {
          currData.push(val);
        }
      });
      currAttendanceData = currData;
      const tableBody = document
        .getElementById("attendanceTable")
        .getElementsByTagName("tbody")[0];
      tableBody.innerHTML = "";
      currData.sort((a, b) => {
        return a.userId - b.userId;
      });
      currData.forEach((item) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0); // check box
        const cell2 = row.insertCell(1); // for ID
        const cell3 = row.insertCell(2); // for name
        const cell4 = row.insertCell(3); // for status
        const cell5 = row.insertCell(4); // for DB ID

        cell1.innerHTML = '<input type="checkbox">';
        cell2.innerText = item.userId;
        cell3.innerText = item.name;
        cell4.innerText = item.status;
        cell5.innerText = item._id;

        cell5.classList.add("hiddenCol");

        if (item.status == "Present") {
          row.classList.add("presentCls");
        } else {
          row.classList.add("absentCls");
        }
      });
      loader.style.display = "none";
      mainCont.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      loader.style.display = "none";
      mainCont.style.display = "flex";
    });
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

  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    if (cells.length > 3) {
      //updateStudentData = {};
      // Check if row has enough cells
      var checkbox = cells[0].getElementsByTagName("input")[0];
      var id = cells[1].innerText;
      var name = cells[2].innerText;
      var status = cells[3].innerText;
      var dbId = cells[4].innerText;

      currAttendanceData.forEach((val) => {
        if (val._id == dbId && studentDataCheckArr.indexOf(val._id) == -1) {
          checkbox.checked == true && val._id == rows[i].getElementsByTagName("td")[4].innerText &&
            (val.status = rows[i].getElementsByTagName("td")[3].innerText);
          studentData.push(val);
          studentDataCheckArr.push(val._id);
        } else {
          if (studentDataCheckArr.indexOf(val._id) == -1) {
            checkbox.checked == true && val._id == rows[i].getElementsByTagName("td")[4].innerText && 
              (val.status = rows[i].getElementsByTagName("td")[3].innerText);
            studentData.push(val);
            studentDataCheckArr.push(val._id);
          }
        }
      });
    }
  }
  updateStudentData.date = attendanceDate;
  updateStudentData.students = studentData;
  updateStudentData.stdclass = currentClass;
  const updateStudentOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(updateStudentData), // Convert the data to JSON format
  };
  fetch(urls.addAttendance, updateStudentOptions)
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
