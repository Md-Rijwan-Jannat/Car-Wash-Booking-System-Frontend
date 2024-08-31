/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FC } from "react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import CWForm from "../../components/form/CWForm";
import CWInput from "../../components/form/CWInput";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../../utils/VerifyToken";

type TLoginFormValues = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { theme } = useTheme();
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: TLoginFormValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await loginUser(data).unwrap();

      if (res.token) {
        const userData = verifyToken(res.token);
        dispatch(setUser({ user: userData, token: res.token }));
        navigate("/");
      }

      toast.success("Successfully logged in", {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="flex flex-col gap-1 text-xl md:text-2xl font-bold my-2">
        Log in
      </h2>
      <CWForm onSubmit={onSubmit}>
        <div
          className={`flex flex-col items-center justify-center gap-5 border ${
            theme === "dark" ? "border-gray-50 border-opacity-15" : ""
          } rounded-md p-3 lg:p-5 w-full md:w-[400px]`}
        >
          <CWInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            required={true}
            type="email"
            icon={<IoMdMail className="text-2xl text-warning" />}
          />
          <CWInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            required={true}
            type="password"
            icon={<IoMdLock className="text-2xl text-warning" />}
          />
          <div className="flex py-2 px-1 justify-between w-full">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
              color="warning"
            >
              Remember me
            </Checkbox>
            <Link className="text-[14px] text-primary" to="#">
              Forgot password?
            </Link>
          </div>
          <Button
            isLoading={isLoading}
            color="warning"
            variant="flat"
            type="submit"
          >
            Sign in
          </Button>
          <Link to="/auth/signup" className="mt-3 border-b text-primary">
            Create new account
          </Link>
        </div>
      </CWForm>
    </div>
  );
};

export default Login;
