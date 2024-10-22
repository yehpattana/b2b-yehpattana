"use client";
import EmailIcon from "@mui/icons-material/Email";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { apiService } from "../../../config/axios/axios-interceptor";
import { useFormik } from "formik";
import { toastError } from "../../../component/Toast";
import BackgroundAnimation from "../../../component/Background";

const Login = () => {
  const router = useRouter();
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      new_password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await apiService.patch(
          `users/change-password/${params?.userId}`,
          values
        );
        if (response.status === 200) {
          router.push("/login");
        }
      } catch (error) {
        toastError(`Login failed: ${error}`);
      }
    },
  });

  return (
    <div className="h-screen bg-slate-100">
      <BackgroundAnimation />
      <header className="w-full bg-primary py-4 px-6 lg:px-80 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center text-white">
          <div className="text-center">
            <EmailIcon className="w-8 h-8" />
            <span>support@ymtinnovation.com</span>
          </div>
        </div>
      </header>
      <main className="flex items-center justify-center mt-10 md:mt-40 px-4">
        <Box className="flex flex-col items-center justify-center h-full bg-white rounded-md p-6 md:p-8 shadow w-full sm:w-4/6 md:w-2/6">
          <Typography
            variant="h5"
            component="h2"
            className="font-bold text-xl text-primary mb-4"
          >
            Reset Password
          </Typography>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <TextField
              fullWidth
              required
              label="New Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps("new_password")}
              error={
                formik.touched.new_password &&
                Boolean(formik.errors.new_password)
              }
              helperText={
                formik.touched.new_password && formik.errors.new_password
              }
            />
            <Box textAlign="center">
              <Button variant="contained" color="primary" type="submit">
                Reset
              </Button>
            </Box>
          </form>
        </Box>
      </main>
    </div>
  );
};

export default Login;
