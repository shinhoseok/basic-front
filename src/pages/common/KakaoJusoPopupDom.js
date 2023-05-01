import ReactDom from "react-dom";

const KakaoJusoPopupDom = ({ children }) => {
  const el = document.getElementById("popupDom");
  return ReactDom.createPortal(children, el);
};

export default KakaoJusoPopupDom;
