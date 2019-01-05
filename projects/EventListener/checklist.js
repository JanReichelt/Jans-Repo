// from: https://www.youtube.com/watch?v=0tEW8rB1bbU

var checklist = document.getElementById("checklist");
var items = checklist.querySelectorAll("li");
var inputs = checklist.querySelectorAll("input")
var plus = document.getElementById("plus");
console.log(items);

for(var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", editItem);
  inputs[i].addEventListener("blur", updateItem);
  inputs[i].addEventListener("keypress", itemKeypress);
  plus.addEventListener("click", addListItem);
}

function editItem() {
  //console.log(this);
  this.className = "edit";
  var input = this.querySelector("input");
  input.focus();
  input.setSelectionRange(0, input.value.length);
}

function updateItem() {
  this.previousElementSibling.innerHTML = this.value;
  this.parentNode.className = "";
}

function itemKeypress(event) {
  if (event.which === 13) {
    updateItem.call(this);
  }
}

function addListItem() {
  var newItemText = window.prompt("Gib Deine neue Notiz ein.", "ToDo");
  var newItem = document.createElement("LI");
  newItem.innerHTML = "<span>" + newItemText + "</span> <input value=\"" + newItemText+ "\" />";
	//checklist.appendChild(newItem);
  // instead of the foloowing two lines - Node at the end of the List
  var firstLi = checklist.firstChild;
  checklist.insertBefore(newItem, firstLi);

  items = checklist.querySelectorAll("li");
  inputs = checklist.querySelectorAll("input")
  console.log(items);
  console.log(inputs);

  /*newSpan = document.createElement("SPAN");
  newInput = document.createElement("INPUT");
  newInputText = document.createTextNode(newItemText);
  newInput.setAttribute("value", newItemText);
  newSpan.appendChild(newInputText);
  checklist.appendChild(newSpan);
  checklist.appendChild(newInput);*/
}
