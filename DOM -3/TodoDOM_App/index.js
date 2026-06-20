let form = document.querySelector("form");
let tbody = document.querySelector("tbody");

let todoData = JSON.parse(localStorage.getItem("todoData")) || [];

displayData(todoData);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let obj = {
    task: document.getElementById("task").value,
    priority: document.getElementById("priority").value,
    fav: false
  };

  todoData.push(obj);

  localStorage.setItem("todoData", JSON.stringify(todoData));

  displayData(todoData);
  form.reset();
});

function displayData(data) {
  tbody.innerHTML = "";

  data.forEach(function (elem, index) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = elem.task;

    let td2 = document.createElement("td");
    td2.innerText = elem.priority;

    if (elem.priority === "High") {
      td2.style.backgroundColor = "red";
      td2.style.color = "white";
    } else {
      td2.style.backgroundColor = "green";
      td2.style.color = "white";
    }

    // Favourite Button
    let td3 = document.createElement("td");
    td3.innerText = elem.fav ? "★ Favourite" : "☆ Add Fav";
    td3.style.cursor = "pointer";

    td3.addEventListener("click", function () {
      todoData[index].fav = !todoData[index].fav;

      localStorage.setItem(
        "todoData",
        JSON.stringify(todoData)
      );

      displayData(todoData);
    });

    // Delete Button
    let td4 = document.createElement("td");
    td4.innerText = "Delete";
    td4.style.color = "red";
    td4.style.cursor = "pointer";

    td4.addEventListener("click", function () {
      todoData.splice(index, 1);

      localStorage.setItem(
        "todoData",
        JSON.stringify(todoData)
      );

      displayData(todoData);
    });

    tr.append(td1, td2, td3, td4);
    tbody.append(tr);
  });
}