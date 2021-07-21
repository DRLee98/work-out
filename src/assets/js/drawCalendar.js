const viewBox = document.getElementById("jsViewContainer");
const dateText = document.getElementById("jsThisMonth");
const weekBox = document.getElementById("jsWeekBox");
const prevDateText = document.getElementById("jsPrevMonth");
const prevWeekBox = document.getElementById("jsPrevWeekBox");
const prevBtn = document.getElementById("jsCalendarPrev");
const nextDateText = document.getElementById("jsNextMonth");
const nextWeekBox = document.getElementById("jsNextWeekBox");
const nextBtn = document.getElementById("jsCalendarNext");

function currentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  return { year, month, date };
}

function formatDate(year, month) {
  const formatDate = new Date(year, month - 1);
  const formatYear = formatDate.getFullYear();
  const formatMonth = formatDate.getMonth() + 1;
  return { formatYear, formatMonth };
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

function drawDates(container, textElement, year, month) {
  container.replaceChildren();
  textElement.innerText = `${year}.${month}`;
  let week = getWeekElement();
  const lastDate = new Date(year, month, 0).getDate();
  for (let i = 1; i <= lastDate; i++) {
    const day = new Date(year, month - 1, i).getDay();
    setDate(week, year, month, i, day);
    if (day === 6 || i === lastDate) {
      container.appendChild(week);
      week = getWeekElement();
    }
  }
}

function drawCalendars(year, month) {
  const { formatYear: prevYear, formatMonth: prevMonth } = formatDate(
    year,
    month - 1,
  );
  const { formatYear: nextYear, formatMonth: nextMonth } = formatDate(
    year,
    month + 1,
  );
  drawDates(weekBox, dateText, year, month);
  drawDates(prevWeekBox, prevDateText, prevYear, prevMonth);
  drawDates(nextWeekBox, nextDateText, nextYear, nextMonth);
}

function prevMonth() {
  viewBox.classList.add("prev");
  setTimeout(() => {
    const [year, month] = prevDateText.innerText.split(".");
    drawCalendars(+year, +month);
    viewBox.classList.remove("prev");
  }, 300);
}

function nextMonth() {
  viewBox.classList.add("next");
  setTimeout(() => {
    const [year, month] = nextDateText.innerText.split(".");
    drawCalendars(+year, +month);
    viewBox.classList.remove("next");
  }, 300);
}

function setCalendar() {
  const { year, month } = currentDate();
  drawCalendars(year, month);
  prevBtn.addEventListener("click", prevMonth);
  nextBtn.addEventListener("click", nextMonth);
}

if (dateText && weekBox) {
  setCalendar();
}
