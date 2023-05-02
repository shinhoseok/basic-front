var rval = "";
var timer = null;
checker = function (obj, count, textlimitName) {
  if (rval != obj.value) {
    if (textlimitName && document.getElementById(textlimitName)) {
      document.getElementById(textlimitName).innerHTML = obj.value.bytes();
    }
    rval = obj.value;
  }
  if (obj.value.bytes() > count) {
    alert("최대 " + count + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
    obj.value = obj.value.cut(count, "");
    stopchecker();
  }
  if (textlimitName) {
    timer = setTimeout(function () {
      checker(obj, count, textlimitName);
    }, 10);
  } else {
    timer = setTimeout(function () {
      checker(obj, count);
    }, 10);
  }
};

stopchecker = function () {
  clearTimeout(timer);
  //timer = null;
};

String.prototype.bytes = function () {
  var str = this;
  var l = 0;
  for (var i = 0; i < str.length; i++) l += str.charCodeAt(i) > 128 ? 2 : 1;

  return l;
};

String.prototype.cut = function (len, tail) {
  if (tail == null) {
    tail = "...";
  }
  var str = this;
  var l = 0;
  for (var i = 0; i < str.length; i++) {
    l += str.charCodeAt(i) > 128 ? 2 : 1;
    if (l > len) return str.substring(0, i) + tail;
  }
  return str;
};
