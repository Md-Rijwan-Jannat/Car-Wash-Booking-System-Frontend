import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  logout,
  TUser,
  useCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useGetMeQuery } from "../../../redux/features/auth/authApi";
import { Avatar, Button, Chip } from "@nextui-org/react";
import { TUserData } from "../../../types";
import { useTheme } from "next-themes";
import { IoMail } from "react-icons/io5";
import { FaAddressBook, FaPhone } from "react-icons/fa";
import { SiNewrelic } from "react-icons/si";
import { GiTargetDummy } from "react-icons/gi";
import { LuClipboardPaste } from "react-icons/lu";
import UserImageModal from "../../../components/modal/UserImageModal";
import UserDetailsModal from "../../../components/modal/UserDetailsModal";
import { NavLink } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../redux/features/admin/userManagementApi";

type TUserDashboardProps = object;

const AdminDashboard: FC<TUserDashboardProps> = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data: userData } = useGetMeQuery(user?.email);
  const { data: allUsers } = useGetAllUsersQuery({ limit: "100000000000" });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const userDetails = userData?.data as TUserData;
  return (
    <div
      className={`p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`border p-4 rounded-md shadow-md ${
          theme === "dark" ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <Avatar
            className="w-24 h-24"
            src={userDetails?.profileImg}
            alt={userDetails?.name}
          />
          <Chip color="warning" variant="dot" className="text-lg">
            {userDetails?.name} ({userDetails?.role})
          </Chip>
          <Button
            as={NavLink}
            color="warning"
            variant="flat"
            className="w-[100px] mt-4"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>
        <UserImageModal />
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mt-10">
        <div
          className={`border rounded-md p-4 shadow-md ${
            theme === "dark" ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <Chip
              color="default"
              variant="bordered"
              className="font-medium text-xl"
            >
              Admin Information
            </Chip>
            <UserDetailsModal />
          </div>
          <div className="space-y-3 space-x-2">
            <Chip
              color="warning"
              variant="faded"
              className="px-4 py-2"
              startContent={<IoMail size={20} />}
            >
              {userDetails?.email}
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-4 py-2"
              startContent={<FaPhone size={20} />}
            >
              {userDetails?.phone}
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-4 py-2"
              startContent={<FaAddressBook size={20} />}
            >
              {userDetails?.address}
            </Chip>
          </div>
        </div>
        <div
          className={`border rounded-md p-4 shadow-md ${
            theme === "dark" ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <Chip
            color="default"
            variant="bordered"
            className="font-medium text-xl"
          >
            Website Activity
          </Chip>
          <div className="space-y-3 space-x-2 mt-4">
            <Chip
              color="warning"
              variant="faded"
              className="px-4 py-2"
              startContent={<GiTargetDummy size={20} />}
            >
              Total Users: {allUsers?.data.length}
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-4 py-2"
              startContent={<SiNewrelic size={20} />}
            >
              Recent Logins: 5
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-4 py-2"
              startContent={<LuClipboardPaste size={20} />}
            >
              Recent Activity: 35
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
