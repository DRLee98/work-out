import axios from "axios";
import routes from "../../routes";

const addCommentForm = document.getElementById("jsCommentForm");
const commentCount = document.getElementById("jsCommentCount");
const commentList = document.querySelector(".comment-list");

function formatNum(num) {
  return num > 10 ? num : `0${num}`;
}

function addComment(comment) {
  const imgUrl = comment.creator.avatarUrl;
  const date = new Date(comment.createdAt);
  const li = document.createElement("li");
  const img = document.createElement("img");
  const contentsBlock = document.createElement("div");
  const name = document.createElement("span");
  const contents = document.createElement("p");
  const createdAt = document.createElement("small");
  img.className = "profile-image";
  contentsBlock.className = "comment-contents";
  img.src = imgUrl ? imgUrl : "/static/images/profile.png";
  name.innerText = comment.creator.name;
  contents.innerText = comment.contents;
  createdAt.innerText = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${formatNum(date.getHours())}:${formatNum(
    date.getMinutes(),
  )}:${formatNum(date.getSeconds())}`;
  contentsBlock.append(name, contents, createdAt);
  li.append(img, contentsBlock);
  commentList.prepend(li);
  const count = parseInt(commentCount.innerText);
  commentCount.innerText = count + 1;
}

async function handleSubmit(e) {
  e.preventDefault();
  const id = location.pathname.split("/")[2];
  const contents = addCommentForm.querySelector("#jsContentsInput").value;
  const response = await axios({
    url: routes.addComment(id),
    method: "POST",
    data: {
      contents,
    },
  });
  if (response.status === 200) {
    console.log("add comment");
    const comment = response.data;
    addComment(comment);
  }
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
