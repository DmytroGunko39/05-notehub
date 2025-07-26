import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  page: number;
  onChange: (nextPage: number) => void;
}

export default function Pagination({ total, page, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={total}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      nextLabel="→"
      previousLabel="←"
      containerClassName={css.pagination}
      activeClassName={css.active}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
    />
  );
}
