import "@contents/css/common.css";
import "@contents/css/worksite.css";

const Top = () => {
    return (
        <div className="header">      
        <div className="header_centerBox">
            <h1><img src={require('@contents/images/logo.png')} width="143" height="19" /></h1>
            <div className="lnb">
            	<dl>
                	<dt className="hidden">로그인, 로그아웃, 사이트맵 , 설정이 들어가는 자리입니다.</dt>
                    <dd>엔키관리자님 환영합니다.</dd>
                    <dd><a href="#" className="lbtn">로그아웃</a></dd>
                    <dd className="lbar"><img src={require('@contents/images/lnb_bar.gif')} width="1" height="10" /></dd>
                    <dd><a href="#">사이트맵</a></dd>
                    <dd className="lbar"><img src={require('@contents/images/lnb_bar.gif')} width="1" height="10" /></dd>
                    <dd><a href="#">설정</a></dd>
              </dl>
            </div>
            
            <div className="gnbWrap">
                <div id="menuArea">
                    <ul id="navi">
                        <li id="menu" className="selectMenu"><a href="#">사용자관리</a></li>
                        <li id="menu"><a href="#">포탈관리</a></li>
                        <li id="menu"><a href="#">게시판관리</a></li>
                        <li id="menu"><a href="#">설문관리</a></li>
                    </ul>
                </div>
            </div>                  
        </div>
    </div>
    );
};

export default Top;