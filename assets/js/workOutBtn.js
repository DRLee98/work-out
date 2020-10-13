const Btns = document.querySelectorAll("#jsDayBtn");

const handleBtn = (e) => {
  const {
    target: { parentNode: day }
  } = e;
  if (!day.classList.contains("close")) {
    day.classList.add("close");
    e.target.className = "fas fa-plus";
  } else {
    day.classList.remove("close");
    e.target.className = "fas fa-minus";
  }
};

const init = () => {
  Btns.forEach((b) => b.addEventListener("click", handleBtn));
};

if (Btns) {
  init();
}
