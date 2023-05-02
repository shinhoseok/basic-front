import CommDefaultVO from "./CommDefaultVO";

interface UserVO extends CommDefaultVO {
  userId: string;
  userPw: string;
  userNm: string;
  mblPno: string;
  emailAddr: string;
  addr: string;
  addrDetail: string;
}

export default UserVO;
