var addInput = document.getElementById("addInput");
var addButton = document.getElementsByTagName("button")[0];
var undoneList = document.getElementById("undoneList");
var completedList = document.getElementById("completedList");
var item = 3;

//New Todo List Item 初始化待辦清單
var createNewTodoElement = function(taskString) {
  
  var listItem = document.createElement("li"); //li  
  var checkBox = document.createElement("input"); //checkbox
  var label = document.createElement("label"); //label  
  var deleteButton = document.createElement("button"); //button.delete
  
  //Adjust element attributes 調整元素屬性
  checkBox.type = "checkbox";
  checkBox.id = `item${item}`;
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";  
  label.innerText = taskString;  
  label.setAttribute("for", `item${item}`) ;
    
  //Append child under li 在li元素下附加子元素
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  item++;
  return listItem;
}

var addTask = function() {
  console.log("Add todo list.");
  //Create a new Todo list from user 取user輸入值
  var listItem = createNewTodoElement(addInput.value);
  //Append listItem to UndoneList 在Undone List下建立新li
  undoneList.appendChild(listItem);
  bindEvents(listItem, taskCompleted); //新建事項綁定按鈕
  
  addInput.value = "";   
}

var bindEvents = function(TodoListItem, checkBoxState) {
  console.log("Bind li button events");
  //select TodoListItem's children 選取待辦事項的子元素
  var checkBox = TodoListItem.querySelector("input[type=checkbox]");
  var deleteButton = TodoListItem.querySelector("button.delete");
  
  //bind deleteTask to delete button 點擊delete鈕後執行deleteTask
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxstate to checkbox checkbox狀態改變時執行checkBoxState
  checkBox.onchange = checkBoxState;
}

var deleteTask = function() {
  console.log("Delete todo list.");
  var listItem = this.parentNode; //被點擊物件的父元素
  var ul = listItem.parentNode;
  
  //Remove the list item from the ul 移除ul下被點擊物件的li
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  console.log("Todo List complete.");
  //Append the todo list to the completedList 將清單移至completedList
  var listItem = this.parentNode;
  completedList.appendChild(listItem);
  bindEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Todo List undone.");
  // When checkbox is unchecked
  // Append the task list to the undoneList 將清單移至undoneList
  var listItem = this.parentNode;
  undoneList.appendChild(listItem);
  bindEvents(listItem, taskCompleted);
}

// click addButton and execute the addTask function
// 點擊addButton按鈕執行addTask
addButton.onclick = addTask;

// Cycle of undoneList items
// undoneList循環切換
for(var i = 0; i <  undoneList.children.length; i++) {
  bindEvents(undoneList.children[i], taskCompleted);
}
// Cycle of completedList items
// completedList循環切換
for(var i = 0; i <  completedList.children.length; i++) {
  bindEvents(completedList.children[i], taskIncomplete); 
}