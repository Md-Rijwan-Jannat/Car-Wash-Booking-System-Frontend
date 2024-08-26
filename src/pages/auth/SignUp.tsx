/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FC } from "react";
import {
  IoMdLock,
  IoMdMail,
  IoMdPerson,
  IoMdCall,
  IoMdPin,
} from "react-icons/io";
import CWForm from "../../components/form/CWForm";
import CWInput from "../../components/form/CWInput";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import CWTextarea from "../../components/form/CWTextarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type TSignUpFormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const SignUp: FC = () => {
  const { theme } = useTheme();
  const [signupUser] = useSignUpMutation();

  const onSubmit = async (data: TSignUpFormValues) => {
    const toastId = toast.loading("Register in...");

    const userData = {
      ...data,
      role: "user",
    };

    try {
      const res = await signupUser(userData).unwrap();

      if (res?.success) {
        toast.success("Successfully registered, Please login now", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="flex flex-col gap-1 text-xl md:text-2xl font-bold my-2">
        Sign Up
      </h2>
      <CWForm<TSignUpFormValues> onSubmit={onSubmit}>
        <div
          className={`flex flex-col items-center justify-center gap-5 border ${
            theme === "dark" ? "border-gray-50 border-opacity-15" : ""
          } rounded-md p-3 lg:p-5 w-full md:w-[400px]`}
        >
          <CWInput
            name="name"
            label="Name"
            placeholder="Enter your name"
            icon={<IoMdPerson className="text-2xl text-warning" />}
          />
          <CWInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            icon={<IoMdMail className="text-2xl text-warning" />}
          />
          <CWInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            icon={<IoMdLock className="text-2xl text-warning" />}
          />
          <CWInput
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
            icon={<IoMdCall className="text-2xl text-warning" />}
          />
          <CWTextarea
            name="address"
            label="Address"
            placeholder="Enter your address"
            endContent={
              <IoMdPin className="text-2xl text-warning pointer-events-none flex-shrink-0" />
            }
            variant="bordered"
            color="warning"
            rows={3}
            required
          />
          <Button color="default" type="submit">
            Sign Up
          </Button>
          <div className="flex py-2 px-1 justify-between w-full">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
              color="warning"
            >
              I agree to the terms and conditions
            </Checkbox>
          </div>
          <Link to="/auth/login" className="mt-3 border-b text-primary">
            Already have an account? Log in
          </Link>
        </div>
      </CWForm>
    </div>
  );
};

export default SignUp;
