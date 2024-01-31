let validateTxt = document.getElementById("validateTxt");
let loginBtn = document.getElementById("loginBtn");

// Form validation
function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  let isValid = false;
  validateUserStorage.forEach((val) => {
    if (val.username == username && val.password == password) {
      isValid = true;
      let currentURLArr = window.location.href.split("/");
      currentURLArr.pop();
      currentURLArr.push(filePath[val.flag]);
      let nextPageURL = currentURLArr.join("/");
      window.localStorage.setItem('userName', val.name);
      window.localStorage.setItem('userData', JSON.stringify(val));
      window.location.href = nextPageURL;
    }
  });
  if (!isValid) {
    let invalidUserNameTxt = document.getElementById("invalidUserNameTxt");
    invalidUserNameTxt.style.visibility = "visible";
    validateTxt.style.display = "none";
    loginBtn.style.display = "block";

    setTimeout(function () {
      invalidUserNameTxt.style.visibility = "hidden";
    }, 3000);
  }
}

function validateUser() {
  // var username = document.getElementById("username").value;
  // var password = document.getElementById("password").value;
  loginBtn.style.display = "none";
  validateTxt.style.display = "flex";
  getStudentData();
}

function getStudentData() {
  var stdUrl = urls.getStudents;
  fetch(stdUrl)
    .then((response) => response.json())
    .then((data) => {
      validateUserStorage = [...validateUserStorage, ...data];
      getTeachersData();
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function getTeachersData() {
  var teacherUrl = urls.getTeachers;
  fetch(teacherUrl)
    .then((response) => response.json())
    .then((data) => {
      validateUserStorage = [...validateUserStorage, ...data];
      getAdminUser();
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function getAdminUser() {
  var getUserUrl = urls.getUsers;
  fetch(getUserUrl)
    .then((response) => response.json())
    .then((data) => {
      validateUserStorage = [...validateUserStorage, ...data];
      validateLogin();
    })
    .catch((error) => console.error("Error fetching data:", error));
}
