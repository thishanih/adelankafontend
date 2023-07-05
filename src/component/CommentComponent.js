import React from "react";
import moment from "moment";

export default function CommentComponent(props) {
  const { commentNote, createdAt, user } = props.data;

  return (
    <>
      <div className="text-base text-gray-500 font-medium my-4 w-full">
        {commentNote}
        <div className="flex w-full justify-end mt-4">
          <p className="text-base text-gray-700 pr-2">{user.firstName} </p> by{" "}
          {moment(createdAt).format("LLLL")};
        </div>
      </div>
    </>
  );
}
