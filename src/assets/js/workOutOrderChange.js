import axios from "axios";

const container = document.querySelector(".day-container.edit");
const upBtns = document.querySelectorAll(".upBtn");
const downBtns = document.querySelectorAll(".downBtn");
const saveBtn = document.getElementById("jsSaveOrder");
const saveMsg = document.getElementById("jsSaveMsg");

let lists;

const changeOrder = (target, direction) => {
  let currentNum, changeNum;
  let changeList = [];
  for (let i = 0; i < lists.length; i++) {
    if (target.id === lists[i].id) {
      currentNum = i;
    }
  }
  if (direction === "up" && currentNum > 0) {
    changeNum = currentNum - 1;
  } else if (direction === "down" && currentNum < lists.length - 1) {
    changeNum = currentNum + 1;
  } else {
    changeNum = currentNum;
  }
  for (let i = 0; i < lists.length; i++) {
    if (i === changeNum) {
      changeList.push(lists[currentNum]);
    } else if (i === currentNum) {
      changeList.push(lists[changeNum]);
    } else {
      changeList.push(lists[i]);
    }
  }
  lists.forEach((l) => container.removeChild(l));
  changeList.forEach((l) => container.appendChild(l));
  lists = changeList;
};

const orderBtnHandle = (e) => {
  const {
    target: {
      classList,
      parentNode: { parentNode },
    },
  } = e;
  if (classList.contains("upBtn")) {
    changeOrder(parentNode, "up");
  } else {
    changeOrder(parentNode, "down");
  }
};

const handleSave = async () => {
  let workOutId = [];
  const dayId = window.location.href.split("/")[4];
  lists.forEach((l) => workOutId.push(l.id));
  const response = await axios({
    url: `/api/${dayId}/change-order`,
    method: "POST",
    data: {
      workOuts: workOutId,
    },
  });
  if (response.status === 200) {
    saveMsg.classList.add("show");
    setTimeout(() => {
      saveMsg.classList.remove("show");
    }, 3000);
  }
};

function init() {
  lists = container.querySelectorAll("li");
  upBtns.forEach((b) => b.addEventListener("click", orderBtnHandle));
  downBtns.forEach((b) => b.addEventListener("click", orderBtnHandle));
  saveBtn.addEventListener("click", handleSave);
}

if (container) {
  init();
}
