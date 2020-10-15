const Btns = document.querySelectorAll("#jsExpanBtn");

const handleBtn = (e) => {
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
  console.dir(e.target)
};

const init = () => {
  Btns.forEach((b) => b.addEventListener("click", handleBtn));
};

if (Btns) {
  init();
}
