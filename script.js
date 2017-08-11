var numStack = new Stack();
var opStack = new Stack();
var cells = document.getElementsByTagName("td");
var cellsChar = [];

window.onload = function() {
  for(var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(e) {
      if(e.target.innerHTML === "=") {
        $("input-line").innerHTML = $("answer-line").innerText;
      }
      else if(e.target.innerHTML === "C") {
        $("input-line").innerHTML = "";
      }
      else {
        $("input-line").innerHTML += e.target.innerHTML;
        $("answer-line").innerHTML = eval($("input-line").innerText);
      }
    });
    cells[i].id = "input" + cells[i].innerText;
    cellsChar.push(cells[i].innerText);
  }
  window.addEventListener("keydown", function(e) {
    if(e.keyCode === 27) {
      $("input-line").innerHTML = "";
    }
    else if(e.keyCode === 13 || e.key === "=") {
      $("input-line").innerHTML = eval($("input-line").innerText);
    }
    else if(cellsChar.indexOf(e.key) > -1)
      $("input-line").innerHTML += e.key;
  })

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



//Stack data structure
function Stack() {
 this.stac = [];
 this.pop=function() {
  return this.stac.pop();
  };
 this.push=function(item) {
  this.stac.push(item);
  };
}

function $(id) {
  return document.getElementById(id);
}
