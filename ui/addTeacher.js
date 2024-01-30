let warningTxt = document.getElementById('warningTxt');

getTeachersData();
function getTeachersData (){
    //debugger
    var teacherUrl = urls.getTeachers
    fetch(teacherUrl)
    .then((response) => response.json())
    .then((data) => {
        //showOrHide('loadingSpinnerDiv', 'addStudentContainer', false);
		console.log(data)
        const tableBody = document
            .getElementById("teacherTable")
            .getElementsByTagName("tbody")[0];
        data.forEach((item) => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
			const cell5 = row.insertCell(4);
			const cell6 = row.insertCell(5);

            cell1.innerHTML = '<input type="checkbox">';
            cell2.innerText = item.userId;
            cell3.innerText = item.username;
            cell4.innerText = item.name;
			cell5.innerText = item.password;
			cell6.innerText = item._id;
			
			cell5.classList.add('hiddenCol');
			cell6.classList.add('hiddenCol');
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function addTeacher() {
    // Get input values
    var id = document.getElementById("id").value;
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;

    // Validate input
    if (!id || !username || !name || !password) {
        warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'red';
        warningTxt.innerText = 'Please fill in all fields.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 2000)
        return;
    }

    // Add a new row to the table
    var table = document.getElementById("teacherTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).innerHTML = '<input type="checkbox">';
    newRow.insertCell(1).innerHTML = id;
    newRow.insertCell(2).innerHTML = username;
    newRow.insertCell(3).innerHTML = name;
	
	const teacherPostData = {
	    userId: id,
	    username: username,
	    name: name,
	    password: password,
        flag : 'teacher'
	};
	const teacherPostUrl  = urls.addTeacher; 
	const postOptions = {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json', // Set the content type to JSON
	        // Add any additional headers if needed
	    },
	    body: JSON.stringify(teacherPostData) // Convert the data to JSON format
	};
	// Make the POST request
	//showOrHide('loadingSpinnerDiv', 'adminAddEditRemoveContainer', true);
	fetch(teacherPostUrl, postOptions)
	.then(response => response.json()) // Assuming the response is in JSON format
	.then(data => {
	    // Handle the response data here
		//showOrHide('loadingSpinnerDiv', 'adminAddEditRemoveContainer', false);
		warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'green';
        warningTxt.innerText = 'Teacher Added.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 3000)
	})
	.catch(error => {
	    console.error('Add Teacher Failed..', error);
		//showOrHide('loadingSpinnerDiv', 'adminAddEditRemoveContainer', false);
	});

    // Clear input fields
    clearFields('id', '', 'username', 'name', 'password');
}

function editTeacher() {
	//debugger
    var table = document.getElementById("teacherTable");
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
			cells[4].classList.add('hiddenCol');
            break; // Assume only one checkbox is selected for editing
        }
    };
    if (editFlg) {
        warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'red';
        warningTxt.innerText = 'Please select any row before edit.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 2000)
        return;
    }
}

function saveTeacher() {
    // Get the selected row
    var table = document.getElementById("teacherTable");
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
        warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'red';
        warningTxt.innerText = 'Please fill all the fields before save.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 2000)
        return;
    }
	if (!id || !username || !name) {
        warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'red';
        warningTxt.innerText = 'Please fill in all fields.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 2000)
        return;
    }
	const updateTeacherData = {
	    userId: id,
	    username: username,
	    name: name,
	    password: password,
        flag : 'teacher'
	};
	const dbTeacherId = selectedRow.cells[5].innerText;
	
	const updateTeacherUrl  = urls.updateTeacher.replace(':id', dbTeacherId);
	
	const updateTeacherOptions = {
	    method: 'PUT',
	    headers: {
	        'Content-Type': 'application/json', // Set the content type to JSON
	    },
	    body: JSON.stringify(updateTeacherData) // Convert the data to JSON format
	};
	fetch(updateTeacherUrl, updateTeacherOptions)
	.then(response => response.json()) // Assuming the response is in JSON format
	.then(data => {
	    console.log('Teacher Updated successful:', data);
		clearTable('teacherTable')
	    getTeachersData(); // reload the page with new data.
	    // Handle the response data here
	})
	.catch(error => {
	    console.error('Teacher Update Failed..:', error);
	    // Handle errors here
	});
    // Clear input fields
    clearFields('id', '', 'username', 'name', 'password');
 
}

function deleteTeacher() {
    // Get the selected rows and remove them
    var table = document.getElementById("teacherTable");
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
        warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'red';
        warningTxt.innerText = 'Please select any row for Delete.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 2000)
        return;
    }
	const dbTeacherId = selectedRow.cells[5].innerText;
	const deleteTeacherUrl = urls.deleteTeacher.replace(':id', dbTeacherId);
	const deleteTeacherOptions = {
	    method: 'DELETE',
	    headers: {
	        'Content-Type': 'application/json', // Set the content type if needed
	    }
	};
	fetch(deleteTeacherUrl, deleteTeacherOptions)
	.then(response => {
	    if (!response.ok) {
	        throw new Error(`HTTP error! Status: ${response.status}`);
	    }

	})
	.then(data => {
	    console.log('Teacher Deleted');
	    warningTxt.style.visibility = 'visible';
	    warningTxt.style.color = 'green';
	    warningTxt.innerText = 'Teacher Deleted.';
	    setTimeout(function () {
	        warningTxt.style.visibility = 'hidden';
	        clearTable('teacherTable');
	        getTeachersData();
	    }, 2000)
	})
	.catch(error => {
	    console.error('Teacher Deletion Failed.', error);
	});
}