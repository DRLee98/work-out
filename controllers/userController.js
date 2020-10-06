export const userDetail = (req, res) => {
    res.render("userDetail", { pageTitle : "회원정보" });
};

export const editProfile = (req, res) => {
    res.render("editProfile", { pageTitle : "회원정보 수정" });
};

export const changePassword = (req, res) => {
    res.render("changePassword", { pageTitle : "비밀번호 변경" });
};