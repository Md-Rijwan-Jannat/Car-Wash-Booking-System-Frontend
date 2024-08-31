// src/components/layout/DashboardLayout.tsx
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { SidebarItem, Sidebar } from "./Sidebar";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { FaCalendar, FaBook, FaUsers, FaUser } from "react-icons/fa";
import { GiTargetDummy } from "react-icons/gi";
import { SiNewrelic } from "react-icons/si";
import { LuClipboardPaste } from "react-icons/lu";
import BackButton from "../serviceSlots/BackButton";
import { FaCheckToSlot, FaServicestack } from "react-icons/fa6";

const DashboardLayout: FC = () => {
  const { role } = useAppSelector(useCurrentUser) as TUser;

  return (
    <div className="flex h-screen max-w-7xl mx-auto">
      <Sidebar>
        {role === "admin" && (
          <>
            <SidebarItem
              icon={<FaServicestack />}
              text="All Services"
              active={false}
              link="/dashboard/all-services"
            />
            <SidebarItem
              icon={<FaCheckToSlot />}
              text="All Slots"
              active={false}
              link="/dashboard/all-slots"
            />
            <SidebarItem
              icon={<GiTargetDummy />}
              text="All Bookings"
              active={false}
              link="/dashboard/all-bookings"
            />
            <SidebarItem
              icon={<FaUser />}
              text="All User Bookings"
              active={false}
              link="/dashboard/all-user-bookings"
            />
            <SidebarItem
              icon={<FaUsers />}
              text="All Users"
              active={false}
              link="/dashboard/all-users"
            />
            <SidebarItem
              icon={<FaUsers />}
              text="All Admins"
              active={false}
              link="/dashboard/all-admins"
            />
          </>
        )}
        {role === "user" && (
          <>
            <SidebarItem
              icon={<GiTargetDummy />}
              text="My Bookings"
              active={false}
              link="/dashboard/my-bookings"
            />
            <SidebarItem
              icon={<SiNewrelic />}
              text="New Bookings"
              active={false}
              link="/dashboard/new-bookings"
            />
            <SidebarItem
              icon={<LuClipboardPaste />}
              text="Past Bookings"
              active={false}
              link="/dashboard/past-bookings"
            />
          </>
        )}
        <SidebarItem
          icon={<FaCalendar />}
          text="Calendar"
          active={false}
          link="/calender"
        />
        <SidebarItem
          icon={<FaBook />}
          text="Documentation"
          active={false}
          link="/documentation"
        />
      </Sidebar>
      <div className="px-2 md:px=4 py-4 w-full">
        <div className="-mt-5">
          <BackButton />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
