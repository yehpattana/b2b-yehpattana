"use client";
import EmailIcon from "@mui/icons-material/Email";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { apiService } from "../../config/axios/axios-interceptor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastError, toastSuccess } from "../../component/Toast";
import { useRecoilState } from "recoil";
import { userDetail } from "../../recoil/atoms/recoilState";
import BackgroundAnimation from "../../component/Background";

const Login = () => {
  const router = useRouter();
  const [, setUser] = useRecoilState(userDetail);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await apiService.post("auth/signin", values);
        if (response.status === 200) {
          if (response.data.reset_password) {
            router.push(`/resetPassword/${response.data.user_id}`);
          } else {
            apiService.setAccessToken(response.data.token.access_token);
            apiService.setRefreshToken(response.data.token.refresh_token);
            localStorage.setItem("logo", response.data.logo);
            localStorage.setItem("customer_id", response.data.customer_id);
            localStorage.setItem("user_id", response.data.user_id);
            setUser(response.data);
            const { data: companies } = await apiService.get("companies");
            if (companies.success) {
              const filterCompany = companies.data.find(
                (c) => c.company_name === response.data.company_name
              );
              apiService.setCompanyId(filterCompany.id);
              apiService.setCompanyName(filterCompany.company_code);
              toastSuccess("Login Success");
              router.push(`/${filterCompany.company_code}/resellerPanel`);
            }
          }
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
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button className="flex items-center justify-between text-xs w-full mb-5 cursor-pointer text-primary z-1000 " onClick={()=>{router.push('/forgot-password')}}>

                Did you forget your password?
            </Button>
            <Box textAlign="center">
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </main>
    </div>
  );
};

export default Login;
