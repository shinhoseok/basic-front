import "@contents/css/common.css";
import "@contents/css/worksite.css";

const LeftMenu = () => {
    return (
        <div className="sub_leftMenu">
            <h3>사용자관리</h3>
            <ul className="menuBox">
                <li className="bigMenu"><a href="#">사용자관리</a>
                    <div className="subMenu">
                        <ul>
                            <li className="selectsubMenu"><a href="#">권한그룹 관리</a></li>
                            <li className="selectsubMenu"><a href="#">사용자관리</a></li>
                            <li className="smallMenu"><a href="#">메뉴2</a></li>                       	
                        </ul>
                    </div>                    
                </li>
                <li className="bigMenu"><a href="#">대메뉴2</a></li>                      
            </ul>
        </div>	
    );
};
export default LeftMenu;