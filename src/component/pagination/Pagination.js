import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "../../assets/styles/pagination.scss";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="content-center">
          <p className="text-sm font-medium text-gray-600">
            Showing
            <span className="font-semibold text-gray-700">
              {" "}
              {currentPage * pageSize - 10}{" "}
            </span>
            to
            <span className="font-semibold text-gray-700">
              {" "}
              {currentPage * pageSize}{" "}
            </span>
            of
            <span className="font-semibold text-gray-700"> {totalCount} </span>
            results
          </p>
        </div>

        <div className=" ">
          <ul
            className={classnames("pagination-container", {
              [className]: className,
            })}
          >
            <li
              className={classnames("pagination-item", {
                disabled: currentPage === 1,
              })}
              onClick={onPrevious}
            >
              <div className="arrow left" />
            </li>
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return <li className="pagination-item dots">&#8230;</li>;
              }

              return (
                <li
                  key={index}
                  className={classnames("pagination-item", {
                    selected: pageNumber === currentPage,
                  })}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </li>
              );
            })}
            <li
              className={classnames("pagination-item", {
                disabled: currentPage === lastPage,
              })}
              onClick={onNext}
            >
              <div className="arrow right" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pagination;
