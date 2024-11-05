import {
  Avatar,
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tooltip,
} from '@nextui-org/react';
import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeSwitcher } from '../../theme/ThemeSwitcher';
import { useTheme } from 'next-themes';
import { useAppSelector } from '../../redux/hook';
import {
  TUser,
  useCurrentUser,
  useCurrentUserToken,
} from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/VerifyToken';
import { FaHeart, FaShopify } from 'react-icons/fa';
import { useGetMeQuery } from '../../redux/features/auth/authApi';
import { getAllSlotBooking } from '../../redux/features/user/slotBookmarkSlice';
import { useGetAllMyBookingsQuery } from '../../redux/features/user/slotBokingApi';
import NavBarCountDown from './NavBarCountDown';
import Logo from '../ui/Logo';
import { getAllFavoriteServices } from '../../redux/features/service/serviceSlice';
import { IoHeart } from 'react-icons/io5';

const NavBar: FC = () => {
  const { theme } = useTheme();
  const { email, role } = useAppSelector(useCurrentUser) || {};
  const navigate = useNavigate();
  const { data: userDetails } = useGetMeQuery(email);
  const { profileImg, name } = userDetails?.data || ({} as TUser);
  const { data: booking } = useGetAllMyBookingsQuery({ sort: '-createdAt' });
  const slotBookingData = useAppSelector(getAllSlotBooking);
  const token = useAppSelector(useCurrentUserToken);
  let user;

  const allFavoriteServices = useAppSelector(getAllFavoriteServices);

  if (token) {
    user = verifyToken(token);
  }

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Dashboard', path: `/dashboard/dashboard` },
    { name: 'About Us', path: '/aboutUs' },
    { name: 'Bookings', path: '/booking' },
    { name: 'Favorite', path: '/favorites-services' },
  ].filter(Boolean);

  return (
    <Navbar
      position="static"
      isBlurred={false}
      maxWidth="xl"
      className="bg-transparent"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="flex items-center justify-center gap-6">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-warning border-b-4 border-warning font-medium'
                    : 'text-default-900'
                }
              >
                {item.name}
              </NavLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="flex items-center gap-3">
          <NavbarItem>
            <Tooltip content="Recent booking slot will start">
              <NavbarItem className="hidden md:block mt-3">
                {booking?.data?.length && role === 'user' && (
                  <NavBarCountDown
                    slotDates={
                      booking?.data?.[0].slot
                        ? [[booking.data[0].slot[0].date]]
                        : []
                    } // Pass the first slot date
                  />
                )}
              </NavbarItem>
            </Tooltip>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <div
              onClick={() => navigate('/favorites-services')}
              className="cursor-pointer mt-2"
            >
              {role === 'user' && (
                <Badge
                  content={`${allFavoriteServices?.length || 0}`}
                  color="warning"
                  variant="flat"
                  className="border-none"
                >
                  <IoHeart className="text-warning" size={36} />
                </Badge>
              )}
            </div>
          </NavbarItem>
          <NavbarItem>
            <div
              onClick={() => navigate('/booking')}
              className="cursor-pointer mt-1"
            >
              {role === 'user' && (
                <Badge
                  content={slotBookingData?.length || 0}
                  color="warning"
                  variant="flat"
                  className="border-none"
                >
                  <FaShopify className="text-warning" size={30} />
                </Badge>
              )}
            </div>
          </NavbarItem>
          <NavbarItem>
            <div
              onClick={() => navigate('/dashboard/dashboard')}
              className="cursor-pointer mb-1"
            >
              {user && <Avatar name={name} src={profileImg || undefined} />}
            </div>
          </NavbarItem>

          <NavbarItem className="hidden lg:flex">
            {!user && (
              <Button
                className="text-white"
                as={NavLink}
                to="/auth/login"
                color="warning"
                variant="shadow"
                radius="full"
              >
                Login
              </Button>
            )}
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarMenu className="lg:hidden flex flex-col items-center pt-5">
        <Tooltip content="Recent booking slot will start">
          <NavbarItem>
            {booking?.data.length && role === 'user' && (
              <NavBarCountDown
                slotDates={
                  booking?.data?.[0].slot
                    ? [[booking.data[0].slot[0].date]]
                    : []
                } // Pass the first slot date
              />
            )}
          </NavbarItem>
        </Tooltip>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `w-full ${isActive ? 'text-warning' : ''}`
              }
            >
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div
            onClick={() => navigate('/favorites-services')}
            className="cursor-pointer mt-2"
          >
            <Badge
              content={`${allFavoriteServices?.length || 0}`}
              color="warning"
              variant="flat"
              className="border-none text-default-900"
            >
              <FaHeart size={25} className="text-red-500" />
            </Badge>
          </div>
        </NavbarMenuItem>
        <NavbarMenuItem className="flex gap-3">
          {!user && (
            <Button
              className="text-white"
              size="sm"
              as={NavLink}
              to="/auth/login"
              color="warning"
              variant="shadow"
              radius="full"
            >
              Login
            </Button>
          )}
          <ThemeSwitcher />
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent className="sm:hidden" justify="end">
        <div
          className={`border size-10 bg-orange-50 flex items-center justify-center rounded-full text-warning ${
            theme === 'dark'
              ? 'border-gray-100 bg-opacity-10 border-opacity-15'
              : ''
          }`}
        >
          <NavbarMenuToggle />
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
