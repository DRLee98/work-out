const viewBtns = document.querySelectorAll(".reply-view-btn");

export function handleViewReply(e) {
  const btn = e.target;
  const parent = e.path[3];
  const target = parent.querySelector(".reply-box");
  const isHide = target.classList.contains("hide");
  if (isHide) {
    target.classList.remove("hide");
    btn.innerText = "답글 숨기기";
  } else {
    target.classList.add("hide");
    btn.innerText = "답글 보기";
  }
}

if (viewBtns) {
  viewBtns.forEach((viewBtn) =>
    viewBtn.addEventListener("click", handleViewReply),
  );
}
