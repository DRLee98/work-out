const profileInput = document.getElementById("profile");
const postImgInput = document.getElementById("postImg");

const profileImg = document.querySelector("img.profile-image");
const postImgList = document.querySelector("ul.post-img-list");

const hideBlock = document.querySelector(".hide-block");

const rightBtn = document.getElementById("post-img-right");
const leftBtn = document.getElementById("post-img-left");

let listX = 0;

function btnView() {
  if (postImgList.scrollWidth > hideBlock.offsetWidth) {
    rightBtn.classList.remove("hide");
    leftBtn.classList.remove("hide");
  } else {
    rightBtn.classList.add("hide");
    leftBtn.classList.add("hide");
  }
}

function preview(file, element) {
  const reader = new FileReader();
  reader.onload = (e) => {
    element.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function profilePreview({ target }) {
  preview(target.files[0], profileImg);
}

function postImgPreview({ target }) {
  const files = target.files;
  const length = files.length;
  const previews = document.querySelectorAll("li.post-img");
  previews.forEach((element) => element.remove());
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      const li = document.createElement("li");
      const previewElement = document.createElement("img");
      const delBtn = document.createElement("button");
      const delIcon = document.createElement("i");
      li.id = files[i].name;
      li.className = "post-img";
      previewElement.className = "post-img-block";
      delBtn.className = "del-btn";
      delIcon.className = "fas fa-minus";
      delBtn.appendChild(delIcon);
      delBtn.addEventListener("click", deletePostFile);
      li.append(previewElement, delBtn);
      postImgList.append(li);
      preview(files[i], previewElement);
    }
  }
  btnView();
}

function deletePostFile({ target }) {
  const { parentElement: li } = target;
  const { files } = postImgInput;
  const list = new DataTransfer();
  for (let i = 0; i < files.length; i++) {
    if (files[i].name !== li.id) {
      list.items.add(files[i]);
    }
  }
  postImgInput.files = list.files;
  li.remove();
  btnView();
}

function rightBtnClick(e) {
  e.preventDefault();
  if (postImgList.scrollWidth > listX * -1 + hideBlock.offsetWidth) {
    listX -= 110;
  }
  postImgList.style.transform = `translateX(${listX}px)`;
}

function leftBtnClick(e) {
  e.preventDefault();
  if (listX < 0) {
    listX += 110;
  }
  postImgList.style.transform = `translateX(${listX}px)`;
}

function init() {
  if (profileInput && profileImg) {
    profileInput.addEventListener("change", profilePreview);
  } else if (postImgInput) {
    postImgInput.addEventListener("change", postImgPreview);
  }
  if (postImgList) {
    btnView();
    rightBtn.addEventListener("click", rightBtnClick);
    leftBtn.addEventListener("click", leftBtnClick);
  }
}

init();
