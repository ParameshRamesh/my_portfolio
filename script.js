/* ============================================
   Style 7 JavaScript
   Three features:
   1. Open and close the menu on small screens
   2. Check the contact form before sending
   3. Click on the graph paper to plot a dot
   ============================================ */


/* ---------- 1. MENU BUTTON ---------- */

var menuBtn = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

// on click, add or remove the class "show"
menuBtn.addEventListener("click", function () {
  menu.classList.toggle("show");
});

// close the menu after a link is clicked
var links = document.querySelectorAll(".menu a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    menu.classList.remove("show");
  });
}


/* ---------- 2. CONTACT FORM CHECK ---------- */

var form = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (event) {

  event.preventDefault(); // stop the page from reloading

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // any empty box -> warning
  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "error: please fill all the fields.";
    formMsg.style.color = "#d12c1f";
    return;
  }

  // email must contain @
  if (email.indexOf("@") === -1) {
    formMsg.textContent = "error: please enter a valid email.";
    formMsg.style.color = "#d12c1f";
    return;
  }

  // all good
  formMsg.textContent = "ok: message received. thank you.";
  formMsg.style.color = "#1f3bff";
  form.reset();
});


/* ---------- 3. CLICK TO PLOT A DOT ---------- */

var paper = document.getElementById("paper");
var layer = document.getElementById("layer");

// the small squares of the grid are 24 pixels wide (see the CSS)
var square = 24;

paper.addEventListener("click", function (event) {

  // do nothing if the click was on a link, button or form box
  if (event.target.closest("a, button, input, textarea, label")) {
    return;
  }

  // where is the paper on the screen?
  var box = paper.getBoundingClientRect();

  // where did the mouse click, measured from the top-left corner of the paper?
  var x = event.clientX - box.left;
  var y = event.clientY - box.top;

  // snap to the nearest grid crossing:
  // divide by 24, round to a whole number, multiply by 24 again
  x = Math.round(x / square) * square;
  y = Math.round(y / square) * square;

  // make a new dot and put it there
  var dot = document.createElement("span");
  dot.className = "dot";
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  layer.appendChild(dot);

  // keep only the last 40 dots
  if (layer.children.length > 40) {
    layer.removeChild(layer.firstChild);
  }
});
