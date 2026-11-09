
// Mobile navigation menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
}

// Show the current year in the footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Academic planner
const plannerForm = document.getElementById("plannerForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyText = document.getElementById("emptyText");
let tasks = JSON.parse(localStorage.getItem("akiyodeStudyTasks")) || [];

function saveTasks() {
  localStorage.setItem("akiyodeStudyTasks", JSON.stringify(tasks));
}

function displayTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";
  if (emptyText) emptyText.style.display = tasks.length === 0 ? "block" : "none";

  tasks.forEach(function (task) {
    const item = document.createElement("li");
    item.className = task.completed ? "task-row done" : "task-row";

    const name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.title;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.type = "button";
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      displayTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(function (savedTask) {
        return savedTask.id !== task.id;
      });
      saveTasks();
      displayTasks();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    item.appendChild(name);
    item.appendChild(actions);
    taskList.appendChild(item);
  });
}

if (plannerForm) {
  plannerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = taskInput.value.trim();
    if (!title) {
      alert("Please enter a task.");
      return;
    }
    tasks.push({ id: Date.now(), title: title, completed: false });
    saveTasks();
    displayTasks();
    taskInput.value = "";
    taskInput.focus();
  });
}
displayTasks();

// Contact form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const result = document.getElementById("result");

    if (!name || !email || !phone || !message) {
      result.textContent = "Please fill in all fields.";
      result.style.color = "#a13b63";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result.textContent = "Please enter a valid email address.";
      result.style.color = "#a13b63";
      return;
    }
    if (!/^\d+$/.test(phone)) {
      result.textContent = "Phone number must contain digits only.";
      result.style.color = "#a13b63";
      return;
    }
    result.textContent = "Your form has been submitted, thank you!";
    result.style.color = "#28734d";
    contactForm.reset();
  });
}
