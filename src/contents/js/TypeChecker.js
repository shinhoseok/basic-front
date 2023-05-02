String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/gi, "");
};

//여백제거
// const trim = function (str) {
//   str = str.replace(/(^\s*)|(\s*$)/gi, "");
//   return str;
// };

/*******************************************************************************
 * FUNCTION 명 : 값의 타입을 체크
 * 사용 방법 :
 * 	TypeChecker.number("1234"); --> true
 *  TypeChecker.number("abcd"); --> false
 ******************************************************************************/
const TypeChecker = (function () {
  let alpha = /[^a-zA-Z]/;
  let prgoramUrl = /[^a-zA-Z0-9.&=?\/]/;
  let number = /^-?[0-9]+(,[0-9]+)?(\.[0-9]+)?$/;
  let email = /^(\w+)([-+.][\w]+)*@(\w[-\w]*\.){1,5}([A-Za-z]){2,4}$/;
  let url =
    /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
  let date = /^[0-9]{4}(-|\.)?[0-9]{2}(-|\.)?[0-3][0-9]$/;
  //let stdTm = /^[0-9]{4}(-|\.)?[0-9]{2}(-|\.)?[0-3][0-9].[0-2][0-9].[0-5][0-9]$/;
  let year = /^[0-9]{4}$/;
  let ipAddress = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  let alphanum = /[^a-zA-Z0-9]/;
  let roldeCode = /[^a-zA-Z0-9_]/;
  let phone = /^\d{3}-\d{3,4}-\d{4}$/;
  let usrid = /[^a-z0-9]/; //I
  let bannerUrl =
    /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
  let boardInfoId = /[^a-z]/;
  let korEng = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
  let programUrl = /^\/[\w]+\/[arwz]\/[tnm]\/[\w]+\.do$/;

  return {
    usrid: function (v) {
      if (v.trim() == "") return true;
      return !usrid.test(v);
    },
    usridText: "영문 소문자및, 숫자만 사용할 수 있습니다.",

    prgoramUrl: function (v) {
      if (v.trim() == "") return true;
      return !prgoramUrl.test(v);
    },
    prgoramUrlText:
      "개발 프로그램용 소스URL 형태만 가능합니다.\n(/변수명/권한/메뉴구분/*.do)",

    roldeCode: function (v) {
      if (v.trim() == "") return true;
      return !roldeCode.test(v);
    },
    roldeCodeText: "영문, 숫자 및 _기호만 가능합니다",

    required: function (v) {
      return v.trim() != "";
    },
    requiredText: "반드시 입력해야 합니다.",

    email: function (v) {
      if (v.trim() == "") return true;
      return email.test(v);
    },
    emailText: "Email 형식만 가능합니다. 예)user@example.com",
    emailMask: /[a-z0-9_\.\-@]/i,

    url: function (v) {
      if (v.trim() == "") return true;
      return url.test(v);
    },
    urlText: "URL 형식만 가능합니다. 예)http://www.example.com",

    alpha: function (v) {
      if (v.trim() == "") return true;
      return !alpha.test(v);
    },
    alphaText: "알파벳만 가능합니다.",
    alphaMask: /[a-z_]/i,

    alphanum: function (v) {
      if (v.trim() == "") return true;
      return !alphanum.test(v);
    },
    alphanumText: "알파벳과 숫자만 가능합니다.",
    alphanumMask: /[a-z0-9_]/i,

    number: function (v) {
      if (v.trim() == "") return true;
      return number.test(v);
    },
    numberText: "숫자만 가능합니다.",
    numberMask: /^-?[0-9]+,?[0-9]+\.?[0-9]+$/i,

    date: function (v) {
      if (v.trim() == "") return true;
      return date.test(v);
    },
    dateText: "날짜만 가능합니다. 예)2009.01.01",
    dateMask: /^[0-9]{4}(-|\.)?[0-9]{2}(-|\.)?[0-3][0-9]$/,

    year: function (v) {
      if (v.trim() == "") return true;
      return year.test(v);
    },
    yearText: "년도만 가능합니다. 예)2010",
    yearMask: /^[0-9]{4}$/,

    ipAddress: function (v) {
      if (v.trim() == "") return true;
      return ipAddress.test(v);
    },
    ipText: "IP주소만 가능합니다.",
    ipMask: /[\d\.]/i,

    phone: function (v) {
      if (v.trim() == "") return true;
      return phone.test(v);
    },
    phoneText: "핸드폰 형식만 가능합니다.",

    bannerUrl: function (v) {
      if (v.trim() == "") return true;
      return bannerUrl.test(v);
    },
    bannerUrlText: "URL 형태만 가능합니다. 예)http://www.example.com",

    boardInfoId: function (v) {
      if (v.trim() == "") return true;
      return !boardInfoId.test(v);
    },
    boardInfoIdText: "영문소문자만 가능합니다.",

    korEng: function (v) {
      if (v.trim() == "") return true;
      return korEng.test(v);
    },
    korEngText: "한글 영문만 사용할 수 있습니다.",

    programUrl: function (v) {
      if (v.trim() == "") {
        return true;
      }
      return programUrl.test(v);
    },
    programUrlText:
      "개발 프로그램용 소스URL 형태만 가능합니다.\n- /변수명/권한/메뉴구분/*.do\n- 변수명: 알파벳 및 숫자\n- 권한: a, r, w, z\n- 메뉴구분: m, n, t",
  };
})();

export default TypeChecker;
