import axios from "axios";

const deleteBtns = document.querySelectorAll(".deleteBtn");
const container = document.querySelector(".day-container.edit");

const handleDeleteBtn = async (e) => {
  const {
    target: {
      parentNode: { parentNode: targetList },
    },
  } = e;
  const response = await axios({
    url: `/api/${targetList.id}/delete`,
    method: "POST",
  });
  if (response.status === 200) {
    container.removeChild(targetList);
  }
};

function init() {
  deleteBtns.forEach((b) => b.addEventListener("click", handleDeleteBtn));
}

if (deleteBtns) {
  init();
}
