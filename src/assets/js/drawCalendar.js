const dateText = document.getElementById("jsThisMonth");
const weekBox = document.getElementById("jsWeekBox");

function currentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  return { year, month, date };
}

function setDate(week, year, month, date, day) {
  const dateStr = document.createElement("span");
  const dayElements = week.querySelectorAll("li");
  const li = dayElements[day];
  const { year: cYear, month: cMonth, date: cDate } = currentDate();
  dateStr.innerText = date;
  if (cYear === year && cMonth === month && cDate === date) {
    li.classList.add("today");
  }
  li.id = `${year}${month > 9 ? month : `0${month}`}${
    date > 9 ? date : `0${date}`
  }`;
  li.appendChild(dateStr);
}

function getWeekElement() {
  const ul = document.createElement("ul");
  ul.className = "date-list";
  for (let i = 0; i < 7; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
  }
  return ul;
}

function drawDates(container, year, month) {
  let week = getWeekElement();
  const lastDate = new Date(year, month, 0).getDate();
  for (let i = 1; i <= lastDate; i++) {
    const day = new Date(year, month - 1, i).getDay();
    setDate(week, year, month, i, day);
    if (day === 6) {
      container.appendChild(week);
      week = getWeekElement();
    }
  }
}

function drawCalendars(year, month) {
  dateText.innerText = `${year}.${month}`;
  drawDates(weekBox, year, month);
}

function setCalendar() {
  const { year, month } = currentDate();
  drawCalendars(year, month);
}

if (dateText && weekBox) {
  setCalendar();
}
