import axios from "axios";
import routes from "../../../routes";

const replyForms = document.querySelectorAll(".reply-form");

function addReply(parent, reply) {
  const repliesList = parent.querySelector("ul");
  const imgUrl = reply.creator.avatarUrl;
  const li = document.createElement("li");
  const img = document.createElement("img");
  const contentsBlock = document.createElement("div");
  const name = document.createElement("span");
  const contents = document.createElement("p");
  const createdAt = document.createElement("small");
  img.className = "profile-image";
  img.src = imgUrl ? imgUrl : "/static/images/profile.png";
  name.innerText = reply.creator.name;
  contents.innerText = reply.contents;
  createdAt.innerText = new Date(reply.createdAt).toLocaleString("ko-KR", {
    hour12: true,
  });
  name.appendChild(createdAt);
  contentsBlock.className = "reply-contents";
  contentsBlock.append(name, contents);
  li.append(img, contentsBlock);
  li.dataset.id = reply._id;
  repliesList.prepend(li);
}

export async function handleReplyFormSubmit(e) {
  e.preventDefault();
  const li = e.path[2];
  const replyId = li.dataset.id;
  const contents = e.target.querySelector("input[type='text']").value;
  const response = await axios({
    url: routes.addReply(replyId),
    method: "POST",
    data: {
      contents,
    },
  });
  if (response.status === 200) {
    console.log("add reply");
    const reply = response.data;
    addReply(li, reply);
  }
}

function init() {
  replyForms.forEach((replyForm) =>
    replyForm.addEventListener("submit", handleReplyFormSubmit),
  );
}

if (replyForms) {
  init();
}
