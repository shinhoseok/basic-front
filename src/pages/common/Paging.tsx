import "@contents/css/common.css";
import "@contents/css/worksite.css";
import CommDefaultVO from "../../vo/CommDefaultVO";
import { useEffect, useState } from "react";
import PageableVO from "../../vo/PageableVO";

interface PageProps<T> {
  selectList: (pageNum: number) => void;
  resultVO?: PageableVO<T>;
}
const Paging = <T extends CommDefaultVO>({
  selectList,
  resultVO,
}: PageProps<T>) => {
  const [startNum, setStartNum] = useState<number>(0);
  const [lastNum, setLastNum] = useState<number>(0);
  console.log(resultVO);
  useEffect(() => {
    if (resultVO) {
      const start = Math.floor(resultVO.number / 10) * 10 + 1;
      const last =
        start + 9 < resultVO.totalPages ? start + 9 : resultVO.totalPages;
      setLastNum(last);
      setStartNum(start);
    }
  }, [resultVO]);
  if (resultVO === null) {
    return null; // resultVO가 null이면 아무것도 렌더링하지 않음
  }
  const pageNumbers =
    resultVO !== undefined
      ? Array.from({ length: lastNum }, (_, i) => startNum + i)
      : [];

  return (
    <div className="paging_place">
      <div className="paging_wrap">
        <a
          style={{
            display: resultVO?.first ? "none" : "block",
            cursor: "pointer",
          }}
          title="맨 앞으로"
          className="pprev"
          onClick={() => selectList(1)}
        ></a>
        <a
          style={{
            display: startNum == 1 ? "none" : "block",
            cursor: "pointer",
          }}
          onClick={() => {
            if (resultVO?.first) {
              return;
            } else {
              if (resultVO !== undefined) {
                selectList(resultVO.number);
              }
            }
          }}
          title="이전"
          className="prev"
        ></a>
        <span>
          {resultVO !== undefined
            ? pageNumbers.map((page) => (
                <a
                  key={page}
                  style={{
                    cursor: "pointer",
                  }}
                  className={page === resultVO.number + 1 ? "active" : ""}
                  onClick={() => selectList(page)}
                >
                  {page}
                </a>
              ))
            : ""}
        </span>
        <a
          style={{
            display: startNum == 1 ? "none" : "block",
            cursor: "pointer",
          }}
          title="다음"
          className="next"
          onClick={() => {
            if (resultVO !== undefined) {
              if (resultVO.last) {
                return;
              } else {
                selectList(resultVO?.number + 2);
              }
            }
          }}
        ></a>
        <a
          style={{
            display: resultVO ? (resultVO?.last ? "none" : "block") : "block",
            cursor: "pointer",
          }}
          title="맨 뒤로"
          className="nnext"
          onClick={() => {
            if (resultVO !== undefined) {
              selectList(resultVO.totalPages);
            }
          }}
        ></a>
      </div>
    </div>
  );
};
export default Paging;
