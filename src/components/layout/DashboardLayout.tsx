// src/components/layout/DashboardLayout.tsx
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { SidebarItem, Sidebar } from "./Sidebar";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { FaCalendar, FaBook, FaTools } from "react-icons/fa";
import { GiTargetDummy } from "react-icons/gi";
import { SiNewrelic } from "react-icons/si";
import { LuClipboardPaste } from "react-icons/lu";
import BackButton from "../serviceSlots/BackButton";

const DashboardLayout: FC = () => {
  const { role } = useAppSelector(useCurrentUser) as TUser;

  return (
    <div className="flex h-screen max-w-7xl mx-auto">
      <Sidebar>
        {role === "admin" && (
          <>
            <SidebarItem
              icon={<FaTools />}
              text="All Bookings"
              active={false}
              link="/dashboard/all-bookings"
            />
            <SidebarItem
              icon={<FaTools />}
              text="All Services"
              active={false}
              link="/dashboard/all-services"
            />
            <SidebarItem
              icon={<FaTools />}
              text="All Slots"
              active={false}
              link="/dashboard/all-slots"
            />
            <SidebarItem
              icon={<FaTools />}
              text="All User Bookings"
              active={false}
              link="/dashboard/all-user-bookings"
            />
            <SidebarItem
              icon={<FaTools />}
              text="All Users"
              active={false}
              link="/dashboard/all-users"
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
          link="/#"
        />
        <SidebarItem
          icon={<FaBook />}
          text="Documentation"
          active={false}
          link="/$"
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
