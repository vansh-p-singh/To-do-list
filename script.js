let tasks=[];

function taskObj(id,done,text){
    this.id=id;
    this.done=done;
    this.text=text;
}









// The code here is for add function

let taskInput=document.getElementById("task-input");
let addTaskbtn=document.getElementById("add-task-btn");
let taskslist=document.getElementById("on-gng-list");

// addTodo function- This functions adds the task to arrays, which is further used to display all tasks on window.
function addTodo(id,done,text){
    tasks.push(new taskObj(id,done,text));
}

// This function is to update todo , everytime a actions occurs such as deletion, complete status update etc.
function updateTodo(){
    taskslist.innerHTML="";
    for(let x=0;x<tasks.length;x++){
        if(tasks[x].done==true){
            let item=document.createElement("li");
            item.innerHTML=`<p class="completed">${tasks[x].text}</p><div class="button-container"><button class='delete-btn' data-id=${tasks[x].id}><i class='bi bi-trash3-fill'></i></button><button class='complete-btn' data-id=${tasks[x].id}><i class="bi bi-x-lg"></i></button></div>`;
            taskslist.appendChild(item);
        }
        else{
            let item=document.createElement("li");
            item.innerHTML=`<p>${tasks[x].text}</p><div class="button-container"><button class='delete-btn' data-id=${tasks[x].id}><i class='bi bi-trash3-fill'></i></button><button class='complete-btn' data-id=${tasks[x].id}><i class='bi bi-check-lg'></i></button></div>`;
            taskslist.appendChild(item);
        }
    }
    //The below code will update the count of pending tasks
    let count=tasks.filter((x)=>{
        return x.done==false;
    }).length;
    document.getElementById("task-count").innerText=`You have ${count} pending tasks`;
}

// This is application of data input by pressing enter
taskInput.addEventListener("keydown",(e)=>{
    if(e.key=="Enter" && taskInput.value.trim()!=""){
        let date=new Date;
        addTodo(date.getTime(),false,taskInput.value);
        taskInput.value="";
        updateTodo();
    }
})
// THis is same application using button click
addTaskbtn.addEventListener("click",()=>{
    if(taskInput.value.trim()!=""){
        let date=new Date;
        addTodo(date.getTime(),false,taskInput.value);
        taskInput.value="";
        updateTodo();
    }
})

// deleteTask function
function deleteTask(id){
    let i=tasks.indexOf(tasks.filter((x)=>{return x.id==id})[0]);  // here we get the index of the object in array we want to delete
    tasks.splice(i,1);
    updateTodo();
}

// The below code is application of delete function
document.addEventListener("click", function(event) {
    let deleteBtn = event.target.closest(".delete-btn");        //it is done as earlier event was trigerring only on clicking some specific area.
    if (deleteBtn) {
        let taskId = deleteBtn.getAttribute("data-id");
        deleteTask(taskId);
    }
});

// Completion or toggle (turns completed to incomplete and complete to incomplete)
document.addEventListener("click", function(event) {
    let completeBtn = event.target.closest(".complete-btn");    //here we are fetching id
    if (completeBtn){
        let taskId=completeBtn.getAttribute("data-id");
        let t=tasks.indexOf(tasks.filter((x)=>{     //it is to get get index of that tasks in array
            return x.id==taskId;
        })[0]);
        if(tasks[t].done==true){                // turns false to true and true to false
            tasks[t].done=false;
        }
        else if(tasks[t].done==false){
            tasks[t].done=true;
        }
        updateTodo();
    }
});