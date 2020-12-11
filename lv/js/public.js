"use strict";

function setCookie(key, value, expires) {
  if (!expires) return document.cookie = key + '=' + value;
  var time = new Date();
  time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires);
  document.cookie = "".concat(key, "=").concat(value, ";expires=") + time;
}

function getCookie(key) {
  var obj = {};
  var tmp = document.cookie.split('; ');
  tmp.forEach(function (item) {
    var t = item.split('=');
    obj[t[0]] = t[1];
  });
  return key ? obj[key] : obj;
}