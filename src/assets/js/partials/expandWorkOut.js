const expandBtns = document.querySelectorAll(".expandBtn");

const handleExpandBtn = (e) => {
  const {
    target: {
      parentNode: { parentNode: day },
    },
  } = e;
  if (!day.classList.contains("close")) {
    day.classList.add("close");
    e.target.innerHTML = "<i class='fas fa-plus'></i>";
  } else {
    day.classList.remove("close");
    e.target.innerHTML = "<i class='fas fa-minus'></i>";
  }
};

function init() {
  expandBtns.forEach((b) => b.addEventListener("click", handleExpandBtn));
}

if (expandBtns) {
  init();
}
