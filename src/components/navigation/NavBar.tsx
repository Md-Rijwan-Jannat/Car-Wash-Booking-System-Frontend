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
import { FaShopify } from 'react-icons/fa';
import { useGetMeQuery } from '../../redux/features/auth/authApi';
import { getAllSlotBooking } from '../../redux/features/user/slotBookmarkSlice';
import { useGetAllMyBookingsQuery } from '../../redux/features/user/slotBokingApi';
import NavBarCountDown from './NavBarCountDown';
import Logo from '../ui/Logo';

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

  if (token) {
    user = verifyToken(token);
  }

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Dashboard', path: `/dashboard` },
    { name: 'About Us', path: '/aboutUs' },
    { name: 'Contact Us', path: '/contactUs' },
  ].filter(Boolean);

  return (
    <div className="p-3">
      <Navbar maxWidth="xl" className="bg-default-50 bg-opacity-10 rounded-lg">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          <div className="flex items-center justify-center gap-6">
            {menuItems.map((item, index) => (
              <NavbarItem key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'text-warning font-medium' : 'text-white'
                  }
                >
                  {item.name}
                </NavLink>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>

        <div className="flex justify-end">
          <NavbarContent>
            <div className="flex items-center gap-3">
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
              <NavbarItem>
                <ThemeSwitcher />
              </NavbarItem>
              <NavbarItem>
                <div
                  onClick={() => navigate('/dashboard')}
                  className="cursor-pointer"
                >
                  {user && <Avatar name={name} src={profileImg || undefined} />}
                </div>
              </NavbarItem>
              <NavbarItem>
                <div
                  onClick={() => navigate('/booking')}
                  className="cursor-pointer animate-pulse"
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
        </div>

        <NavbarMenu className="lg:hidden">
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
            {user && (
              <Button
                as={NavLink}
                to="/auth/login"
                color="default"
                variant="flat"
              >
                Login
              </Button>
            )}
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
    </div>
  );
};

export default NavBar;
