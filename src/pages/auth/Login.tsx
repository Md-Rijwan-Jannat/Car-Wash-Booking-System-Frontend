/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox } from '@nextui-org/react';
import { FC } from 'react';
import { IoMdLock, IoMdMail } from 'react-icons/io';
import CWForm from '../../components/form/CWForm';
import CWInput from '../../components/form/CWInput';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { setUser, TUser } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { verifyToken } from '../../utils/VerifyToken';
import Container from '../../components/ui/Container';

type TLoginFormValues = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: TLoginFormValues) => {
    const toastId = toast.loading('Logging in...');

    try {
      const res = await loginUser(data).unwrap();

      if (res.token) {
        const userData = verifyToken(res.token) as TUser;
        dispatch(setUser({ user: userData, token: res.token }));
        navigate('/');
      }

      toast.success('Successfully logged in', {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      toast.error('Something went wrong', {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <Container>
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-center h-screen ">
        <div className="w-full h-[400px] max-w-md bg-white rounded-l-md p-6">
          <CWForm onSubmit={onSubmit}>
            <h2 className="text-center text-3xl font-bold my-4 text-warning">
              Log in
            </h2>
            <div
              className={`flex flex-col items-center justify-center gap-5 rounded-md p-5 w-full`}
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
              <div className="flex py-2 justify-between w-full">
                <Checkbox
                  classNames={{
                    label: 'text-small',
                  }}
                  color="warning"
                >
                  Remember me
                </Checkbox>
                <Button
                  isLoading={isLoading}
                  color="warning"
                  type="submit"
                  radius="full"
                  className="transition duration-200 ease-in-out transform hover:scale-105 text-white w-[100px]"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </CWForm>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-[400px] bg-warning rounded-r-md p-4">
          <h3 className="text-white text-2xl font-semibold mb-4">
            Welcome Back
          </h3>
          <Button
            as={Link}
            to="/auth/signup"
            className="rounded-full bg-white text-black hover:text-white hover:bg-warning-600 transition duration-300"
          >
            Signup
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
