const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// تحميل المهام من التخزين
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// عرض المهام
function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${task.done ? "line-through" : "none"}">
                ${task.text}
            </span>
            <div>
                <button onclick="toggleTask(${index})">✔️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    // حفظ بعد كل تحديث
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// إضافة مهمة
addBtn.onclick = () => {
    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        done: false
    });

    input.value = "";
    renderTasks();
};

// حذف
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// إكمال
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

// أول تشغيل
renderTasks();