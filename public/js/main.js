function displayTasks() {
  let url = todo.checked ? "/todo" : "/tasks";
  let data = axios.get(url).then(function (res) {
    let tasks = res.data;

    while (screenToDisplay.firstChild) {
      screenToDisplay.removeChild(screenToDisplay.lastChild);
    }

    tasks.forEach((task) => {
      let card = document.createElement("div");
      card.id = task._id;
      if (task.completed) {
        card.className = "card mt-2 p-2 text-success";
      } else {
        card.className = "card mt-2 p-2 text-danger";
      }
      let p = document.createElement("p");

      p.textContent = task.title;
      let a_delete = document.createElement("a");
      a_delete.href = "#";
      a_delete.className = "delete";
      a_delete.textContent = "Delete";
      let hr = document.createElement("hr");
      card.appendChild(p);
      if (task.priority) {
        let p_prio = document.createElement("span");
        p_prio.textContent = "Priority= " + task.priority;
        card.appendChild(p_prio);
      }
      card.appendChild(hr);
      card.appendChild(a_delete);
      if (!task.completed) {
        let a_update = document.createElement("a");
        a_update.href = "#";
        a_update.className = "update";
        a_update.textContent = "Completed";
        card.appendChild(a_update);
      }
      //   card.appendChild(input);
      screenToDisplay.appendChild(card);
    });
  });
}

function addTask(e) {
  e.preventDefault();
  let task = taskTitle.value;
  let priority = taskPriority.value;
  if (task !== "") {
    let body = {title: task};
    if(priority){
      body["priority"] = priority;
    }
    axios.post("/add_task", body)
      .then((res) => {
        if (res) {
          displayTasks();
        } else {
          alert("Error!!");
        }
      });
  } else {
    alert("Please Enter task!!!");
  }
}

function clickTask(e) {
  e.preventDefault();
  if (e.target.className === "delete") {
    let isExecuted = confirm("Are you sure to delete this task?");
    if (isExecuted) {
      let id = e.target.parentElement.id;
      let parentNode = e.target.parentElement;
      axios.delete("/task/" + id).then((res) => {
        alert("Delete successed!");
        displayTasks();
      });
    }
  } else if (e.target.className === "update") {
    let isExecuted = confirm("Are you sure to complete this task?");
    if (isExecuted) {
      let id = e.target.parentElement.id;
      let parentNode = e.target.parentElement;
      axios.put("/complete/" + id).then((res) => {
        alert("Update successed!");
        displayTasks();
      });
    }
  }
}

let screenToDisplay = document.querySelector(".result");
let taskTitle = document.querySelector("#task");
let taskPriority = document.querySelector("#priority");
let btnAddTask = document.querySelector("#addTask");
let todo = document.querySelector("#todo");

btnAddTask.addEventListener("click", addTask);
screenToDisplay.addEventListener("click", clickTask);
todo.addEventListener("change", displayTasks);

displayTasks();
