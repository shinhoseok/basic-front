import CommDefaultVO from "./CommDefaultVO";

interface UserVO extends CommDefaultVO {
  userId: string;
  userPw: string;
  userNm: string;
  pno: string;
  emailAddr: string;
  mblPno: string;
}

export default UserVO;
