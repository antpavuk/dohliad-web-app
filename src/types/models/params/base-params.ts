interface BaseParams {
  pageSize?: number;
  pageNumber?: number;
  isSortAscending?: boolean;
  orderBy?: string;
  filterField?: string;
  filterValue?: string | number | boolean;
}

export default BaseParams;
