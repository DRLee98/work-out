"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCalendar = exports.search = exports.home = void 0;

var _Day = _interopRequireDefault(require("../models/Day"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var days;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            days = null;

            if (!req.user) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return _Day["default"].find({
              creator: req.user.id
            }).populate("workOuts");

          case 4:
            days = _context.sent;

          case 5:
            res.render("home", {
              days: days
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = function search(req, res) {
  res.render("search");
};

exports.search = search;

var getCalendar = function getCalendar(req, res) {
  res.render("calendar", {
    pageTitle: "달력"
  });
};

exports.getCalendar = getCalendar;