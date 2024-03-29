interface PageableVO<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  number: number;
  size: number;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  page: number; // 현재페이지
  size: number; // 페이지 사이즈
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export default PageableVO;
