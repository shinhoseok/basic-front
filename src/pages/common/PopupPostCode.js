import React from "react";
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
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
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    props.onClose();
  };

  const dimmed = {
    backgroundColor: "rgb(0 0 0 / 40%)",
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
  };

  const postCodeBoxStyle = {
    position: "absolute",
    top: "15%",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "40px 20px 20px 20px",
    backgroundColor: "#fff",
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    width: "600px",
    height: "500px",
    padding: "7px",
  };

  const postCodeBtnStyle = {
    display: "block",
    position: "absolute",
    top: "8px",
    right: "6px",
    padding: "7px",
    zIndex: "10",
  };

  return (
    <aside style={dimmed}>
      <div style={postCodeBoxStyle}>
        <button
          type="button"
          className="grayBtn M"
          style={postCodeBtnStyle}
          onClick={() => {
            props.onClose();
          }}
        >
          닫기
        </button>
        <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      </div>
    </aside>
  );
};

export default PopupPostCode;
