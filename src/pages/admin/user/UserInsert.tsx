import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TypeChecker from "../../../contents/js/TypeChecker";
import UserVO from "../../../vo/UserVO";
import ErrorVO from "../../../vo/ErrorVO";
import KakaoJusoPopupDom from "../../common/KakaoJusoPopupDom";
import KakaoJusoPopupPostCode from "../../common/KakaoJusoPopupPostCode";
import $ from "jquery";

const UserInsert = () => {
  const intialValues = {
    emailAddr: "",
    userPw: "",
    userNm: "",
    addr: "",
    addrDetail: "",
    mblPno: "",
  } as UserVO;
  const [formValues, setFormValues] = useState<UserVO>(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<null[] | HTMLDivElement[]>([]);
  const jusoModal = useRef<HTMLDivElement>(null);

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  const handleCloseModal = (e: any) => {
    if (
      isPopupOpen &&
      (!jusoModal.current || !jusoModal.current.contains(e.target))
    ) {
      setIsPopupOpen(false);
    }
  };

  const navigate = useNavigate();
  const submitForm = async () => {
    await axios
      .post("/v1/admin/user/insertUserProc", formValues)
      .then((res) => {
        navigate("/admin/user/selectUserList");
      });
  };
  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };
  const validate = (values: UserVO) => {
    let errors = {} as ErrorVO;
    if (!values.emailAddr) {
      errors.msg = "이메일을 입력하세요";
      alert(errors.msg);
      formRef.current[0]?.focus();
      return errors;
    }
    if (!TypeChecker.email(values.emailAddr)) {
      errors.msg = "이메일은 " + TypeChecker.emailText;
      alert(errors.msg);
      formRef.current[0]?.focus();
      return errors;
    }
    if (!values.userPw) {
      errors.msg = "비밀번호를 입력하세요";
      alert(errors.msg);
      formRef.current[1]?.focus();
      return errors;
    }
    if (!values.userPw) {
      errors.msg = "비밀번호를 입력하세요";
      alert(errors.msg);
      formRef.current[1]?.focus();
      return errors;
    }
    return errors;
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]); //submit을 눌러 formErrors가 변할때만 실행

  useEffect(() => {
    //팝업 외 다른 영역 클릭하면 팝업 종료
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="contents">
        <p className="contentTitle">사용자 목록</p>
        <p className="sub_path">
          <img
            src={require("@contents/images/ico_home.png")}
            width={10}
            height={9}
          />
          &nbsp;〉&nbsp;사용자관리&nbsp;〉&nbsp;사용자관리
        </p>
        <h4 className="contentTitle_h4">로그인 정보</h4>
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
                <th>E-mail</th>
                <td>
                  <div className="commonSearch_wrap">
                    <label className="blind" htmlFor=" ">
                      d
                    </label>
                    <input
                      name="emailAddr"
                      style={{ width: "320px" }}
                      type="text"
                      value={formValues.emailAddr}
                      onChange={handleChange}
                      ref={(element) => {
                        formRef.current[0] = element;
                      }}
                    />
                  </div>
                </td>
                <th className="bullet_orange">패스워드</th>
                <td>
                  <div className="commonSearch_wrap">
                    <label className="blind" htmlFor=" ">
                      d
                    </label>
                    <input
                      name="userPw"
                      style={{ width: "320px" }}
                      type="password"
                      value={formValues.userPw}
                      onChange={handleChange}
                      ref={(element) => {
                        formRef.current[1] = element;
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr></tr>
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
                <th className="bullet_orange">이름</th>
                <td>
                  <div className="commonSearch_wrap">
                    <label className="blind" htmlFor=" ">
                      d
                    </label>
                    <input
                      name="userNm"
                      style={{ width: "320px" }}
                      type="text"
                      placeholder="test"
                      value={formValues.userNm}
                      onChange={handleChange}
                      ref={(element) => {
                        formRef.current[2] = element;
                      }}
                    />
                  </div>
                </td>
                <th>전화번호</th>
                <td>
                  <div className="commonSearch_wrap">
                    <label className="blind" htmlFor=" ">
                      d
                    </label>
                    <input
                      name="mblPno"
                      style={{ width: "320px" }}
                      type="text"
                      placeholder="000-0000-0000"
                      value={formValues.mblPno}
                      onChange={handleChange}
                      ref={(element) => {
                        formRef.current[3] = element;
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>기본주소</th>
                <td>
                  <div className="commonSearch_wrap">
                    <label className="blind">d</label>
                    <input
                      id="addr"
                      name="addr"
                      disabled={true}
                      onChange={handleChange}
                      style={{ width: "240px" }}
                      type="text"
                    />
                    <button
                      type="button"
                      className="grayBtn M"
                      onClick={openPostCode}
                    >
                      주소찾기
                    </button>
                  </div>
                </td>
                <th>상세주소</th>
                <td>
                  <div className="commonSearch_wrap">
                    <label className="blind">d</label>
                    <input
                      id="addrDetail"
                      name="addrDetail"
                      onChange={handleChange}
                      style={{ width: "320px" }}
                      type="text"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="T_btnLayer fr">
          <a href="#">
            <button type="submit" className="blueBtn L">
              등록
            </button>
          </a>
          <a href="#">
            <button type="button" className="blueBtn L">
              취소
            </button>
          </a>
        </div>
      </div>
      <div>
        <div id="popupDom">
          {isPopupOpen && (
            <KakaoJusoPopupDom>
              <KakaoJusoPopupPostCode onClose={closePostCode} ref={jusoModal} />
            </KakaoJusoPopupDom>
          )}
        </div>
      </div>
    </form>
  );
};

export default UserInsert;
