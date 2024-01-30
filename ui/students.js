getStudentsData();
function getStudentsData() {
  var stdUrl = urls.getStudents;
  let getClassesUrl = urls.getClasses;
  fetch(stdUrl)
    .then((response) => response.json())
    .then((data) => {
      showOrHide("loadingSpinnerDiv", "addStudentContainer", false);
      console.log(data);
      const tableBody = document
        .getElementById("studentTable")
        .getElementsByTagName("tbody")[0];
      data.sort((a, b) => {
        return a.userId - b.userId;
      });
      data.forEach((item) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1); // for ID
        const cell3 = row.insertCell(2); // for username
        const cell4 = row.insertCell(3); // for name
        const cell5 = row.insertCell(4); // for password
        const cell6 = row.insertCell(5); // for DB _id
        //const cell7 = row.insertCell(6); // for status
        const cell7 = row.insertCell(6); // for class

        cell1.innerHTML = '<input type="checkbox">';
        cell2.innerText = item.userId;
        cell3.innerText = item.username;
        cell4.innerText = item.name;
        cell5.innerText = item.password;
        cell6.innerText = item._id;
        //cell7.innerText = item.status;
        cell7.innerText = item.class;

        if (item.status == "Present") {
          row.classList.add("presentCls");
        } else {
          row.classList.add("absentCls");
        }

        cell5.classList.add("hiddenCol");
        cell6.classList.add("hiddenCol");
        //cell7.classList.add("hiddenCol");
        //cell8.classList.add("hiddenCol");
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  let classSelector = document.getElementById("class");
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
let warningTxt = document.getElementById("warningTxt");
function addStudent() {
  //debugger
  // Get input values
  //var status = document.getElementById("status").value;
  let class_ = document.getElementById("class").value;
  var id = document.getElementById("id").value;
  var className = document.getElementById("class").value;
  var username = document.getElementById("username").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;

  // Validate input
  if (!id || !className || !username || !name) {
    warningTxt.style.visibility = "visible";
    warningTxt.style.color = "red";
    warningTxt.innerText = "Please fill in all fields.";
    setTimeout(function () {
      warningTxt.style.visibility = "hidden";
    }, 2000);
    return;
  }

  // Add a new row to the table
  var table = document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);
  newRow.insertCell(0).innerHTML = '<input type="checkbox">';
  newRow.insertCell(1).innerHTML = id;
  newRow.insertCell(2).innerHTML = username;
  newRow.insertCell(3).innerHTML = name;
  //newRow.insertCell(4).innerHTML = status; // for status
  newRow.insertCell(4).innerHTML = class_; // for class


  const studentPostData = {
    userId: id,
    username: username,
    name: name,
    password: password,
    status: "Present",
    class: class_,
    flag: "student",
    date: todayDate,
  };
  const stdPostUrl = urls.addStudent;
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
      // Add any additional headers if needed
    },
    body: JSON.stringify(studentPostData), // Convert the data to JSON format
  };
  // Make the POST request
  showOrHide("loadingSpinnerDiv", "addStudentContainer", true);
  fetch(stdPostUrl, postOptions)
    .then((response) => response.json()) // Assuming the response is in JSON format
    .then((data) => {
      // Handle the response data here
      showOrHide("loadingSpinnerDiv", "addStudentContainer", false);
      warningTxt.style.visibility = "visible";
      warningTxt.style.color = "green";
      warningTxt.innerText = "Student Added.";
      setTimeout(function () {
        warningTxt.style.visibility = "hidden";
      }, 3000);
    })
    .catch((error) => {
      console.error("Add Student Failed..", error);
      showOrHide("loadingSpinnerDiv", "addStudentContainer", false);
    });

  // Clear input fields
  clearFields("id", "class", "username", "name", "password");
}
function editStudent() {
  //debugger
  var table = document.getElementById("studentTable");
  var checkboxes = table.getElementsByTagName("input");
  var editFlg = true;
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      editFlg = false;
      // Fill input fields with selected row data
      var rowIndex = checkboxes[i].parentNode.parentNode.rowIndex;
      var cells = table.rows[rowIndex].cells;
      document.getElementById("id").value = cells[1].innerText;
      document.getElementById("username").value = cells[2].innerText;
      document.getElementById("name").value = cells[3].innerText;
      document.getElementById("password").value = cells[4].innerText;
      //document.getElementById("status").value = cells[6].innerText;
      document.getElementById("class").value = cells[7].innerText;

      break; // Assume only one checkbox is selected for editing
    }
  }
  if (editFlg) {
    warningTxt.style.visibility = "visible";
    warningTxt.style.color = "red";
    warningTxt.innerText = "Please select any row before edit.";
    setTimeout(function () {
      warningTxt.style.visibility = "hidden";
    }, 2000);
    return;
  }
}

function saveStudent() {
  // Get the selected row
  // var status = document.getElementById("status").value;
  var class_ = document.getElementById("class").value;
  var table = document.getElementById("studentTable");
  var checkboxes = table.getElementsByTagName("input");
  var selectedRow = null;
  var id = document.getElementById("id").value;
  var username = document.getElementById("username").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      selectedRow = checkboxes[i].parentNode.parentNode;
      break;
    }
  }

  if (selectedRow === null) {
    warningTxt.style.visibility = "visible";
    warningTxt.style.color = "red";
    warningTxt.innerText = "Please fill all the fields before save.";
    setTimeout(function () {
      warningTxt.style.visibility = "hidden";
    }, 2000);
    return;
  }
  if (!id || !username || !name) {
    warningTxt.style.visibility = "visible";
    warningTxt.style.color = "red";
    warningTxt.innerText = "Please fill in all fields.";
    setTimeout(function () {
      warningTxt.style.visibility = "hidden";
    }, 2000);
    return;
  }
  const updateStudentData = {
    userId: id,
    username: username,
    name: name,
    password: password,
    status: "Present",
    class: class_,
    flag: "student",
  };
  const dbStdId = selectedRow.cells[5].innerText;

  const updateStudentUrl = urls.updateStudent.replace(":id", dbStdId);

  const updateStudentOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(updateStudentData), // Convert the data to JSON format
  };
  fetch(updateStudentUrl, updateStudentOptions)
    .then((response) => response.json()) // Assuming the response is in JSON format
    .then((data) => {
      console.log("Student Updated successful:", data);
      /*const tableBody = document
	        .getElementById("studentTable")
	        .getElementsByTagName("tbody")[0];
	    tableBody.innerHTML = '';*/
      clearTable("studentTable");
      getStudentsData(); // reload the page with new data.
      // Handle the response data here
    })
    .catch((error) => {
      console.error("Student Update Failed..:", error);
      // Handle errors here
    });
  // Clear input fields
  clearFields("id", "class", "username", "name", "password");
}

function deleteStudent() {
  // Get the selected rows and remove them
  var table = document.getElementById("studentTable");
  var checkboxes = table.getElementsByTagName("input");
  let deleteFlg = true;
  var selectedRow = null;
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      selectedRow = checkboxes[i].parentNode.parentNode;
      deleteFlg = false;
      var rowIndex = checkboxes[i].parentNode.parentNode.rowIndex;
      table.deleteRow(rowIndex);
      break;
    }
  }
  if (deleteFlg) {
    warningTxt.style.visibility = "visible";
    warningTxt.style.color = "red";
    warningTxt.innerText = "Please select any row for Delete.";
    setTimeout(function () {
      warningTxt.style.visibility = "hidden";
    }, 2000);
    return;
  }
  const dbStdId = selectedRow.cells[5].innerText;
  const deleteStudentUrl = urls.deleteStudent.replace(":id", dbStdId);
  const deleteStudentOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Set the content type if needed
    },
  };
  fetch(deleteStudentUrl, deleteStudentOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Student Deleted");
      warningTxt.style.visibility = "visible";
      warningTxt.style.color = "green";
      warningTxt.innerText = "Student Deleted.";
      setTimeout(function () {
        warningTxt.style.visibility = "hidden";
        clearTable("studentTable");
        getStudentsData();
      }, 2000);
    })
    .catch((error) => {
      console.error("Student Deletion Failed.", error);
    });
}
