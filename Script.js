let input = document.getElementById("input");
let button = document.getElementById("add");
let list = document.getElementById("list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(addTaskToDOM);

button.onclick = addTask;

function addTask() {
    let value = input.value.trim();
    if (value === "") return;

    tasks.push(value);
    saveTasks();

    addTaskToDOM(value);
    input.value = "";
}

function addTaskToDOM(task) {
    let li = document.createElement("li");
    li.innerText = task;

    // زر حذف
    let del = document.createElement("button");
    del.innerText = "✖";

    del.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        tasks = tasks.filter(t => t !== task);
        saveTasks();
    };

    // تحديد كمكتمل
    li.onclick = function () {
        li.classList.toggle("done");
    };

    li.appendChild(del);
    list.appendChild(li);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}