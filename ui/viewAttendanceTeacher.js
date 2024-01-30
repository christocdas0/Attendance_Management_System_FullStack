document.getElementById("attendanceDate").value = todayDate;
updatedClassSelector();
let classSelector = document.getElementById("class");
let stdAttendance = document.getElementById('attendanceDate').value

viewAttendance();
function viewAttendance() {
  var stdUrl = urls.getAttendance;
  let getClassesUrl = urls.getClasses;
  fetch(stdUrl)
    .then((response) => response.json())
    .then((data) => {
      localStorage.allAttendance = data;
      //showOrHide("loadingSpinnerDiv", "addStudentContainer", false);
      const tableBody = document
        .getElementById("attendanceTable")
        .getElementsByTagName("tbody")[0];
      tableBody.innerHTML = "";
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

function filterView() {
    //viewAttendance();
  let stdClass = document.getElementById("class").value;
   stdAttendance = document.getElementById('attendanceDate').value

  const tableBody = document
    .getElementById("attendanceTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  var studentsDate = []
  localStorage.allAttendance.forEach(function(val){
    if(val.date == document.getElementById("attendanceDate").value && val.stdclass == document.getElementById("class").value) {
      studentsDate = val.students;
    }
})
studentsDate.forEach((item) => {
    //if (stdClass == item.class && stdAttendance == item.date) {
      var newRow = tableBody.insertRow();
    //   newRow.insertCell(0).innerHTML = '<input type="checkbox">';
      newRow.insertCell(0).innerText = item.userId;
      newRow.insertCell(1).innerText = item.name;
      newRow.insertCell(2).innerText = item.status;
      if(item.status == 'Present'){
        newRow.classList.add('presentCls')
      }else{
        newRow.classList.add('absentCls')
      }
   // }
  });
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
