import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const navigate = useNavigate();
  const selectUserList = async () => {
    await axios.post("/v1/admin/user/selectUserList", {}).then((res) => {
      setUserList(res.data.data.userList.content);
    });
  };
  useEffect(() => {
    selectUserList();
  }, []);
  const insertUser = (e: any) => {
    navigate("/admin/user/insertUser");
    e.preventDefault();
  };
  return (
    <div className="contents">
      <p className="contentTitle">사용자 관리</p>
      <p className="sub_path">
        <img
          src={require("@contents/images/ico_home.png")}
          width="10"
          height="9"
        />
        &nbsp;〉&nbsp;사용자관리&nbsp;〉&nbsp;사용자관리
      </p>
      <div className="selectBox">
        <select name="select" className="w13p">
          <option>2014</option>
        </select>
        <input className="searchName" name="" type="text" />
        <button type="button" className="grayBtn ico">
          <img src={require("@contents/images/ico_search.png")} /> 검색
        </button>
        <button type="button" className="grayBtn02 ico">
          {" "}
          초기화
        </button>
      </div>

      <div className="tableLayer">
        <table className="tableList">
          <caption></caption>
          <colgroup>
            <col width="5%" />
            <col width="20%" />
            <col width="25%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th className="noBg">번호</th>
              <th>
                아이디
                <span className="arrow_ascending">
                  <a href="#"></a>
                </span>
                <span className="arrow_descending">
                  <a href="#"></a>
                </span>
              </th>
              <th>
                성명
                <span className="arrow_ascending">
                  <a href="#"></a>
                </span>
                <span className="arrow_descending">
                  <a href="#"></a>
                </span>
              </th>
              <th>부서</th>
              <th>
                가입일자
                <span className="arrow_ascending">
                  <a href="#"></a>
                </span>
                <span className="arrow_descending">
                  <a href="#"></a>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.length ? (
              userList.map((user, idx) => (
                <tr key={idx} className="row">
                  <td>{idx + 1}</td>
                  <td>{user.userId}</td>
                  <td>
                    <a href="#">{user.userNm}</a>
                  </td>
                  <td>{user.emailAddr}</td>
                  <td>{user.regDt.substring(0, 10)}</td>
                </tr>
              ))
            ) : (
              <tr className="row">
                <td colSpan={5}>조회된 데이터가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="T_btnLayer fr">
          <a href="#">
            <button type="button" className="blueBtn L" onClick={insertUser}>
              등록
            </button>
          </a>
        </div>
      </div>

      <div className="paging_place">
        <div className="paging_wrap">
          <a href="#" title="맨 앞으로" className="pprev"></a>
          <a href="#" title="이전" className="prev"></a>
          <span>
            <a href="#" className="active">
              1
            </a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">7</a>
            <a href="#">8</a>
            <a href="#">9</a>
            <a href="#">10</a>
          </span>
          <a href="#" title="다음" className="next"></a>
          <a href="#" title="맨 뒤로" className="nnext"></a>
        </div>
      </div>
    </div>
  );
};

export default UserList;
