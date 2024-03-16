import React from "react";
import PaginationStyle from './Pagination.module.scss'
import {MdChevronRight} from "react-icons/md";
import ReactPaginate from "react-paginate";

const Pagination = ({ maxPage, maxPerPage, handlePageClick }) => {
    return (
      <div className={PaginationStyle.pagination}>
        <ReactPaginate
          marginPagesDisplayed={0}
          containerClassName={PaginationStyle.ctn}
          pageClassName={PaginationStyle.itemPage}
          pageLinkClassName={PaginationStyle.link}
          onPageChange={handlePageClick}
          pageCount={maxPage}
          breakLabel={"..."}
          nextLabel={<MdChevronRight className={PaginationStyle.svgItems} />}
          pageRangeDisplayed={maxPerPage}
          disabledClassName={PaginationStyle.disable}
          previousLabel={
            <MdChevronRight
              className={`${PaginationStyle.svgItems} ${PaginationStyle.rotate}`}
            />
          }
        />
      </div>
    );
  };

export default Pagination;
