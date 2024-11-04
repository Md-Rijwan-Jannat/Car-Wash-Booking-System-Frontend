import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type TAuthProps = object;

const Auth: FC<TAuthProps> = () => {
  return (
    <div
      className="relative w-full h-screen bg-gradient-to-r from-gray-200 to-gray-400 backdrop-blur-xl"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1079059906/photo/side-of-car-washed-in-self-serve-carwash-strokes-from-brush-in-white-shampoo-visible-on.jpg?s=612x612&w=0&k=20&c=nXRwhFnVuqvYHB7jancoJNE-dU1kDWC7Or22ePETWVE=')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Outlet />
    </div>
  );
};

export default Auth;
