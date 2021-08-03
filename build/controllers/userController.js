"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postGetCompleteDate = exports.postAddCompleteDate = exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.logout = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var _req$body, name, email, password, password2, file, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2, file = req.file;
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
            res.redirect("/join");
            _context.next = 28;
            break;

          case 10:
            if (!user) {
              _context.next = 16;
              break;
            }

            req.flash("error", "이미 가입된 이메일입니다.");
            res.status(400);
            res.redirect("/join");
            _context.next = 28;
            break;

          case 16:
            _context.prev = 16;
            _context.next = 19;
            return (0, _User["default"])(_objectSpread({
              name: name,
              email: email
            }, file && {
              avatarUrl: file.location
            }));

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
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findById(id);

          case 4:
            user = _context2.sent;
            console.log(user);
            res.render("userDetail", {
              pageTitle: "회원정보",
              user: user
            });
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.redirect(_routes["default"].home);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function userDetail(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _User["default"].findById(id);

          case 3:
            user = _context3.sent;

            try {
              res.render("editProfile", {
                pageTitle: "회원정보 수정",
                user: user
              });
            } catch (error) {
              console.log(error);
              res.redirect(_routes["default"].home);
            }

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getEditProfile(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _req$body2, name, oldPassword, newPassword, newPassword2, file;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, name = _req$body2.name, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword, newPassword2 = _req$body2.newPassword2, file = req.file;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findByIdAndUpdate(id, _objectSpread(_objectSpread({}, name && {
              name: name
            }), file && {
              avatarUrl: file.location
            }));

          case 4:
            if (!(oldPassword && newPassword && newPassword2)) {
              _context4.next = 11;
              break;
            }

            if (!(newPassword !== newPassword2)) {
              _context4.next = 9;
              break;
            }

            req.flash("error", "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            res.status(400);
            return _context4.abrupt("return", res.redirect("/users/".concat(id, "/edit-profile")));

          case 9:
            _context4.next = 11;
            return req.user.changePassword(oldPassword, newPassword);

          case 11:
            req.flash("success", "회원정보가 성공적으로 변경되었습니다!");
            return _context4.abrupt("return", res.redirect("/users/".concat(id)));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](1);
            req.flash("error", "기존 비밀번호가 일치하지 않습니다.");
            res.status(400);
            return _context4.abrupt("return", res.redirect("/users/".concat(id, "/edit-profile")));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 15]]);
  }));

  return function postEditProfile(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  res.render("changePassword", {
    pageTitle: "비밀번호 변경"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword2;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword2 = _req$body3.newPassword2;
            _context5.prev = 1;

            if (!(newPassword !== newPassword2)) {
              _context5.next = 6;
              break;
            }

            req.flash("error", "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            res.status(400);
            return _context5.abrupt("return", res.redirect("/users/".concat(_routes["default"].changePassword)));

          case 6:
            _context5.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            _context5.next = 15;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            req.flash("error", "기존 비밀번호가 일치하지 않습니다.");
            res.status(400);
            return _context5.abrupt("return", res.redirect("/users/".concat(_routes["default"].changePassword)));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 10]]);
  }));

  return function postChangePassword(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var postAddCompleteDate = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, user, year, month, date, completeDate, existDate;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.user.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findById(id);

          case 4:
            user = _context6.sent;
            year = new Date().getFullYear();
            month = new Date().getMonth() + 1;
            date = new Date().getDate();
            completeDate = {
              year: year,
              month: month,
              date: date
            };
            console.log(completeDate);
            existDate = user.completeDates.find(function (findDate) {
              return findDate.year === year && findDate.month === month && findDate.date === date;
            });

            if (!existDate) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt("return");

          case 13:
            user.completeDates.push(completeDate);
            _context6.next = 16;
            return user.save();

          case 16:
            console.log(user);
            _context6.next = 23;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](1);
            res.status(400).json(_context6.t0);
            console.log(_context6.t0);

          case 23:
            _context6.prev = 23;
            res.end();
            return _context6.finish(23);

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 19, 23, 26]]);
  }));

  return function postAddCompleteDate(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postAddCompleteDate = postAddCompleteDate;

var postGetCompleteDate = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body4, year, month, onlyThisMonth, id, user, dateObj;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body4 = req.body, year = _req$body4.year, month = _req$body4.month, onlyThisMonth = _req$body4.onlyThisMonth, id = req.user.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _User["default"].findById(id);

          case 4:
            user = _context7.sent;

            if (onlyThisMonth) {
              dateObj = user.completeDates.filter(function (findDate) {
                return findDate.year === +year && findDate.month === +month;
              });
            } else {
              dateObj = user.completeDates.filter(function (findDate) {
                return findDate.year === +year && findDate.month >= +month - 1 && findDate.month <= +month + 1;
              });
            }

            res.json(dateObj);
            _context7.next = 14;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](1);
            res.status(400);
            res.json(_context7.t0);
            console.log(_context7.t0);

          case 14:
            _context7.prev = 14;
            res.end();
            return _context7.finish(14);

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 9, 14, 17]]);
  }));

  return function postGetCompleteDate(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postGetCompleteDate = postGetCompleteDate;