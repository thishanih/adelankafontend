import React from "react";

export default function CountNumber(props) {
  const { currentPage, pageSize, totalCount } = props;

  return (
    <>
      <div className="flex flex-row justify-start w-full tracking-wider">
        <p className="text-sm font-medium text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {currentPage * pageSize - pageSize}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-700">
            {currentPage * pageSize}
          </span>{" "}
          of
          <span className="font-semibold text-gray-700"> {totalCount} </span>
          results
        </p>
      </div>
    </>
  );
}
