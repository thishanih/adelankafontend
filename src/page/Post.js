import React, { useState, useEffect, useCallback } from "react";
import endpointService from "../services/endpoint.services.js";
import Pagination from "../component/pagination/Pagination.js";
import { useNavigate, Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import CountNumber from "../component/pagination/CountNumber.js";

export default function Post() {
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState([]);
  const [postsPerPage] = useState(5);
  const navigate = useNavigate();

  const displayPost = useCallback(
    (page) => {
      setLoader(true);
      endpointService
        .DisplayPost(page, postsPerPage)
        .then((res) => {
          setPost(res.data.data.docs);
          setTotalRows(res.data.data.totalDocs);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.log("🚀 ~ file: Post.js:16 ~ Post ~ error:", error);
        });
    },
    [postsPerPage, setLoader]
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    displayPost(pageNumber);
  };

  useEffect(() => {
    displayPost(1);
  }, [displayPost]);
  return (
    <>
      {loader ? (
        <div className="relative">
          <Oval
            wrapperClass="fixed top-0 flex w-full justify-center items-center h-screen z-30 bg-white"
            height={50}
            width={50}
            color="#495057"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#adb5bd"
            strokeWidth={1.5}
            strokeWidthSecondary={1.5}
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 w-full my-8">
          <div className="flex flex-row w-full justify-end">
            <Button color="red" onClick={() => navigate("/post/add")}>
              Add Post
            </Button>
          </div>

          <div>
            <CountNumber
              pageSize={postsPerPage}
              totalCount={totalRows}
              currentPage={currentPage}
            />
          </div>

          <div className="flex flex-col gap-4 w-full justify-center my-8">
            {post &&
              post.map((post, index) => (
                <>
                  <Card className="w-full">
                    <CardBody>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                      >
                        {post.title}
                      </Typography>
                      <Typography>{post.note}</Typography>
                    </CardBody>
                    <CardFooter className="flex w-full justify-end">
                      <Link
                        to={{
                          pathname: `/post/${post._id}`,
                          data: post._id,
                        }}
                      >
                        <Button>Read More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </>
              ))}
          </div>

          <div className="flex w-full mt-8 mb-4 justify-end">
            <Pagination
              pageSize={postsPerPage}
              totalCount={totalRows}
              onPageChange={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
}
