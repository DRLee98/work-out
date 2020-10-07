export const getAddWorkOut = (req, res) => {
  res.render("addWorkOut", { pageTitle: "운동 추가하기" });
};

export const postAddWorkOut = (req, res) => {
  const { body } = req;
  console.log(body);
};

export const editWorkOut = (req, res) => {
  res.render("editWorkOut", { pageTitle: "운동 수정하기" });
};

export const deleteWorkOut = (req, res) => {
  //운동 삭제
};
