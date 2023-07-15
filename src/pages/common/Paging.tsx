import "@contents/css/common.css";
import "@contents/css/worksite.css";
import CommDefaultVO from "../../vo/CommDefaultVO";
import { useEffect, useState } from "react";
import PageableVO from "../../vo/PageableVO";

interface PageProps<T> {
  selectList: (pageNum: number) => Promise<void>;
  rsltMap?: PageableVO<T>;
}
const Paging = <T extends CommDefaultVO>({
  selectList,
  rsltMap,
}: PageProps<T>) => {
  const [startNum, setStartNum] = useState<number>(0);
  const [lastNum, setLastNum] = useState<number>(0);
  useEffect(() => {
    if (rsltMap) {
      const start = Math.floor(rsltMap.number / 10) * 10 + 1;
      const last =
        start + 9 < rsltMap.totalPages ? start + 9 : rsltMap.totalPages;
      setLastNum(last);
      setStartNum(start);
    }
  }, [rsltMap]);
  const pageNumbers =
    rsltMap !== undefined
      ? Array.from({ length: lastNum }, (_, i) => startNum + i)
      : [];
  return (
    <div className="paging_place">
      <div className="paging_wrap">
        <a
          style={{
            display: rsltMap?.first ? "none" : "block",
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
            if (rsltMap?.first) {
              return;
            } else {
              if (rsltMap !== undefined) {
                selectList(rsltMap.number);
              }
            }
          }}
          title="이전"
          className="prev"
        ></a>
        <span>
          {rsltMap !== undefined
            ? pageNumbers.map((page) => (
                <a
                  key={page}
                  style={{
                    cursor: "pointer",
                  }}
                  className={page === rsltMap.number + 1 ? "active" : ""}
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
            if (rsltMap !== undefined) {
              if (rsltMap.last) {
                return;
              } else {
                selectList(rsltMap?.number + 2);
              }
            }
          }}
        ></a>
        <a
          style={{
            display: rsltMap ? (rsltMap?.last ? "none" : "block") : "block",
            cursor: "pointer",
          }}
          title="맨 뒤로"
          className="nnext"
          onClick={() => {
            if (rsltMap !== undefined) {
              selectList(rsltMap.totalPages);
            }
          }}
        ></a>
      </div>
    </div>
  );
};
export default Paging;
