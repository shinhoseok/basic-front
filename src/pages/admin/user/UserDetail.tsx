import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserVO from "../../../vo/UserVO";

const UserDetail = () => {
  const location = useLocation();
  const [userVO, setUserVO] = useState<UserVO>();
  const navigate = useNavigate();

  //사용자 상세조회
  const selectUserDetail = async () => {
    const params = location.state.params;
    await axios.post("/v1/admin/user/selectUserDetail", params).then((res) => {
      const userVO = res.data;
      setUserVO(userVO);
    });
  };
  useEffect(() => {
    selectUserDetail();
  }, []);

  //사용자목록
  const selectUserList = (e: any) => {
    const params = location.state.params;
    navigate(`/admin/user/selectUserList`, { state: { params } });
    e.preventDefault();
  };

  //유저삭제
  const deleteUserProc = async (e: any) => {
    const params = location.state.params;
    if (window.confirm("해당 사용자를 삭제하시겠습니까?")) {
      let param = {
        userId: params.userId,
      };
      await axios.put("/v1/admin/user/deleteUserProc", param).then((res) => {
        if (res.data) {
          alert("삭제가 완료되었습니다.");
          navigate("/admin/user/selectUserList");
        } else {
          alert(res.data.msg);
        }
      });
    }
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
              <td colSpan={4}>
                {userVO?.addr ? userVO.addr + " " + userVO.addrDetail : "-"}
              </td>
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
        <a onClick={deleteUserProc}>
          <button type="button" className="blueBtn L">
            삭제
          </button>
        </a>
        <a onClick={selectUserList}>
          <button type="button" className="blueBtn L">
            목록
          </button>
        </a>
      </div>
    </div>
  );
};

export default UserDetail;
