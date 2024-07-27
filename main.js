let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//empty array to store tasks
let arrayOfTasks = [];

// ckeck if there is tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger getDataFromLocalStorage
getDataFromLocalStorage();

// add task
submit.onclick = function () {
    if (input.value != "") {
        addTaskToArray(input.value);
        input.value = ""; // empty input field

    }
}

// click on task element
tasksDiv.addEventListener("click", (e) => {
    // delete button
    if (e.target.classList.contains("del")) {
        //remove element from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // remove element from page
        e.target.parentElement.remove();
    }
    // task element
    if (e.target.classList.contains("task")) {
        //toggle completed for the taks
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // toggle done class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    // task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //push task to array of tasks
    arrayOfTasks.push(task);
    // add tasks to page
    addElementsToPageFrom(arrayOfTasks);
    //add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    // empty the tasks div
    tasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        //create main div
        let div = document.createElement("div");
        div.className = "task";
        // check if task is done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        //add task div to tasks container
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}