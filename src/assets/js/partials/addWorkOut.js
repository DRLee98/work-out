import axios from "axios";

const addWorkOutForm = document.getElementById("jsAddWorkOut");
const dayElement = document.querySelectorAll(".day");
const msgBox = document.getElementById("jsMsg");
let msgText;

const daysObj = {
  mon: dayElement[0],
  tue: dayElement[1],
  wed: dayElement[2],
  thu: dayElement[3],
  fri: dayElement[4],
  sat: dayElement[5],
  sun: dayElement[6],
};

const addWorkOut = (workOut, box) => {
  const li = document.createElement("li");
  const name = document.createElement("span");
  const weight = document.createElement("span");
  const count = document.createElement("span");
  const set = document.createElement("span");
  const breakTime = document.createElement("span");
  name.innerText = workOut[0].value;
  weight.innerText = workOut[1].value >= 1 ? `${workOut[1].value}kg` : "";
  count.innerText =
    workOut[2].value === "reps"
      ? `${workOut[3].value}개`
      : `${workOut[3].value}초`;
  set.innerText = `${workOut[4].value}세트`;
  breakTime.innerText =
    workOut[5].value / 60 >= 1
      ? `${Math.floor(workOut[5].value / 60)} : ${
          workOut[5].value % 60 < 10
            ? `0${workOut[5].value % 60}`
            : workOut[5].value % 60
        }`
      : workOut[5].value % 60 < 10
      ? `0${workOut[5].value % 60}`
      : workOut[5].value % 60;
  li.append(name, weight, count, set, breakTime);
  box.append(li);
  msgText.innerText = `${workOut[0].value} 운동이 성공적으로 추가 되었습니다.`;
  msgBox.classList.add("show", "success");
  setTimeout(() => {
    msgBox.classList.remove("show", "success");
  }, 3000);
};

const sendWorkOut = async (workOut, day, dayBox) => {
  const response = await axios({
    url: "/api/add-item",
    method: "POST",
    data: {
      day,
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
    addWorkOut(workOut, dayBox);
  } else {
    msgText.innerText = "운동 추가에 실패하였습니다.";
    msgBox.classList.add("show", "error");
    setTimeout(() => {
      msgBox.classList.remove("show", "error");
    }, 3000);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const days = addWorkOutForm.querySelectorAll("#jsDaySelect input");
  const workOut = addWorkOutForm.querySelector("#jsWorkOutInput").children;
  days.forEach((d) => {
    if (d.checked) {
      const day = d.value;
      const dayBox = daysObj[day];
      sendWorkOut(workOut, day, dayBox);
    }
  });
};

function init() {
  addWorkOutForm.addEventListener("submit", handleSubmit);
}

if (addWorkOutForm) {
  init();
}
