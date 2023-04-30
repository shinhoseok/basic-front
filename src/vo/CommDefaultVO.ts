interface CommDefaultVO {
  regDt: string;
  regId: string;
  modDt: string;
  modId: string;
  //paging
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  number: number;
  size: number;
  empty: boolean;
}

export default CommDefaultVO;
