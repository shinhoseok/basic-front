import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserVO from "../../../vo/UserVO";
import Paging from "../../common/Paging";
import PageableVO from "../../../vo/PageableVO";
import CommDefaultVO from "../../../vo/CommDefaultVO";

const UserList = () => {
  const [userVO, setUserVO] = useState<PageableVO<UserVO>>();
  const navigate = useNavigate();

  //검색값 초기화
  const intialFormValues = {
    page: 1,
    searchCondition: "userNm",
    searchKeyword: "",
    sortSubject: "",
    sortDescend: "",
  } as CommDefaultVO;
  const [formValues, setFormValues] = useState<CommDefaultVO>(intialFormValues);

  //목록검색
  const selectUserList = async (pageNum: number) => {
    setFormValues({
      ...formValues,
      page: pageNum,
    });
    await axios
      .post("/v1/admin/user/selectUserList", formValues)
      .then((res) => {
        console.log(res.data);
        const resultList = res.data.userList;
        setUserVO(resultList);
      });
  };
  useEffect(() => {
    selectUserList(1);
  }, []);

  //등록화면 이동
  const insertUser = (e: any) => {
    navigate("/admin/user/insertUser");
    e.preventDefault();
  };

  //상세화면 이동
  const selectUserDetail = (userId: string) => {
    navigate(`/admin/user/selectUserDetail/${userId}`);
  };

  const handleSelect = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      selectUserList(1);
    }
  };

  //사용자 등록보고 검색값, 소팅값 세팅해서 던져야함  handleChange
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
          name="searchCondition"
          className="w13p"
          value={formValues.searchCondition}
          onChange={handleSelect}
        >
          <option value="userNm">성명</option>
          <option value="emailAddr">이메일</option>
        </select>
        <input
          className="searchName"
          name="searchKeyword"
          type="text"
          value={formValues.searchKeyword}
          onChange={handleSelect}
          onKeyDown={(e) => activeEnter(e)}
        />
        <button
          type="button"
          className="grayBtn ico"
          onClick={() => {
            selectUserList(1);
          }}
        >
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
              <th>이메일</th>
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
            {userVO?.content && userVO?.content.length > 0 ? (
              userVO?.content.map((user, idx) => (
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
      <Paging selectList={selectUserList} resultVO={userVO} />
    </div>
  );
};

export default UserList;
