import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Oval } from "react-loader-spinner";
import { useFormik } from "formik";
import TokenService from "../services/token.service";
import endpointService from "../services/endpoint.services.js";
import CommentComponent from "../component/CommentComponent.js";
import { Button, Textarea } from "@material-tailwind/react";
export default function EditPost() {
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [comment, setCommentData] = useState([]);

  const formik = useFormik({
    initialValues: {
      commentNote: "",
    },
    enableReinitialize: true,

    //  Yup validation

    validationSchema: Yup.object().shape({
      commentNote: Yup.string().max(500).required("Required"),
    }),

    // Submit data
    async onSubmit(values) {
      const userStore = TokenService.getUser();

      const newComment = {
        commentNote: values.commentNote,
        post: data._id,
        user: userStore.userid,
      };

      await endpointService
        .AddComment(newComment)
        .then((res) => {
          loadPostCommentData();
        })
        .catch((error) => {
          console.log("🚀 ~ file: PostCreate.js:49 ~ onSubmit ~ error:", error);
        });
    },
  });

  const loadPostData = useCallback(() => {
    setLoader(true);
    if (params.id) {
      endpointService
        .PostbyId(params.id)
        .then((response) => {
          setLoader(false);
          if (response.data.data) {
            setData(response.data.data);
          }
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: EditPost.js:19 ~ loadPostData ~ error:",
            error
          );
          setLoader(false);
        });
    }
  }, [params.id]);

  const loadPostCommentData = useCallback(() => {
    if (params.id) {
      setLoader(true);
      endpointService
        .commentDataShow(params.id)
        .then((response) => {
          if (response.data.data) {
            setCommentData(response.data.data);
          }
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.log(
            "🚀 ~ file: EditPost.js:19 ~ loadPostData ~ error:",
            error
          );
        });
    }
  }, [params.id]);

  useEffect(() => {
    loadPostData();
    loadPostCommentData();
  }, [loadPostData, loadPostCommentData, params.id]);

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
        <div className="container mx-auto px-4 my-4 ">
          <div className="lg:w-3/4 w-full">
            <h2 className="text-blue-400 font-medium text-3xl">{data.title}</h2>

            <div className="text-base text-gray-500 font-medium my-4 ">
              {data.note}
            </div>

            <h2 className="text-gray-700 font-medium text-lg">Comments</h2>

            {comment &&
              comment.map((data, index) => (
                <CommentComponent key={index} data={data} />
              ))}

            <form onSubmit={formik.handleSubmit}>
              <div className="my-4">
                <Textarea
                  label="comment"
                  size="lg"
                  autocomplete="off"
                  name="commentNote"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.commentNote}
                  error={
                    (formik.touched.commentNote &&
                      Boolean(formik.errors.commentNote),
                    formik.touched.commentNote && formik.errors.commentNote)
                  }
                />
              </div>

              <div className="flex justify-end w-full">
                <Button type="submit" variant="gradient">
                  Add Comment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
