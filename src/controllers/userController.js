import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "회원가입" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
    file,
  } = req;
  let user = await User.findOne({ email });
  if (password !== password2) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    res.status(400);
    res.render("join", { pageTitle: "회원가입" });
  } else if (user) {
    req.flash("error", "이미 가입된 이메일입니다.");
    res.status(400);
    res.render("join", { pageTitle: "회원가입" });
  } else {
    try {
      user = await User({
        name,
        email,
        ...(file && { avatarUrl: file.location }),
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
  successFlash: "운동일지에 오신걸 환영합니다!",
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    console.log(user);
    res.render("userDetail", { pageTitle: "회원정보", user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditProfile = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  try {
    res.render("editProfile", { pageTitle: "회원정보 수정", user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditProfile = async (req, res) => {
  const {
    params: { id },
    body: { name, oldPassword, newPassword, newPassword2 },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(id, {
      ...(name && { name }),
      ...(file && { avatarUrl: file.location }),
    });
    if (oldPassword && newPassword && newPassword2) {
      if (newPassword !== newPassword2) {
        req.flash(
          "error",
          "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.",
        );
        res.status(400);
        return res.redirect(`/users/${id}/edit-profile`);
      }
      await req.user.changePassword(oldPassword, newPassword);
    }
    return res.redirect(`/users/${id}`);
  } catch (error) {
    req.flash("error", "기존 비밀번호가 일치하지 않습니다.");
    res.status(400);
    return res.redirect(`/users/${id}/edit-profile`);
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "비밀번호 변경" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  try {
    if (newPassword !== newPassword2) {
      req.flash("error", "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      res.status(400);
      return res.redirect(`/users/${routes.changePassword}`);
    }
    await req.user.changePassword(oldPassword, newPassword);
  } catch (error) {
    req.flash("error", "기존 비밀번호가 일치하지 않습니다.");
    res.status(400);
    return res.redirect(`/users/${routes.changePassword}`);
  }
};

export const postAddCompleteDate = async (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    const user = await User.findById(id);
    user.completeDates = [];
    const dateList = new Date().toLocaleDateString().split("-");
    const [year, month, date] = dateList.map((item) => parseInt(item));
    const completeDate = { year, month, date };
    console.log(dateList);
    console.log(completeDate);
    const existDate = user.completeDates.find(
      (findDate) =>
        findDate.year === year &&
        findDate.month === month &&
        findDate.date === date,
    );
    if (existDate) {
      return;
    }
    user.completeDates.push(completeDate);
    await user.save();
    console.log(user);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  } finally {
    res.end();
  }
};

export const postGetCompleteDate = async (req, res) => {
  const {
    body: { year, month },
    user: { id },
  } = req;
  try {
    const user = await User.findById(id);
    const findDateObj = user.completeDates.find(
      (findDate) => findDate.year === year && findDate.month === month,
    );
    const dates = [];
    findDateObj.forEach((dateObj) => {
      dates.push(dateObj.date);
    });
    res.json(dates);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};
