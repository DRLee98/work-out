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
    res.status(400);
    res.render("join", {
      pageTitle: "회원가입",
      passwordError: "비밀번호가 일치하지 않습니다.",
    });
  } else if(user) {
    res.status(400);
    res.render("join", {
      pageTitle: "회원가입",
      emailError: "이미 가입된 이메일입니다.",
    });
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
  const error = req.flash().error
  res.render("login", { pageTitle: "로그인", error });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
  failureFlash: true
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const { user: {id} } =req
  const user = await User.findById({_id: id})
  res.render("userDetail", { pageTitle: "회원정보", user});
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
      res.status(400);
      return res.render("changePassword", { pageTitle: "비밀번호 변경", error: "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다." });
    }
    await req.user.changePassword(oldPassword, newPassword);
  }catch(error){
    res.status(400);
    return res.render("changePassword", { pageTitle: "비밀번호 변경", error: "기존 비밀번호가 일치하지 않습니다." });
  }
}