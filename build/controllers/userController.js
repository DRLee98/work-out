"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.editProfile = exports.userDetail = exports.logout = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render("join", {
    pageTitle: "회원가입"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;
            _context.next = 3;
            return _User["default"].findOne({
              email: email
            });

          case 3:
            user = _context.sent;

            if (!(password !== password2)) {
              _context.next = 10;
              break;
            }

            req.flash("error", "비밀번호가 일치하지 않습니다.");
            res.status(400);
            res.render("join", {
              pageTitle: "회원가입"
            });
            _context.next = 28;
            break;

          case 10:
            if (!user) {
              _context.next = 16;
              break;
            }

            req.flash("error", "이미 가입된 이메일입니다.");
            res.status(400);
            res.render("join", {
              pageTitle: "회원가입"
            });
            _context.next = 28;
            break;

          case 16:
            _context.prev = 16;
            _context.next = 19;
            return (0, _User["default"])({
              name: name,
              email: email
            });

          case 19:
            user = _context.sent;
            _context.next = 22;
            return _User["default"].register(user, password);

          case 22:
            next();
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](16);
            console.log(_context.t0);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[16, 25]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render("login", {
    pageTitle: "로그인"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  successRedirect: _routes["default"].home,
  failureRedirect: _routes["default"].login,
  failureFlash: "이메일 또는 비밀번호를 확인해 주세요.",
  successFlash: "운동일지에 오신걸 환영합니다!"
});

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var userDetail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.user.id;
            _context2.next = 3;
            return _User["default"].findById(id);

          case 3:
            user = _context2.sent;

            try {
              res.render("userDetail", {
                pageTitle: "회원정보",
                user: user
              });
            } catch (error) {
              console.log(error);
              res.redirect(_routes["default"].home);
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function userDetail(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var editProfile = function editProfile(req, res) {
  res.render("editProfile", {
    pageTitle: "회원정보 수정"
  });
};

exports.editProfile = editProfile;

var getChangePassword = function getChangePassword(req, res) {
  res.render("changePassword", {
    pageTitle: "비밀번호 변경"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, oldPassword, newPassword, newPassword2;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword, newPassword2 = _req$body2.newPassword2;
            _context3.prev = 1;

            if (!(newPassword !== newPassword2)) {
              _context3.next = 6;
              break;
            }

            req.flash("error", "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            res.status(400);
            return _context3.abrupt("return", res.redirect("/users/".concat(_routes["default"].changePassword)));

          case 6:
            _context3.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            _context3.next = 15;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            req.flash("error", "기존 비밀번호가 일치하지 않습니다.");
            res.status(400);
            return _context3.abrupt("return", res.redirect("/users/".concat(_routes["default"].changePassword)));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function postChangePassword(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;