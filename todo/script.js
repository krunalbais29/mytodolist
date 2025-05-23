
let todoRootContEl = document.getElementById("todoRootCont");
let userInEl = document.getElementById("userIn");
let errorMsgEl = document.getElementById("errorMsg");




// let todolist = JSON.parse(localStorage.getItem("mytodo"));

function getTodo(){

   let data = localStorage.getItem("mytodo");

   if(data === null){
      return [];
   }
   else{
      return JSON.parse(localStorage.getItem("mytodo"));
   }
}

let todolist = getTodo();



function onTodoStatusChange(isChecked,titleId){

   let myTitle = document.getElementById(titleId);

   myId = titleId.slice(5);

   if(isChecked === true){
      myTitle.style.textDecoration = "line-through";
   }
   else{
      myTitle.style.textDecoration = "none";
   }


   for(each of todolist){
      if(each.id == myId){
         if(each.isChecked === true){
            each.isChecked = false;
         }
         else{
            each.isChecked = true;
         }
      }
   }
   
   // console.log(todolist);


}


function createAndAppendTodo(todo){

   let checkboxId = "checkbox" + todo.id;
   let titleId = "title" + todo.id;
   let todoId = "li" + todo.id;


   let listItem = document.createElement("li");
   listItem.classList.add("list-cont");
   listItem.id = todoId;
   todoRootContEl.appendChild(listItem);

   let checkboxEl = document.createElement("input");
   checkboxEl.type = "checkbox";
   checkboxEl.id = checkboxId;
   checkboxEl.onclick = function(){
      onTodoStatusChange(checkboxEl.checked,titleId);
   }
   listItem.appendChild(checkboxEl);


   let labelEl = document.createElement("label");
   labelEl.classList.add("label-cont");
   labelEl.htmlFor = checkboxId;
   listItem.appendChild(labelEl);

   let titleEl = document.createElement("h4");
   titleEl.textContent = todo.title;
   titleEl.id = titleId; 
   if(todo.isChecked === true){
      titleEl.style.textDecoration = "line-through";
      checkboxEl.checked = true;
   }
   labelEl.appendChild(titleEl);

   let deleteBtn = document.createElement("button");
   deleteBtn.classList.add("dlt-btn");
   deleteBtn.onclick = function(){
      onDeletetodo(todoId, titleId);
   }
   labelEl.appendChild(deleteBtn);

   let dltIconEl = document.createElement("i");
   dltIconEl.classList.add("fa-solid","fa-trash");
   deleteBtn.appendChild(dltIconEl);


}

for(each of todolist){
   createAndAppendTodo(each);
}

function onAddTodo(){

   let title = userInEl.value;
   let lenOfTodo = todolist.length+1;

   if(title === ""){
      errorMsgEl.textContent = "Please enter valid input!!!";
   }
   else{
      let newTodo = 
      {
         title : title,
         id : lenOfTodo,
         isChecked : false
      }

      todolist.push(newTodo);
      // console.log(todolist);

      errorMsgEl.textContent = "";
      userInEl.value = "";
   
      createAndAppendTodo(newTodo);
   }
}


function onSavetodo(){

   let todoData = JSON.stringify(todolist);
   localStorage.setItem("mytodo",todoData);
}



function onDeletetodo(todoId,titleId){


   let myTodo = document.getElementById(todoId);
   todoRootContEl.removeChild(myTodo);

   let uniId  = titleId.slice(5);

   let index = todolist.findIndex((e)=>e.id == uniId);
   
   for(each of todolist){
      if(each.id == uniId){
         todolist.splice(index,1);       
      }
   }

    todoRootContEl.innerHTML = ""; // Clear existing items

    // Reassign id
   let i = 0;
   for (let each of todolist) {
      each.id = i + 1;
      createAndAppendTodo(each);
      i++;
   }

   // localStorage.setItem("mytodo",JSON.stringify(todolist));

}



