// Form validation
function validateLogin() {
  //debugger
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (
    username == passwords.adminUserName &&
    password == passwords.adminPassword
  ) {
    let currentURLArr = window.location.href.split("/");
    currentURLArr.pop();
    currentURLArr.push(filePath.adminPage);
    let nextPageURL = currentURLArr.join("/");
    window.location.href = nextPageURL;
  } else if (
    username == passwords.studentUserName &&
    password == passwords.studentPassword
  ) {
    let currentURLArr = window.location.href.split("/");
    currentURLArr.pop();
    currentURLArr.push(filePath.studentWelcomePage);
    let nextPageURL = currentURLArr.join("/");
    window.location.href = nextPageURL;
  } else if (
    username == passwords.teacherUserName &&
    password == passwords.teacherPassword
  ) {
    let currentURLArr = window.location.href.split("/");
    currentURLArr.pop();
    currentURLArr.push(filePath.teachersWelcomePage);
    let nextPageURL = currentURLArr.join("/");
    window.location.href = nextPageURL;
  } else {
    let invalidUserNameTxt = document.getElementById("invalidUserNameTxt");
    invalidUserNameTxt.style.visibility = "visible";
    setTimeout(function () {
      invalidUserNameTxt.style.visibility = "hidden";
    }, 2000);
  }
}

// Routing to another pages
function navigatePage(nextPage) {
  let currentURLArr = window.location.href.split("/");
  currentURLArr.pop();
  currentURLArr.push(nextPage);
  let nextPageURL = currentURLArr.join("/");
  window.location.href = nextPageURL;
}

// Admin add edit save page
function addUser() {
  // Add a new row to the table
  var table = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow();
  var id = document.getElementById("userId").value;
  var userName = document.getElementById("userName").value;
  var fullName = document.getElementById("fullName").value;
  var password = document.getElementById("password").value;

  if (id && userName && fullName && password) {
    var checkboxCell = newRow.insertCell(0);
    checkboxCell.innerHTML = '<input type="checkbox">';

    newRow.insertCell(1).innerText = id;
    newRow.insertCell(2).innerText = userName;
    newRow.insertCell(3).innerText = fullName;
  } else {
    let warningMsgText = document.getElementById("warningMsgText");
    warningMsgText.style.visibility = "visible";
    setTimeout(function () {
      warningMsgText.style.visibility = "hidden";
    }, 2000);
  }

  // Clear input fields
  clearFields();
}

function editUser() {
  var table = document.getElementById("userTable");
  var checkboxes = table.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      // Fill input fields with selected row data
      var rowIndex = checkboxes[i].closest("tr").rowIndex;
      var cells = table.rows[rowIndex].cells;
      document.getElementById("userId").value = cells[1].innerText;
      document.getElementById("userName").value = cells[2].innerText;
      document.getElementById("fullName").value = cells[3].innerText;
      break; // Assume only one checkbox is selected for editing
    }
  }
}

function saveUser() {
  var table = document.getElementById("userTable");
  var checkboxes = table.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      // Update selected row with new data
      var rowIndex = checkboxes[i].closest("tr").rowIndex;
      var cells = table.rows[rowIndex].cells;
      cells[1].innerText = document.getElementById("userId").value;
      cells[2].innerText = document.getElementById("userName").value;
      cells[3].innerText = document.getElementById("fullName").value;
      checkboxes[i].checked = false; // Uncheck the checkbox
    }
  }

  // Clear input fields
  clearFields();
}

function deleteUser() {
  var table = document.getElementById("userTable");
  var checkboxes = table.getElementsByTagName("input");
  for (var i = checkboxes.length - 1; i >= 0; i--) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      // Delete selected row
      var rowIndex = checkboxes[i].closest("tr").rowIndex;
      table.deleteRow(rowIndex);
    }
  }

  // Clear input fields
  clearFields();
}

function clearFields() {
  document.getElementById("userId").value = "";
  document.getElementById("userName").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("password").value = "";
}

// Classes add, edit delete
function addClass() {
  // Add a new row to the table
  var table = document
    .getElementById("classTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow();
  var id = document.getElementById("classUserId").value;
  var fullName = document.getElementById("classFullName").value;

  if (id && fullName) {
    var checkboxCell = newRow.insertCell(0);
    checkboxCell.innerHTML = '<input type="checkbox">';

    newRow.insertCell(1).innerText = id;
    newRow.insertCell(2).innerText = fullName;
  } else {
    let classWarningMsgText = document.getElementById("classWarningMsgText");
    classWarningMsgText.style.visibility = "visible";
    setTimeout(function () {
      classWarningMsgText.style.visibility = "hidden";
    }, 2000);
  }

  // Clear input fields
  clearClassTableFields();
}

function editClass() {
  var table = document.getElementById("classTable");
  var checkboxes = table.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      // Fill input fields with selected row data
      var rowIndex = checkboxes[i].closest("tr").rowIndex;
      var cells = table.rows[rowIndex].cells;
      document.getElementById("classUserId").value = cells[1].innerText;
      document.getElementById("classFullName").value = cells[2].innerText;
      break; // Assume only one checkbox is selected for editing
    }
  }
}

function saveClass() {
  var table = document.getElementById("classTable");
  var checkboxes = table.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      // Update selected row with new data
      var rowIndex = checkboxes[i].closest("tr").rowIndex;
      var cells = table.rows[rowIndex].cells;
      cells[1].innerText = document.getElementById("classUserId").value;
      cells[2].innerText = document.getElementById("classFullName").value;
      checkboxes[i].checked = false; // Uncheck the checkbox
    }
  }

  // Clear input fields
  clearClassTableFields();
}

function deleteClass() {
  var table = document.getElementById("classTable");
  var checkboxes = table.getElementsByTagName("input");
  for (var i = checkboxes.length - 1; i >= 0; i--) {
    if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
      // Delete selected row
      var rowIndex = checkboxes[i].closest("tr").rowIndex;
      table.deleteRow(rowIndex);
    }
  }

  // Clear input fields
  clearClassTableFields();
}

function clearClassTableFields() {
  document.getElementById("classUserId").value = "";
  document.getElementById("classFullName").value = "";
}
