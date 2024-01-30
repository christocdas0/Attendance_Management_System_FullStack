let warningTxt = document.getElementById('warningTxt');

getClass();
function getClass (){
    //debugger
    var classUrl = urls.getClasses
    fetch(classUrl)
    .then((response) => response.json())
    .then((data) => {
        //showOrHide('loadingSpinnerDiv', 'addStudentContainer', false);
		console.log(data)
        const tableBody = document
            .getElementById("classTable")
            .getElementsByTagName("tbody")[0];
        data.forEach((item) => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
		

            cell1.innerHTML = '<input type="checkbox">';
            cell2.innerText = item.userId;
            cell3.innerText = item.name;
			cell4.innerText = item._id;
			
			cell4.classList.add('hiddenCol');
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function addClass() {
    // Get input values
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;

    // Validate input
    if (!id || !name) {
        warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'red';
        warningTxt.innerText = 'Please fill in all fields.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 2000)
        return;
    }

    // Add a new row to the table
    var table = document.getElementById("classTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).innerHTML = '<input type="checkbox">';
    newRow.insertCell(1).innerHTML = id;
    newRow.insertCell(2).innerHTML = name;
	
	const classPostData = {
	    userId: id,
	    name: name
	};
	const classPostUrl  = urls.addClass; 
	const postOptions = {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json', // Set the content type to JSON
	        // Add any additional headers if needed
	    },
	    body: JSON.stringify(classPostData) // Convert the data to JSON format
	};
	// Make the POST request
	//showOrHide('loadingSpinnerDiv', 'adminAddEditRemoveContainer', true);
	fetch(classPostUrl, postOptions)
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
    clearFields('id', '', '', 'name', '');
}

function editClass() {
	//debugger
    var table = document.getElementById("classTable");
    var checkboxes = table.getElementsByTagName("input");
    var editFlg = true;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
            editFlg = false;
            // Fill input fields with selected row data
            var rowIndex = checkboxes[i].parentNode.parentNode.rowIndex;
            var cells = table.rows[rowIndex].cells;
            document.getElementById("id").value = cells[1].innerText;
            document.getElementById("name").value = cells[2].innerText;
			cells[3].classList.add('hiddenCol');
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

function saveClass() {
    // Get the selected row
    var table = document.getElementById("classTable");
    var checkboxes = table.getElementsByTagName("input");
    var selectedRow = null;
	var id = document.getElementById("id").value;
	var name = document.getElementById("name").value;

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
	if (!id || !name) {
        warningTxt.style.visibility = 'visible';
        warningTxt.style.color = 'red';
        warningTxt.innerText = 'Please fill in all fields.';
        setTimeout(function () {
            warningTxt.style.visibility = 'hidden';
        }, 2000)
        return;
    }
	const updateClassData = {
	    userId: id,
	    name: name
	};
	const dbClassId = selectedRow.cells[3].innerText;
	
	const updateClassUrl  = urls.updateClass.replace(':id', dbClassId);
	
	const updateClassOptions = {
	    method: 'PUT',
	    headers: {
	        'Content-Type': 'application/json', // Set the content type to JSON
	    },
	    body: JSON.stringify(updateClassData) // Convert the data to JSON format
	};
	fetch(updateClassUrl, updateClassOptions)
	.then(response => response.json()) // Assuming the response is in JSON format
	.then(data => {
	    console.log('Class Updated successful:', data);
		clearTable('classTable')
	    getClass(); // reload the page with new data.
	    // Handle the response data here
	})
	.catch(error => {
	    console.error('Class Update Failed..:', error);
	    // Handle errors here
	});
    // Clear input fields
    clearFields('id', '', '', 'name', '');
 
}

function deleteClass() {
    // Get the selected rows and remove them
    var table = document.getElementById("classTable");
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
	const dbClassId = selectedRow.cells[3].innerText;
	const deleteClassUrl = urls.deleteClass.replace(':id', dbClassId);
	const deleteClassOptions = {
	    method: 'DELETE',
	    headers: {
	        'Content-Type': 'application/json', // Set the content type if needed
	    }
	};
	fetch(deleteClassUrl, deleteClassOptions)
	.then(response => {
	    if (!response.ok) {
	        throw new Error(`HTTP error! Status: ${response.status}`);
	    }

	})
	.then(data => {
	    console.log('Class Deleted');
	    warningTxt.style.visibility = 'visible';
	    warningTxt.style.color = 'green';
	    warningTxt.innerText = 'Class Deleted.';
	    setTimeout(function () {
	        warningTxt.style.visibility = 'hidden';
	        clearTable('classTable');
	        getClass();
	    }, 2000)
	})
	.catch(error => {
	    console.error('Class Deletion Failed.', error);
	});
}