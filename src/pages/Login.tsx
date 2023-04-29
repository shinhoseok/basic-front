import React from 'react';

import "@contents/css/common.css";
import "@contents/css/worksite.css";
import "@contents/css/loginstyle.css";

const Login = () => {
    return (
        <div className="login_wrap">
                <div className="loginBox">
                <h2><img width="143" height="19" src={require('@contents/images/logo.png')} /></h2>
                <p className="txt_login"><span>Log in to Basic Administrator Account</span></p>
                <dl className="box_area">
                    <dt><a href="#"><img src={require('@contents/images/btn_login.jpg')} width="97" height="78" /></a></dt>
                    <dd className="namebox">ID</dd>
                    <dd className="boxin"><input name="" type="text" /></dd>
                    <dd className="namebox">PASSWORD</dd>
                    <dd className="boxin"><input name="" type="text" /></dd>
                </dl>
                </div>   
        </div>     
    );
};

export default Login;