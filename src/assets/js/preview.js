const profileInput = document.getElementById("profile");
const postImgInput = document.getElementById("postImg");

const profileImg = document.querySelector("img.profile-image");
const previewList = document.querySelector("ul.preview-list");

const hideBlock = document.querySelector(".hide-block");

const rightBtn = document.getElementById("preview-right");
const leftBtn = document.getElementById("preview-left");

let listX = 0;

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
  const length = target.files.length;
  const previews = document.querySelectorAll("li.preview");
  previews.forEach((element) => element.remove());
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      const li = document.createElement("li");
      const previewElement = document.createElement("img");
      li.className = "preview";
      previewElement.className = "preview-block";
      li.append(previewElement);
      previewList.append(li);
      preview(target.files[i], previewElement);
    }
  }
  if (previewList.scrollWidth > hideBlock.offsetWidth) {
    rightBtn.classList.remove("hide");
    leftBtn.classList.remove("hide");
  } else {
    rightBtn.classList.add("hide");
    leftBtn.classList.add("hide");
  }
}

function rightBtnClick(e) {
  e.preventDefault();
  if (previewList.scrollWidth > listX * -1 + hideBlock.offsetWidth) {
    listX -= 110;
  }
  previewList.style.transform = `translateX(${listX}px)`;
}

function leftBtnClick(e) {
  e.preventDefault();
  if (listX < 0) {
    listX += 110;
  }
  previewList.style.transform = `translateX(${listX}px)`;
}

function init() {
  if (profileInput && profileImg) {
    profileInput.addEventListener("change", profilePreview);
  } else if (postImgInput) {
    postImgInput.addEventListener("change", postImgPreview);
    rightBtn.addEventListener("click", rightBtnClick);
    leftBtn.addEventListener("click", leftBtnClick);
  }
}

init();
