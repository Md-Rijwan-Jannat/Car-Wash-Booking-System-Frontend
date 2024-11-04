/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import {
  IoMdLock,
  IoMdMail,
  IoMdPerson,
  IoMdCall,
  IoMdPin,
} from 'react-icons/io';
import CWForm from '../../components/form/CWForm';
import CWInput from '../../components/form/CWInput';
import { useSignUpMutation } from '../../redux/features/auth/authApi';
import CWTextarea from '../../components/form/CWTextarea';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Container from '../../components/ui/Container'; // Import Container for consistent layout

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
  const navigate = useNavigate();

  const onSubmit = async (data: TSignUpFormValues) => {
    const toastId = toast.loading('Registering...');

    const userData = {
      ...data,
      role: 'user',
    };

    try {
      const res = await signupUser(userData).unwrap();

      if (res?.success) {
        toast.success('Successfully registered, please log in now', {
          id: toastId,
          duration: 3000,
        });
        navigate('/auth/login');
      } else {
        toast.dismiss(toastId);
      }
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  return (
    <Container>
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center w-full md:max-w-md h-[400px] bg-warning rounded-l-md p-4">
          <h3 className="text-white text-2xl font-semibold mb-4">
            Welcome to Our Community
          </h3>
          <Button
            as={Link}
            to="/auth/login"
            className="rounded-full bg-white text-black hover:text-white hover:bg-warning-600 transition duration-300"
          >
            Log in
          </Button>
        </div>
        <div className="w-full h-full md:h-[400px] bg-white rounded-r-md p-2 md:p-6">
          <CWForm<TSignUpFormValues> onSubmit={onSubmit}>
            <h2 className="text-center text-3xl font-bold my-4 text-warning">
              Sign Up
            </h2>
            <div
              className={`flex flex-col items-center justify-center gap-5 rounded-md p-5 w-full`}
            >
              <div className="flex items-center gap-3 w-full flex-col md:flex-row">
                <CWInput
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  required={true}
                  icon={<IoMdPerson className="text-2xl text-warning" />}
                />
                <CWInput
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  required={true}
                  type="email"
                  icon={<IoMdMail className="text-2xl text-warning" />}
                />
              </div>
              <div className="flex items-center gap-3 w-full flex-col md:flex-row">
                <CWInput
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  required={true}
                  type="password"
                  icon={<IoMdLock className="text-2xl text-warning" />}
                />
                <CWInput
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  type="tel"
                  required={true}
                  icon={<IoMdCall className="text-2xl text-warning" />}
                />
              </div>
              <div className="w-full">
                <CWInput
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter your address"
                  icon={
                    <IoMdPin className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                  }
                  required
                />
              </div>

              <div className="flex py-2 justify-between w-full">
                <Checkbox
                  classNames={{
                    label: 'text-small',
                  }}
                  color="warning"
                >
                  I agree to the terms and conditions
                </Checkbox>
                <Button radius="full" color="warning" type="submit">
                  Sign Up
                </Button>
              </div>
            </div>
          </CWForm>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
