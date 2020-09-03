(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessageNotif = handleMessageNotif;

function handleMessageNotif(data) {
  var message = data.message,
      nickname = data.nickname;
  console.log("".concat(nickname, ": ").concat(message));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsiaGFuZGxlTWVzc2FnZU5vdGlmIiwiZGF0YSIsIm1lc3NhZ2UiLCJuaWNrbmFtZSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxTQUFTQSxrQkFBVCxDQUE0QkMsSUFBNUIsRUFBa0M7QUFBQSxNQUM3QkMsT0FENkIsR0FDUEQsSUFETyxDQUM3QkMsT0FENkI7QUFBQSxNQUNwQkMsUUFEb0IsR0FDUEYsSUFETyxDQUNwQkUsUUFEb0I7QUFFckNDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixXQUFlRixRQUFmLGVBQTRCRCxPQUE1QjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2VOb3RpZihkYXRhKSB7XHJcbiAgICBjb25zdCB7IG1lc3NhZ2UsIG5pY2tuYW1lIH0gPSBkYXRhO1xyXG4gICAgY29uc29sZS5sb2coYCR7bmlja25hbWV9OiAke21lc3NhZ2V9YCk7XHJcbn1cclxuIl19
},{}],2:[function(require,module,exports){
"use strict";

var _chat = require("./chat");

console.log("hi");
var socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", {
    message: message
  });
  console.log("You:".concat(message));
}

function setNickname(nickname) {
  socket.emit("setNickname", {
    nickname: nickname
  });
}

socket.on("messageNotif", _chat.handleMessageNotif);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYzlhMTc4YjguanMiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsInNvY2tldCIsImlvIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiZW1pdCIsInNldE5pY2tuYW1lIiwibmlja25hbWUiLCJvbiIsImhhbmRsZU1lc3NhZ2VOb3RpZiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQUVBLElBQU1DLE1BQU0sR0FBR0MsRUFBRSxDQUFDLEdBQUQsQ0FBakI7O0FBRUEsU0FBU0MsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFDMUJILEVBQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLFlBQVosRUFBMEI7QUFBRUQsSUFBQUEsT0FBTyxFQUFQQTtBQUFGLEdBQTFCO0FBQ0FMLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixlQUFtQkksT0FBbkI7QUFDSDs7QUFFRCxTQUFTRSxXQUFULENBQXFCQyxRQUFyQixFQUErQjtBQUMzQk4sRUFBQUEsTUFBTSxDQUFDSSxJQUFQLENBQVksYUFBWixFQUEyQjtBQUFFRSxJQUFBQSxRQUFRLEVBQVJBO0FBQUYsR0FBM0I7QUFDSDs7QUFFRE4sTUFBTSxDQUFDTyxFQUFQLENBQVUsY0FBVixFQUEwQkMsd0JBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGFuZGxlTWVzc2FnZU5vdGlmIH0gZnJvbSBcIi4vY2hhdFwiO1xyXG5jb25zb2xlLmxvZyhcImhpXCIpO1xyXG5cclxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xyXG5cclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgc29ja2V0LmVtaXQoXCJuZXdNZXNzYWdlXCIsIHsgbWVzc2FnZSB9KTtcclxuICAgIGNvbnNvbGUubG9nKGBZb3U6JHttZXNzYWdlfWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXROaWNrbmFtZShuaWNrbmFtZSkge1xyXG4gICAgc29ja2V0LmVtaXQoXCJzZXROaWNrbmFtZVwiLCB7IG5pY2tuYW1lIH0pO1xyXG59XHJcblxyXG5zb2NrZXQub24oXCJtZXNzYWdlTm90aWZcIiwgaGFuZGxlTWVzc2FnZU5vdGlmKTtcclxuIl19
},{"./chat":1}]},{},[2])