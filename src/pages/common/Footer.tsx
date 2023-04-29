import "@contents/css/common.css";
import "@contents/css/worksite.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_align">
                <p className="footer_logo"><img src={require('@contents/images/logo2.png')} width="144" height="18" /></p>
                <span className="footer_text">06051 서울시 강남구 논현로 722 신한빌딩 4층  TEL :  02-419-6362  |  FAX : 02-419-6372<br />
                Copyright(C) 2001 ENKISOFT, Inc. All Rights Reserved.<a href="mailto:cpcp@nia.or.kr">webmaster@enkisoft.co.kr</a></span>
            </div>
        </div>
    );
};

export default Footer;