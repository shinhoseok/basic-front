import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserVO from "../../../vo/UserVO";

const UserDetail = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [userVO, setUserVO] = useState<UserVO>();
  const navigate = useNavigate();
  const selectUserDetail = async () => {
    let param = {
      userId: userId,
    };
    await axios.post("/v1/admin/user/selectUserDetail", param).then((res) => {
      const userVO = res.data.data;
      setUserVO(userVO);
    });
  };
  useEffect(() => {
    selectUserDetail();
  }, []);
  const selectUserList = (e: any) => {
    navigate("/admin/user/insertUser");
    e.preventDefault();
  };
  return (
    <div className="contents">
      <p className="contentTitle">사용자 목록</p>
      <p className="sub_path">
        <img src="images/ico_home.png" width={10} height={9} />
        &nbsp;〉&nbsp;사용자관리&nbsp;〉&nbsp;사용자관리
      </p>
      <h4 className="contentTitle_h4">로그인 1정보</h4>
      <div className="tableLayer">
        <table className="table">
          <caption />
          <colgroup>
            <col width="150px" />
            <col width="340px" />
            <col width="150px" />
            <col width="340px" />
          </colgroup>
          <tbody className="line">
            <tr>
              <th>이름</th>
              <td>{userVO?.userNm ? userVO.userNm : "-"}</td>
              <th>가입일</th>
              <td>
                {userVO?.regDt
                  ? new Date(userVO.regDt).toISOString().slice(0, 10)
                  : "-"}
              </td>
              {/* <td colSpan={4}> 2014-02-07</td> */}
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="contentTitle_h4">개인 정보</h4>
      <div className="tableLayer">
        <table className="table">
          <caption />
          <colgroup>
            <col width="150px" />
            <col width="340px" />
            <col width="150px" />
            <col width="340px" />
          </colgroup>
          <tbody className="line">
            <tr>
              <th>주소</th>
              <td colSpan={4}>{userVO?.addr ? userVO.addr : "-"}</td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td>{userVO?.emailAddr ? userVO.emailAddr : "-"}</td>
              <th>휴대폰</th>
              <td>{userVO?.mblPno ? userVO.mblPno : "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="T_btnLayer fr">
        <a href="#">
          <button type="button" className="blueBtn L">
            비번초기화
          </button>
        </a>
        <a href="#">
          <button type="button" className="blueBtn L">
            수정
          </button>
        </a>
        <a href="#">
          <button type="button" className="blueBtn L">
            삭제
          </button>
        </a>
        <a href="#">
          <button type="button" className="blueBtn L" onClick={selectUserList}>
            목록
          </button>
        </a>
      </div>
    </div>
  );
};

export default UserDetail;
