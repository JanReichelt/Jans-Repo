// from: https://www.youtube.com/watch?v=0tEW8rB1bbU

// VARIABLES
var checklist = document.getElementById("checklist");
var items = checklist.querySelectorAll("li");
var inputs = checklist.querySelectorAll("input")
var plus = document.getElementById("plus");
var test = checklist.querySelectorAll("#delete");
console.log(test);

// Erzeugen eines <p> zum Anzeigen von Text auf leerer Liste. Und aufrufen der
// Funktion, die prüft, ob Liste leer ist und den <p> entsprechend füllt.
var emptyListText = document.createElement("P");
document.body.appendChild(emptyListText);
emptyList();

function emptyList() {
  if (items.length == 0) {
    emptyListText.innerHTML = "Willst Du nicht etwas auf Deine To-Do-Liste packen? <br> Drücke dazu einfach das Plus.";
  } else {
    emptyListText.innerHTML = "";
  }
}

// EVENTS
plus.addEventListener("click", addListItem); // Button zum Hinzufügen neuer List-Items
test.addEventListener("click", deleteItem);

function addListener(i) {
  items[i].addEventListener("click", editItem);
  inputs[i].addEventListener("blur", updateItem);
  inputs[i].addEventListener("keypress", itemKeypress);
}

for(var i = 0; i < items.length; i++) {
  addListener(i);
}

// METHODS

function editItem(e) {
  //console.log(this);
  this.className = "edit";
  var input = this.querySelector("input");
  input.focus();                                  // bei Klick direkt Fokus auf Inputform
  input.setSelectionRange(0, input.value.length); // direkt die Buchstaben 0 bis Wortlänge selektieren

  // this.lastChild.className = "fas fa-minus-circle edit";
  // console.log(this.lastChild.className);
}

function updateItem() {
  this.previousElementSibling.innerHTML = this.value;
  this.parentNode.className = "";
}

function itemKeypress(event) {
  if (event.which === 13) {
    updateItem.call(this.lastChild);
  }
}

function addListItem() {
  var newItemText = window.prompt("Gib Deine neue Notiz ein.", "ToDo");
  var newItem = document.createElement("LI");
  newItem.innerHTML = "<span>" + newItemText + "</span>" +
                      "<input value=\"" + newItemText+ "\" />" +
                      "<i class=\"fas fa-minus-circle\" id=\"delete\"></i>";
  console.log(newItem);
	//checklist.appendChild(newItem);
  // instead of the following two lines - Node at the end of the List
  var firstLi = checklist.firstChild;
  checklist.insertBefore(newItem, firstLi);

  items = checklist.querySelectorAll("li");
  inputs = checklist.querySelectorAll("input")
  console.log(items);
  console.log(inputs);

  addListener(0);
  emptyList();
}

function deleteItem() {
  console.log(test);
}
