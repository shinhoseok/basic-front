import React from "react";
import DaumPostcode from "react-daum-postcode";

const KakaoJusoPopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    // console.log(data);
    // console.log(fullAddress);
    // console.log(data.zonecode);
    document.getElementById("addrBasic").value = fullAddress;
    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    left: "30%",
    width: "600px",
    height: "450px",
    padding: "7px",
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="grayBtn L"
      >
        닫기
      </button>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
    </div>
  );
};

export default KakaoJusoPopupPostCode;
