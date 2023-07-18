import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserVO from "../../../vo/UserVO";
import Paging from "../../common/Paging";
import PageableVO from "../../../vo/PageableVO";

const UserList = () => {
  const [rsltMap, setRsltMap] = useState<PageableVO<UserVO>>();
  const [searchCondition, setSearchCondition] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const navigate = useNavigate();
  const selectUserList = async (pageNum: number) => {
    let param = {
      page: pageNum,
      searchKeyword: searchKeyword,
      searchCondition: searchCondition,
    };
    await axios.post("/v1/admin/user/selectUserList", param).then((res) => {
      const userList = res.data.data.userList;
      setRsltMap(userList);
    });
  };
  useEffect(() => {
    selectUserList(1);
  }, []);
  const insertUser = (e: any) => {
    navigate("/admin/user/insertUser");
    e.preventDefault();
  };
  const selectUserDetail = (userId: string) => {
    navigate(`/admin/user/selectUserDetail/${userId}`);
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
        <select
          name="select"
          className="w13p"
          value={searchCondition}
          onChange={(e) => setSearchCondition(e.target.value)}
        >
          <option value="userNm">성명</option>
          <option value="emailAddr">이메일</option>
        </select>
        <input className="searchName" name="" type="text" />
        <button type="button" className="grayBtn ico">
          <img src={require("@contents/images/ico_search.png")} /> 검색
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
                <div>
                  아이디
                  <span className="arrow_ascending">
                    <a href="#"></a>
                  </span>
                  <span className="arrow_descending">
                    <a href="#"></a>
                  </span>
                </div>
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
            {rsltMap?.content && rsltMap?.content.length > 0 ? (
              rsltMap?.content.map((user, idx) => (
                <tr
                  key={idx}
                  className="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => selectUserDetail(user.userId)}
                >
                  <td>{idx + 1}</td>
                  <td>{user.userId}</td>
                  <td>{user.userNm}</td>
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
      <Paging selectList={selectUserList} rsltMap={rsltMap} />
    </div>
  );
};

export default UserList;
