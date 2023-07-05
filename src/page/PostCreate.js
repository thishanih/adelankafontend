import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import endpointService from "../services/endpoint.services.js";
import TokenService from "../services/token.service";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";

export default function PostCreate() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
    },
    enableReinitialize: true,

    //  Yup validation

    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
      note: Yup.string().max(400).required("Required"),
    }),

    // Submit data
    async onSubmit(values) {
      const userStore = TokenService.getUser();

      const createPost = {
        title: values.title,
        note: values.note,
        user: userStore.userid,
      };

      await endpointService
        .AddPost(createPost)
        .then((res) => {
          navigate("/post");
        })
        .catch((error) => {
          console.log("🚀 ~ file: PostCreate.js:49 ~ onSubmit ~ error:", error);
        });
    },
  });
  return (
    <>
      <div className="px-8 container mx-auto w-full flex justify-center h-screen items-center">
        <Card className="w-2/4 ">
          <form onSubmit={formik.handleSubmit}>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography className="p-4" variant="h4" color="white">
                Add Post
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div className="my-4 px-4">
                <Input
                  className="text-xl"
                  size="lg"
                  name="title"
                  label="title"
                  autocomplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  error={
                    (formik.touched.title && Boolean(formik.errors.title),
                    formik.touched.title && formik.errors.title)
                  }
                />
                <div className="text-red-500 text-xs pt-1">
                  {formik.errors.title}
                </div>
              </div>

              <div className="my-4 px-4">
                <Textarea
                  label="Message"
                  size="lg"
                  type="note"
                  autocomplete="off"
                  name="note"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.note}
                  error={
                    (formik.touched.note && Boolean(formik.errors.note),
                    formik.touched.note && formik.errors.note)
                  }
                />

                <div className="text-red-500 text-xs pt-1">
                  {formik.errors.note}
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Add Post
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
