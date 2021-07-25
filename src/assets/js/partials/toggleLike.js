import axios from "axios";
import routes from "../../../routes";

const likeBtn = document.getElementById("jsLikeBtn");
const likeCount = document.getElementById("jsLikeCount");

function toggleLike(isLiked) {
  let count = parseInt(likeCount.innerText);
  if (isLiked) {
    likeBtn.classList.add("liked");
    count += 1;
  } else {
    likeBtn.classList.remove("liked");
    count -= 1;
  }
  likeCount.innerText = count;
}

async function handleClick() {
  console.log("like click");
  const id = location.pathname.split("/")[2];
  const response = await axios({
    url: routes.likePost(id),
    method: "POST",
  });
  if (response.status === 200) {
    const isLiked = response.data;
    toggleLike(isLiked);
  }
}

function init() {
  likeBtn.addEventListener("click", handleClick);
}

if (likeBtn) {
  init();
}
