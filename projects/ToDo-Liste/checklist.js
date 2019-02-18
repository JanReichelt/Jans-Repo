// from: https://www.youtube.com/watch?v=0tEW8rB1bbU
// JSON-Tutorial: https://www.youtube.com/watch?v=82hnvUYY6QA

// VARIABLES
var checklist = document.getElementById("checklist");
var items = checklist.querySelectorAll("li");
var inputs = checklist.querySelectorAll("input")
var plus = document.getElementById("plus");
var test = checklist.getElementsByClassName("delete");
//var test = checklist.querySelectorAll("i.delete");
console.log(test);

// Erzeugen eines <p> zum Anzeigen von Text auf leerer Liste. Und aufrufen der
// Funktion, die prüft, ob Liste leer ist und den <p> entsprechend füllt.
var emptyListText = document.createElement("P");
document.body.appendChild(emptyListText);
emptyListCheck();

function emptyListCheck() {
  if (items.length == 0) {
    emptyListText.innerHTML = "Willst Du nicht etwas auf Deine To-Do-Liste packen? <br> Drücke dazu einfach das Plus.";
  } else {
    emptyListText.innerHTML = "";
  }
}

// EVENTS
plus.addEventListener("click", addListItem); // Button zum Hinzufügen neuer List-Items

function addListener(i) {
  items[i].addEventListener("click", editItem);
  inputs[i].addEventListener("blur", updateItem);
  inputs[i].addEventListener("keypress", itemKeypress);
  test[i].addEventListener("click", deleteItem);
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
    updateItem.call(this);
  }
}

function addListItem() {
  var newItemText = window.prompt("Gib Deine neue Notiz ein.", "ToDo");
  var newItem = document.createElement("LI");
  newItem.innerHTML = "<span>" + newItemText + "</span>" +
                      "<input value=\"" + newItemText+ "\" />" +
                      "<i class=\"fas fa-minus-circle delete\"></i>";
	//checklist.appendChild(newItem);
  // instead of the following two lines - Node at the end of the List
  var firstLi = checklist.firstChild;
  checklist.insertBefore(newItem, firstLi);

  items = checklist.querySelectorAll("li");
  inputs = checklist.querySelectorAll("input")

  addListener(0); //  There is a way not to reasign all event handlers everytime
                  //  i put in a new element called event delegation - see for example:
                  //  https://www.smashingmagazine.com/2010/04/seven-javascript-things-i-wish-i-knew-much-earlier-in-my-career/
                  //  i could/should search more on this topic and implement it here
  emptyListCheck();
  console.log(test);
  console.log(test[0].parentElement);
  loadBullets();
}

function deleteItem() {
  alert("Hi, this works");
  //var elem = document.getElementById('dummy');
  //elem.parentNode.removeChild(elem);
  //return false;
}


function loadBullets() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'bullets.json', true);

  xhr.onload = function() {
    if(this.status == 200) {
      var bullets = JSON.parse(this.responseText);
      var output = "";

      for (var i in bullets) {
        console.log(bullets);
        output += "<li><span>" + bullets[i].content + "</span>" +
                            "<input value=\"" + bullets[i].content + "\" />" +
                            "<i class=\"fas fa-minus-circle delete\"></i></li>";
      }

      document.getElementById('JSON-Test').innerHTML = output;
      console.log(output);
    } else if (this.status == 404) {
      document.getElementById('JSON-Test').innerHTML = "<li>Data not found.</li>";
    }
  }
  xhr.send();
  for(var j = 0; j < items.length; j++) {
    addListener(j);
  }
}
