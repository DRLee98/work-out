import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "회원가입" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  let user = await User.findOne({email})
  if (password !== password2) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    res.status(400);
    res.render("join", { pageTitle: "회원가입" });
  } else if(user) {
    req.flash("error", "이미 가입된 이메일입니다.");
    res.status(400);
    res.render("join", { pageTitle: "회원가입" });
  } else {
    try {
      user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "로그인" });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
  failureFlash: "이메일 또는 비밀번호를 확인해 주세요.",
  successFlash: "운동일지에 오신걸 환영합니다!"
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const { user: {id} } =req
  const user = await User.findById(id)
  try{
    res.render("userDetail", { pageTitle: "회원정보", user});
  } catch(error){
    console.log(error)
    res.redirect(routes.home)
  }
};

export const editProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "회원정보 수정" });
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "비밀번호 변경" });
};

export const  postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 }
  } = req;
  try{
    if(newPassword !== newPassword2){
      req.flash("error", "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      res.status(400);
      return res.redirect(`/users/${routes.changePassword}`);
    }
    await req.user.changePassword(oldPassword, newPassword);
  }catch(error){
    req.flash("error", "기존 비밀번호가 일치하지 않습니다.");
    res.status(400);
    return res.redirect(`/users/${routes.changePassword}`);
  }
}