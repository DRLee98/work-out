import axios from "axios";

const deleteBtns = document.querySelectorAll(".deleteBtn");
const container = document.querySelector(".day-container.edit");
const saveMsg = document.getElementById("jsMsg");

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
  const msgText = saveMsg.querySelector("span");
  if (response.status === 200) {
    container.removeChild(targetList);
    msgText.innerText = `${response.data} 운동이 성공적으로 삭제되었습니다.`;
    saveMsg.classList.add("show", "success");
    setTimeout(() => {
      saveMsg.classList.remove("show", "success");
    }, 3000);
  } else {
    msgText.innerText = "운동 삭제에 실패하였습니다.";
    saveMsg.classList.add("show", "error");
    setTimeout(() => {
      saveMsg.classList.remove("show", "error");
    }, 3000);
  }
};

function init() {
  deleteBtns.forEach((b) => b.addEventListener("click", handleDeleteBtn));
}

if (deleteBtns) {
  init();
}
