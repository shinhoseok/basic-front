import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserVO from "../../../vo/UserVO";
import Paging from "../../common/Paging";
import PageableVO from "../../../vo/PageableVO";

const UserList = () => {
  const [userVO, setUserVO] = useState<PageableVO<UserVO>>();
  const navigate = useNavigate();
  const location = useLocation();

  //검색값 초기화
  const intialFormValues = {
    pageNum: 1,
    searchCondition: "userNm",
    searchKeyword: "",
    sortSubject: "",
    sortDescend: "",
  } as UserVO;
  const [formValues, setFormValues] = useState<UserVO>(intialFormValues);

  // 목록검색
  const selectUserList = (pageNum: number) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      pageNum: pageNum,
    }));
    axios
      .post("/v1/admin/user/selectUserList", {
        ...formValues,
        pageNum: pageNum,
      })
      .then((res) => {
        const resultList = res.data.userList;
        setUserVO(resultList);
      });
  };

  useEffect(() => {
    const state = location.state;
    if (state != null && state.params != null) {
      setFormValues(state.params);
      selectUserList(state.params.pageNum);
    } else {
      selectUserList(1);
    }
  }, []); // useEffect의 의존성 배열을 빈 배열로 설정하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 설정

  //등록화면 이동
  const insertUser = (e: any) => {
    const params = {
      pageNum: formValues.pageNum,
      searchCondition: formValues.searchCondition,
      searchKeyword: formValues.searchKeyword,
      sortSubject: formValues.sortSubject,
      sortDescend: formValues.sortDescend,
    };
    navigate("/admin/user/insertUser", { state: { params } });
    e.preventDefault();
  };

  //상세화면 이동
  const selectUserDetail = async (userId: string) => {
    const params = {
      userId: userId,
      pageNum: formValues.pageNum,
      searchCondition: formValues.searchCondition,
      searchKeyword: formValues.searchKeyword,
      sortSubject: formValues.sortSubject,
      sortDescend: formValues.sortDescend,
    };
    navigate(`/admin/user/selectUserDetail`, { state: { params } });
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

  const fn_sort = async (sortSubject: string, sortDescend: string) => {
    await setFormValues({
      ...formValues,
      sortSubject: sortSubject,
      sortDescend: sortDescend,
    });
    selectUserList(formValues.pageNum);
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
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        fn_sort("userId", "asc");
                      }}
                      style={{ cursor: "pointer" }}
                    ></a>
                  </span>
                  <span className="arrow_descending">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        fn_sort("userId", "desc");
                      }}
                      style={{ cursor: "pointer" }}
                    ></a>
                  </span>
                </div>
              </th>
              <th>성명</th>
              <th>이메일</th>
              <th>
                가입일자
                <span className="arrow_ascending">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      fn_sort("regDt", "asc");
                    }}
                    style={{ cursor: "pointer" }}
                  ></a>
                </span>
                <span className="arrow_descending">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      fn_sort("regDt", "desc");
                    }}
                    style={{ cursor: "pointer" }}
                  ></a>
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
