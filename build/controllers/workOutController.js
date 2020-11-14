"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangeOrder = exports.postDeleteWorkOut = exports.postEditWorkOut = exports.postEditDay = exports.getEditDay = exports.postAddWorkOut = exports.getAdd = exports.getDayWorkOut = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var _Day = _interopRequireDefault(require("../models/Day"));

var _WorkOut = _interopRequireDefault(require("../models/WorkOut"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getDayWorkOut = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var days;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Day["default"].find({
              creator: req.user.id
            }).populate("workOuts");

          case 2:
            days = _context.sent;
            res.render("dayWorkOut", {
              pageTitle: "요일별 운동",
              days: days
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDayWorkOut(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Add Controller


exports.getDayWorkOut = getDayWorkOut;

var getAdd = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var days;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Day["default"].find({
              creator: req.user.id
            }).populate("workOuts");

          case 2:
            days = _context2.sent;
            res.render("addWorkOut", {
              pageTitle: "운동 추가하기",
              days: days
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAdd(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAdd = getAdd;

var postAddWorkOut = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, name, weight, repsOrHold, count, set, breakTime, day, user, userFindDay, workOutDay, newWorkOut;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, weight = _req$body.weight, repsOrHold = _req$body.repsOrHold, count = _req$body.count, set = _req$body.set, breakTime = _req$body.breakTime, day = _req$body.day;
            _context3.prev = 1;
            _context3.next = 4;
            return _User["default"].findById(req.user.id).populate("days");

          case 4:
            user = _context3.sent;
            userFindDay = user.days.find(function (d) {
              return d.day === day;
            });

            if (userFindDay) {
              _context3.next = 13;
              break;
            }

            _context3.next = 9;
            return _Day["default"].create({
              day: day,
              creator: user.id
            });

          case 9:
            workOutDay = _context3.sent;
            user.days.push(workOutDay.id);
            _context3.next = 16;
            break;

          case 13:
            _context3.next = 15;
            return _Day["default"].findById(userFindDay.id);

          case 15:
            workOutDay = _context3.sent;

          case 16:
            _context3.next = 18;
            return _WorkOut["default"].create({
              name: name,
              weight: weight,
              repsOrHold: repsOrHold,
              count: count,
              set: set,
              breakTime: breakTime,
              creator: user.id,
              day: workOutDay.id
            });

          case 18:
            newWorkOut = _context3.sent;
            workOutDay.workOuts.push(newWorkOut.id);
            user.workOuts.push(newWorkOut.id);
            workOutDay.save();
            user.save();
            req.flash("success", "".concat(name, " \uC6B4\uB3D9\uC774 \uCD94\uAC00 \uB418\uC5C8\uC2B5\uB2C8\uB2E4"));
            _context3.next = 30;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](1);
            res.status(400);
            console.log(_context3.t0);

          case 30:
            _context3.prev = 30;
            res.end();
            return _context3.finish(30);

          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 26, 30, 33]]);
  }));

  return function postAddWorkOut(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Edit Controller


exports.postAddWorkOut = postAddWorkOut;

var getEditDay = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, user, days;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context4.next = 3;
            return _Day["default"].findById(id).populate("workOuts");

          case 3:
            days = _context4.sent;

            if (user.id === days.creator.toString()) {
              res.render("editWorkOut", {
                pageTitle: "운동 수정하기",
                days: days
              });
            } else {
              res.redirect("/work-out".concat(_routes["default"].day));
            }

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getEditDay(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getEditDay = getEditDay;

var postEditDay = function postEditDay(req, res) {};

exports.postEditDay = postEditDay;

var postEditWorkOut = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, name, weight, repsOrHold, count, set, breakTime, day, id, user, workOut;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, weight = _req$body2.weight, repsOrHold = _req$body2.repsOrHold, count = _req$body2.count, set = _req$body2.set, breakTime = _req$body2.breakTime, day = _req$body2.day, id = req.params.id, user = req.user;
            _context5.prev = 1;
            _context5.next = 4;
            return _WorkOut["default"].findById(id);

          case 4:
            workOut = _context5.sent;

            if (!(user.id === workOut.creator.toString())) {
              _context5.next = 11;
              break;
            }

            _context5.next = 8;
            return _WorkOut["default"].findByIdAndUpdate(id, {
              name: name,
              weight: weight,
              repsOrHold: repsOrHold,
              count: count,
              set: set,
              breakTime: breakTime,
              day: day
            });

          case 8:
            req.flash("success", "운동이 성공적으로 수정되었습니다.");
            _context5.next = 12;
            break;

          case 11:
            throw Error;

          case 12:
            _context5.next = 19;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](1);
            req.flash("error", "운동 수정에 실패하였습니다.");
            res.status(400);
            console.log(_context5.t0);

          case 19:
            _context5.prev = 19;
            res.end();
            return _context5.finish(19);

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 14, 19, 22]]);
  }));

  return function postEditWorkOut(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // Delete Controller


exports.postEditWorkOut = postEditWorkOut;

var postDeleteWorkOut = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, user, workOut, _workOut$day, workOuts, dayId, updateUser, updateDay;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context6.prev = 1;
            _context6.next = 4;
            return _WorkOut["default"].findById(id).populate("day");

          case 4:
            workOut = _context6.sent;

            if (!(user.id === workOut.creator.toString())) {
              _context6.next = 18;
              break;
            }

            _workOut$day = workOut.day, workOuts = _workOut$day.workOuts, dayId = _workOut$day.id;
            updateUser = user.workOuts.filter(function (w) {
              return w.toString() !== id;
            });
            updateDay = workOuts.filter(function (w) {
              return w.toString() !== id;
            });
            _context6.next = 11;
            return _User["default"].findByIdAndUpdate(user.id, {
              workOuts: updateUser
            });

          case 11:
            _context6.next = 13;
            return _Day["default"].findByIdAndUpdate(dayId, {
              workOuts: updateDay
            });

          case 13:
            _context6.next = 15;
            return _WorkOut["default"].findByIdAndRemove(id);

          case 15:
            req.flash("success", "운동이 성공적으로 삭제되었습니다.");
            _context6.next = 19;
            break;

          case 18:
            throw Error;

          case 19:
            _context6.next = 26;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](1);
            req.flash("error", "운동 삭제에 실패하였습니다.");
            console.log(_context6.t0);
            res.status(400);

          case 26:
            _context6.prev = 26;
            res.end();
            return _context6.finish(26);

          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 21, 26, 29]]);
  }));

  return function postDeleteWorkOut(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); // Change Order


exports.postDeleteWorkOut = postDeleteWorkOut;

var postChangeOrder = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var workOuts, id, user, day;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            workOuts = req.body.workOuts, id = req.params.id, user = req.user;
            _context7.prev = 1;
            _context7.next = 4;
            return _Day["default"].findById(id);

          case 4:
            day = _context7.sent;

            if (!(user.id === day.creator.toString())) {
              _context7.next = 11;
              break;
            }

            _context7.next = 8;
            return _Day["default"].findByIdAndUpdate(id, {
              workOuts: workOuts
            });

          case 8:
            req.flash("success", "운동 순서가 성공적으로 변경되었습니다.");
            _context7.next = 12;
            break;

          case 11:
            throw Error;

          case 12:
            _context7.next = 19;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](1);
            req.flash("error", "운동 순서 변경을 실패하였습니다.");
            console.log(_context7.t0);
            res.status(400);

          case 19:
            _context7.prev = 19;
            res.end();
            return _context7.finish(19);

          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 14, 19, 22]]);
  }));

  return function postChangeOrder(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postChangeOrder = postChangeOrder;