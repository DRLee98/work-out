const expandBtns = document.querySelectorAll("#jsExpandBtn");

const handleExpandBtn = (e) => {
  const {
    target: { offsetParent: { parentNode: day } }
  } = e;
  if (!day.classList.contains("close")) {
    day.classList.add("close");
    e.target.className = "fas fa-plus";
  } else {
    day.classList.remove("close");
    e.target.className = "fas fa-minus";
  }
};

function init(){
  expandBtns.forEach((b) => b.addEventListener("click", handleExpandBtn));
};

if (expandBtns) {
  init();
}