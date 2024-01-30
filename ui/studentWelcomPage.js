calculateAttendance();
 // showing and calculating stuidents attendance
 function calculateAttendance() {
    fetchAttendance();
    // fetch("./data/studentAttendance.json")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         // Update left side
    //         // const totalClasses = data.length;
    //         // const classesAttended = data.filter(
    //         //     (item) => item.status == "Present"
    //         // ).length;
    //         // const classesMissed = totalClasses - classesAttended;
    //         // const attendancePercentage = (
    //         //     (classesAttended / totalClasses) *
    //         //     100
    //         // ).toFixed(2);

    //         // document.getElementById("totalClasses").innerText = totalClasses;
    //         // document.getElementById("classesAttended").innerText = classesAttended;
    //         // document.getElementById("classesMissed").innerText = classesMissed;
    //         // document.getElementById(
    //         //     "attendancePercentage"
    //         // ).innerText = `${attendancePercentage}%`;

    //         // Update right side (table)
    //         // const tableBody = document
    //         //     .getElementById("attendanceTable")
    //         //     .getElementsByTagName("tbody")[0];
    //         // data.forEach((item) => {
    //         //     const row = tableBody.insertRow();
    //         //     const cell1 = row.insertCell(0);
    //         //     const cell2 = row.insertCell(1);

    //         //     cell1.innerText = item.date;
    //         //     cell2.innerText = item.status;
    //         // });
    //     })
    //     .catch((error) => console.error("Error fetching data:", error));
}


function fetchAttendance(){
    let getAttendance = urls.getAttendance;
    let totalClasses = [];
    let totalClassCount = 0;
    let classesMissed;
    let attendancePercentage;
    fetch(getAttendance)
        .then((response) => response.json())
        .then((data) => {
            let currentUser = JSON.parse(window.localStorage.getItem('userData'));
            let currentUserId = currentUser._id;
            data.forEach((d1) =>{
                d1.students.forEach((d2)=>{
                    if(d2._id == currentUserId){
                        d2.date = d1.date;
                        totalClasses.push(d2);
                    }
                })
            });
            totalClassCount = totalClasses.length;
            classesAttended = totalClasses.filter(
                (item) => item.status == "Present"
            ).length;
            classesMissed = totalClassCount - classesAttended;
            attendancePercentage = (
                (classesAttended / totalClassCount) *
                100
            ).toFixed(2);

            document.getElementById("totalClasses").innerText = totalClassCount;
            document.getElementById("classesAttended").innerText = classesAttended;
            document.getElementById("classesMissed").innerText = classesMissed;
            document.getElementById(
                "attendancePercentage"
            ).innerText = `${attendancePercentage}%`;

            const tableBody = document
                .getElementById("attendanceTable")
                .getElementsByTagName("tbody")[0];
                totalClasses.forEach((item) => {
                const row = tableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);

                cell1.innerText = item.date;
                cell2.innerText = item.status;

                if(cell2.innerText == 'Present'){
                    row.classList.add('presentCls')
                }else if(cell2.innerText == 'Absent'){
                    row.classList.add('absentCls')
                }
            });

        })
        .catch((error) => console.error("Error fetching data:", error));
}