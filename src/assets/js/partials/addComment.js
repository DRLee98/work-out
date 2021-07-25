import axios from "axios";
import routes from "../../../routes";
import { handleReplyFormSubmit } from "./addReply";
import { handleViewReply } from "./viewReply";

const addCommentForm = document.getElementById("jsCommentForm");
const commentCount = document.getElementById("jsCommentCount");
const commentList = document.querySelector(".comment-list");

function createAvatar(creator) {
  const imgUrl = creator.avatarUrl;
  const img = document.createElement("img");
  img.className = "profile-image";
  img.src = imgUrl ? imgUrl : "/static/images/profile.png";

  return img;
}

function createReplyBox(creator) {
  const replyBox = document.createElement("div");
  const repliesList = document.createElement("ul");
  const form = document.createElement("form");
  const contentsInput = document.createElement("input");
  const submitInput = document.createElement("input");
  const img = createAvatar(creator);
  contentsInput.type = "text";
  contentsInput.name = "contents";
  submitInput.type = "submit";
  submitInput.value = "답글 달기";
  form.className = "reply-form";
  form.append(img, contentsInput, submitInput);
  form.addEventListener("submit", handleReplyFormSubmit);
  repliesList.className = "replies-list";
  replyBox.className = "reply-box";
  replyBox.append(form, repliesList);

  return replyBox;
}

function addComment(comment) {
  const li = document.createElement("li");
  const commentBox = document.createElement("div");
  const contentsBlock = document.createElement("div");
  const name = document.createElement("span");
  const contents = document.createElement("p");
  const createdAt = document.createElement("small");
  const viewBtn = document.createElement("button");
  const img = createAvatar(comment.creator);
  const replyBox = createReplyBox(comment.creator);
  contents.innerText = comment.contents;
  createdAt.innerText = new Date(comment.createdAt).toLocaleString("ko-KR", {
    hour12: true,
  });
  name.innerText = comment.creator.name;
  name.appendChild(createdAt);
  viewBtn.className = "reply-view-btn";
  viewBtn.innerText = "답글 숨기기";
  viewBtn.addEventListener("click", handleViewReply);
  contentsBlock.className = "comment-contents";
  contentsBlock.append(name, contents, viewBtn);
  commentBox.className = "comment-box";
  commentBox.append(img, contentsBlock);
  li.append(commentBox, replyBox);
  li.dataset.id = comment._id;
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
