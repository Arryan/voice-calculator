var cells = document.getElementsByTagName("td");
var cellsChar = [];
var prevExpressions = new Stack();
var inLn = $("input-line");
var ansLn = $("answer-line");

window.onload = function() {
  for(var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleClick);
    cellsChar.push(cells[i].innerText);
  }
  window.addEventListener("keydown", handleKey);

  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'what is *expression': function(exp) {
        inLn.innerHTML = formatExpression(exp);
        ansLn.innerHTML = eval(inLn.innerHTML);
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
    prevExpressions.push(inLn.innerText);
    addEntry();
    inLn.innerHTML = ansLn.innerText;
  }
  else if(e.target.innerHTML === "C") {
    prevExpressions.push(inLn.innerText);
    inLn.innerHTML = "";
    ansLn.innerHTML = "";
  }
  else if(e.target.id === "backspace") {
    inLn.innerText = inLn.innerText.substring(0, inLn.innerText.length - 1);
    ansLn.innerHTML = eval(inLn.innerText.replace(/["^"]/g, "**"));
  }
  else {
    inLn.innerHTML += (e.target.className === "function") ?
    e.target.innerHTML + "(" : e.target.innerHTML;
    ansLn.innerHTML = eval(formatExpression(inLn.innerText, e.target.innerHTML));
  }
};

var handleKey = function(e) {
  //Pressing enter or =
  if(e.keyCode === 13 || e.key === "=") {
    prevExpressions.push(inLn.innerText);
    addEntry();
    inLn.innerHTML = ansLn.innerText;
  }
  //Pressing up arrow key
  if(e.keyCode === 38) {
    inLn.innerText = prevExpressions.pop();
    ansLn.innerHTML = eval(inLn.innerText.replace(/["^"]/g, "**"));
  }
  //Pressing escape or c
  else if(e.keyCode === 27 || e.key.toLowerCase() === "c") {
    prevExpressions.push(inLn.innerText);
    inLn.innerHTML = "";
    ansLn.innerHTML = "";
  }
  //Pressing backspace
  else if(e.keyCode === 8) {
    inLn.innerText = inLn.innerText.substring(0, inLn.innerText.length - 1);
    ansLn.innerHTML = eval(inLn.innerText.replace(/["^"]/g, "**"));
  }
  //Pressing other key on calculator
  else if(cellsChar.indexOf(e.key) > -1) {
    inLn.innerHTML += e.key;
    ansLn.innerHTML = eval(inLn.innerText.replace(/["^"]/g, "**"));
  }
};

function formatExpression(str, func) {
  str = str.replace(/["^"]/g, "**");
  str = str.replace(/( )|(of)/g, "");
  str = str.replace(/(cosine)/g, "cos(");
  str = str.replace(/(sine)/g, "sin(");
  str = str.replace(/(Open Bracket)/g, "(");
  str = str.replace(/(Closing Bracket)/g, ")");
  str = str.replace(/(times)/g, "*");
  str = str.replace(/(to the power of 5)/g, "**");
  str = str.replace(/(sin)|(cos)|(tan)|(log)/g, "Math." + "$&");
  return str;
}

function addEntry() {
  var inNode = document.createElement("p");
  var ansNode = document.createElement("p");
  inNode.innerText = inLn.innerText;
  ansNode.innerHTML = "=" + ansLn.innerText + "<br><br>";
  $("history").appendChild(inNode);
  $("history").appendChild(ansNode);
}

//Stack data structure
function Stack() {
  this.stack = [];
  this.pop = function() {
    return this.stack.length > 0 ? this.stack.pop() : "";
  };
  this.push = function(item) {
    this.stack.push(item);
  };
  this.peek = function() {
    return this.stack.length > 0 ?
      this.stack[this.stack.length] : "";
  };
  this.isEmpty = function() {
    return this.stack.length === 0;
  };
}

//Alias function
function $(id) {
  return document.getElementById(id);
}


