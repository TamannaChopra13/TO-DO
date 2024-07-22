const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const inputDate = document.getElementById("input-date");
const searchBox = document.getElementById("search-box");
const cate = document.getElementById("category-select");
function addTask() {
    // console.log(inputDate+"kjh");
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = `<div class="descc"><p id="inptxt">${inputBox.value}</p>  <p id="inpdate">${inputDate.value}</p>
        <p id="inpcate">${cate.value}</p>
        </div>`;
        listContainer.appendChild(li);

       

        let span1=document.createElement("span1");
        span1.innerHTML="Edit";                    // edit button
            //  span1.className="edit-button";       
        li.appendChild(span1);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";               // for cross icon
        li.appendChild(span);
    }
    inputBox.value = "";
    inputDate.value = "";
    cate.value= "";
    //so that text bar can become empty after we add a task
    saveData();
}

listContainer.addEventListener("click", function (e) {

    console.log(e.target.tagName);          //for checked icon
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }

    else if (e.target.tagName === "SPAN1") {
        const taskText = e.target.parentElement.querySelector("#inptxt").textContent.trim();
        const taskDate = e.target.parentElement.querySelector("#inpdate").innerText;
        inputBox.value = taskText;
        console.log(taskText);
        console.log(taskDate);
        inputDate.value = taskDate;
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        console.log("inside span 0");
        e.target.parentElement.remove();
        saveData();
    }
    // else if (e.target.classList.contains("edit-button")) {
    //     const taskText = e.target.parentElement.textContent.trim();             
    //     inputBox.value = taskText;
    //     e.target.parentElement.remove();
    //     saveData();
    // }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function searchTasks() {
    const searchText = searchBox.value.toLowerCase();                   //searching
    const tasks = listContainer.getElementsByTagName("li");

    for (const task of tasks) {
        const taskText = task.textContent.toLowerCase();

        if (taskText.includes(searchText)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    }
}
searchBox.addEventListener("input", searchTasks);
showTask();
searchTasks();


function sortTasksByDate() {                                                      //sort by date
    const tasks = Array.from(listContainer.getElementsByTagName("li"));
    tasks.sort((taskA, taskB) => {
        const dateA = new Date(taskA.querySelector("#inpdate").innerText);
        const dateB = new Date(taskB.querySelector("#inpdate").innerText);
        
        // console.log(dateA);
        return dateA - dateB;
    });

    listContainer.innerHTML = "";
    tasks.forEach(task => listContainer.appendChild(task));
}


const sortButton = document.getElementById("sort-button");

// calling sort by date function
sortButton.addEventListener("click", sortTasksByDate);