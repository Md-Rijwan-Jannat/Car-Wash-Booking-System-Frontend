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
} from "@nextui-org/react";
import { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "../../theme/ThemeSwitcher";
import { useTheme } from "next-themes";
import { useAppSelector } from "../../redux/hook";
import {
  TUser,
  useCurrentUser,
  useCurrentUserToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/VerifyToken";
import { FaHandsWash, FaShopify } from "react-icons/fa";
import { useGetMeQuery } from "../../redux/features/auth/authApi";
import { getAllSlotBooking } from "../../redux/features/user/slotBookmarkSlice";

type TNavBarProps = object;

const NavBar: FC<TNavBarProps> = () => {
  const { theme } = useTheme();
  const userData = useAppSelector(useCurrentUser) as TUser;
  const navigate = useNavigate();
  const { data: userDetails } = useGetMeQuery(userData?.email);
  const slotBookingData = useAppSelector(getAllSlotBooking);

  const menuItems = [
    { name: "Services", path: "/services" },
    { name: "Dashboard", path: `/dashboard` },
    { name: "About Us", path: "/aboutUs" },
    { name: "Contact Us", path: "/contactUs" },
  ].filter(Boolean); // Remove undefined values from the array

  const token = useAppSelector(useCurrentUserToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  console.log("userDetails", userDetails);

  return (
    <Navbar shouldHideOnScroll disableAnimation isBordered className="w-full">
      <div className="flex justify-start">
        <NavbarContent className="sm:hidden pr-3" justify="start">
          <NavbarBrand>
            <Link to={"/"}>
              <div
                className={`flex items-center gap-3 border rounded-full px-3 py-1 justify-center w-full ${
                  theme === "dark" ? "border-gray-100 border-opacity-15" : ""
                }`}
              >
                <FaHandsWash className="text-warning" size={35} />
                <h2 className="font-semibold text-warning text-sm md:text-xl hidden md:block">
                  Car Wash
                </h2>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>
      </div>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="w-[150px] lg:w-[200px] md:-ml-[160px]">
          <NavbarBrand className="w-16 md:w-20">
            <Link to={"/"}>
              <div
                className={`flex items-center gap-3 border rounded-full px-3 py-1 justify-center w-full ${
                  theme === "dark" ? "border-gray-100 border-opacity-15" : ""
                }`}
              >
                <FaHandsWash className="text-warning" size={35} />
                <h2 className="font-semibold text-warning text-sm md:text-xl">
                  Car Wash
                </h2>
              </div>
            </Link>
          </NavbarBrand>
        </div>
        <div className="flex items-center justify-center gap-6">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-warning font-medium" : "text-foreground"
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
            <NavbarItem className="hidden lg:flex">
              {!user && (
                <Button
                  as={NavLink}
                  to="/auth/login"
                  color="warning"
                  variant="flat"
                >
                  Login
                </Button>
              )}
            </NavbarItem>
            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>

            <NavbarItem>
              <div
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer"
              >
                {user && (
                  <>
                    <Avatar isBordered src={userDetails?.data?.profileImg} />
                  </>
                )}
              </div>
            </NavbarItem>
            <NavbarItem>
              <div
                onClick={() => navigate("/booking")}
                className="cursor-pointer animate-pulse"
              >
                {user && (
                  <Badge
                    content={slotBookingData?.length || 0}
                    color="warning"
                    variant="flat"
                  >
                    <FaShopify size={30} />
                  </Badge>
                )}
              </div>
            </NavbarItem>
          </div>
        </NavbarContent>
      </div>

      <NavbarMenu className="lg:hidden">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `w-full ${
                  isActive
                    ? index === 2
                      ? "text-warning"
                      : index === menuItems.length - 1
                      ? "text-danger"
                      : "text-foreground"
                    : "text-foreground"
                }`
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
          className={`border size-10 flex items-center justify-center rounded-full text-warning ${
            theme === "dark" ? "border-gray-100 border-opacity-15" : ""
          }`}
        >
          <NavbarMenuToggle />
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
