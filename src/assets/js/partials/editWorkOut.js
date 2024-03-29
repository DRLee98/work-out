import axios from "axios";

const editBtns = document.querySelectorAll(".editBtn");
const editWorkOutForms = document.querySelectorAll(".edit_work-out");
const msgBox = document.getElementById("jsMsg");
let msgText;

const handleEditBtn = (e) => {
  const {
    target: {
      parentNode: { parentNode: list },
    },
  } = e;
  if (!list.classList.contains("edit")) {
    list.classList.add("edit");
  } else {
    list.classList.remove("edit");
  }
};

const editWorkOut = (workOut, li) => {
  const { children: span } = li;
  span[0].innerText = workOut[0].value;
  span[1].innerText = workOut[1].value >= 1 ? `${workOut[1].value}kg` : "";
  span[2].innerText =
    workOut[2].value === "reps"
      ? `${workOut[3].value}개`
      : `${workOut[3].value}초`;
  span[3].innerText = `${workOut[4].value}세트`;
  span[4].innerText =
    workOut[5].value / 60 >= 1
      ? `${Math.floor(workOut[5].value / 60)} : ${
          workOut[5].value % 60 < 10
            ? `0${workOut[5].value % 60}`
            : workOut[5].value % 60
        }`
      : workOut[5].value % 60 < 10
      ? `0${workOut[5].value % 60}`
      : workOut[5].value % 60;
  li.classList.remove("edit");
  msgText.innerText = `${workOut[0].value} 운동 수정에 성공 하였습니다!`;
  msgBox.classList.add("show", "success");
  setTimeout(() => {
    msgBox.classList.remove("show", "success");
  }, 3000);
};

const sendEditWorkOut = async (workOut, li) => {
  const response = await axios({
    url: `/api/${li.id}/edit`,
    method: "POST",
    data: {
      name: workOut[0].value,
      weight: workOut[1].value,
      repsOrHold: workOut[2].value,
      count: workOut[3].value,
      set: workOut[4].value,
      breakTime: workOut[5].value,
    },
  });
  msgText = msgBox.querySelector("span");
  if (response.status === 200) {
    editWorkOut(workOut, li);
  } else {
    msgText.innerText = "운동 수정을 실패 하였습니다.";
    msgBox.classList.add("show", "error");
    setTimeout(() => {
      msgBox.classList.remove("show", "error");
    }, 3000);
  }
};

const handleEditSubmit = (e) => {
  e.preventDefault();
  const {
    target: { children, parentElement },
  } = e;
  sendEditWorkOut(children, parentElement);
};

function init() {
  editBtns.forEach((b) => b.addEventListener("click", handleEditBtn));
  editWorkOutForms.forEach((f) =>
    f.addEventListener("submit", handleEditSubmit),
  );
}

if (editWorkOutForms) {
  init();
}
