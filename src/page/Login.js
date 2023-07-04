import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "thishaniroshan@yahoo.com",
      password: "thishan@123",
    },
    enableReinitialize: true,

    //  Yup validation

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().max(50).required("Required"),
    }),

    // Submit data
    async onSubmit(values) {
      await AuthService.login(values)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate("/post");
        })
        .catch((error) => {
          console.log("🚀 ~ file: Login.js:36 ~ onSubmit ~ error:", error);
        });
    },
  });

  const userStore = TokenService.getUser();

  if (userStore) {
    return navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="w-1/4 ">
        <form onSubmit={formik.handleSubmit}>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography className="p-4" variant="h4" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="my-4 px-4">
              <Input
                className="text-xl"
                size="lg"
                name="email"
                label="Email"
                autocomplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={
                  (formik.touched.email && Boolean(formik.errors.email),
                  formik.touched.email && formik.errors.email)
                }
              />
              <div className="text-red-500 text-xs pt-1">
                {formik.errors.email}
              </div>
            </div>

            <div className="my-4 px-4">
              <Input
                size="lg"
                label="Password"
                type="password"
                autocomplete="off"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  (formik.touched.password && Boolean(formik.errors.password),
                  formik.touched.password && formik.errors.password)
                }
              />
              <div className="text-red-500 text-xs pt-1">
                {formik.errors.password}
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
