// Step 1: Attach handlers after DOM is ready and avoid null form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) form.addEventListener("submit", getDetails);
    // load data immediately so output shows even without a form
    getDetails();
});

// Step 2: 
// "userId": 1,
//     "id": 2,
//     "title": "quis ut nam facilis et officia qui",
//     "completed": false 


function getDetails(e) {
    if (e && e.preventDefault) e.preventDefault();
    // Clear any existing rows to avoid duplicates
    const tbody = document.querySelector("tbody");
    if (tbody) tbody.innerHTML = "";

    // Fetch the data from the API
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((taskObj) => {
                displayTable(taskObj);
            });
        })
        .catch((err) => console.error("Fetch error:", err));


    // let name = document.querySelector("Title").value;
    // let priority = document.querySelector("#priority").value;

    // console.log(name, priority);

    // let taskObj = { name, priority };

    // console.log(taskObj);
    // displayTable(taskObj);
}

function displayTable(taskObj) {
    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = taskObj.userId;

    const td2 = document.createElement("td");
    td2.innerText = taskObj.id;

    const td3 = document.createElement("td");
    td3.innerText = taskObj.title;

    const td4 = document.createElement("td");
    td4.innerText = taskObj.completed ? "Yes" : "No";

    row.append(td1, td2, td3, td4);
    const tbody = document.querySelector("tbody");
    if (tbody) tbody.append(row);

}

