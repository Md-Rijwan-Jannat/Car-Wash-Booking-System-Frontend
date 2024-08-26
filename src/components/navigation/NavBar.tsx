import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { ThemeSwitcher } from "../../theme/ThemeSwitcher";
import brandLogo from "../../../public/car-wash-brand-logo.png";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logout,
  useCurrentUserToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/VerifyToken";

type TNavBarProps = object;

const NavBar: FC<TNavBarProps> = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Booking", path: "/booking" },
    { name: "Dashboard", path: "/dashboard/admin" },
    { name: "About Us", path: "/aboutUs" },
    { name: "Contact Us", path: "/contactUs" },
  ];

  // user check and make conditional route
  const token = useAppSelector(useCurrentUserToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  return (
    <Navbar shouldHideOnScroll disableAnimation isBordered>
      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Image
            className={`w-16 md:w-20  px-3 rounded-md ${
              theme === "dark" ? "bg-gray-50 bg-opacity-50" : "bg-[#FEF1DC]"
            }`}
            src={brandLogo}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Image
            className={`w-16 md:w-20  px-3 rounded-md ${
              theme === "dark" ? "bg-gray-50 bg-opacity-50" : "bg-[#FEF1DC]"
            }`}
            src={brandLogo}
          />
        </NavbarBrand>
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
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {user ? (
            <>
              <Button
                as={NavLink}
                to="/auth/login"
                color="default"
                variant="flat"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                as={NavLink}
                to="/auth/login"
                color="default"
                variant="flat"
              >
                Login
              </Button>
            </>
          )}
        </NavbarItem>
        <NavbarItem className="flex gap-3 items-center">
          <Button as={NavLink} to="/auth/signup" color="warning" variant="flat">
            Sign Up
          </Button>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
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
      </NavbarMenu>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
