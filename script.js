var cells = document.getElementsByTagName("td");
var cellsChar = [];
var prevExpressions = new Stack();

window.onload = function() {
  for(var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleClick);
    cells[i].id = "input" + cells[i].innerText;
    cellsChar.push(cells[i].innerText);
  }
  window.addEventListener("keydown", handleKey);

  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'what is *expression': function(exp) {
        $('#input-line').innerHTML = exp;
        alert("works");
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }
};

var handleClick = function(e) {
  if(e.target.innerHTML === "=") {
    prevExpressions.push($("input-line").innerText);
    $("input-line").innerHTML =  $("answer-line").innerText;
  }
  else if(e.target.innerHTML === "C") {
    prevExpressions.push($("input-line").innerText);
    $("input-line").innerHTML = "";
    $("answer-line").innerHTML = "";
  }
  else {
    $("input-line").innerHTML += e.target.innerHTML;
    $("answer-line").innerHTML = eval($("input-line").innerText);
  }
};

var handleKey = function(e) {
  //Pressing enter or =
  if(e.keyCode === 13 || e.key === "=") {
    prevExpressions.push($("input-line").innerText);
    $("input-line").innerHTML = $("answer-line").innerText;
  }
  //Pressing up arrow key
  if(e.keyCode === 38) {
    $("input-line").innerText = prevExpressions.pop();
  }
  //Pressing escape or c
  else if(e.keyCode === 27 || e.key.toLowerCase() === "c") {
    prevExpressions.push($("input-line").innerText);
    $("input-line").innerHTML = "";
    $("answer-line").innerHTML = "";
  }
  //Pressing other key on calculator
  else if(cellsChar.indexOf(e.key) > -1) {
    $("input-line").innerHTML += e.key;
    $("answer-line").innerHTML = eval($("input-line").innerText);
  }
};

//Stack data structure
function Stack() {
  this.stack = [];
  this.pop = function() {
    return this.stack.length > 0 ? this.stack.pop() : "";
  };
  this.push = function(item) {
    this.stack.push(item);
  };
}


//Alias function
function $(id) {
  return document.getElementById(id);
}
