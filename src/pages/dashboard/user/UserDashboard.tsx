import { FC } from "react";
import { useAppSelector } from "../../../redux/hook";
import { TUser, useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetMeQuery } from "../../../redux/features/auth/authApi";
import { Avatar, Chip } from "@nextui-org/react";
import { TUserData } from "../../../types";
import { useTheme } from "next-themes";
import { IoMail } from "react-icons/io5";
import { FaAddressBook, FaPhone } from "react-icons/fa";
import { SiNewrelic } from "react-icons/si";
import { GiTargetDummy } from "react-icons/gi";
import { LuClipboardPaste } from "react-icons/lu";
import UserImageModal from "../../../components/modal/UserImageModal";
import UserDetailsModal from "../../../components/modal/UserDetailsModal";

type TUserDashboardProps = object;

const UserDashboard: FC<TUserDashboardProps> = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data: userData } = useGetMeQuery(user?.email);
  const { theme } = useTheme();

  const userDetails = userData?.data as TUserData;
  return (
    <div>
      <div
        className={`border p-2 py-5 rounded-md relative ${
          theme === "dark" ? "border-gray-50 border-opacity-15" : ""
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <Avatar
            className="w-20 h-20"
            src={userDetails?.profileImg}
            alt={userDetails?.name}
          />
          <Chip>{userDetails?.name}</Chip>
        </div>
        <UserImageModal />
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between gap-5 my-10">
        <div
          className={`border w-full rounded-md p-2 ${
            theme === "dark" ? "border-gray-50 border-opacity-15" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <Chip color="default" variant="bordered" className="font-medium">
              User Information
            </Chip>
            <UserDetailsModal />
          </div>
          <div className="mt-5 space-y-2 flex flex-col items-start">
            <Chip
              color="warning"
              variant="faded"
              className="px-2"
              startContent={<IoMail size={16} />}
            >
              {userDetails?.email}
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-2"
              startContent={<FaPhone size={16} />}
            >
              {userDetails?.phone}
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-2"
              startContent={<FaAddressBook size={16} />}
            >
              {userDetails?.address}
            </Chip>
          </div>
        </div>
        <div
          className={`border w-full rounded-md p-2 ${
            theme === "dark" ? "border-gray-50 border-opacity-15" : ""
          }`}
        >
          <Chip color="default" variant="bordered" className="font-medium">
            Activity Information
          </Chip>
          <div className="mt-5 space-y-2 flex flex-col items-start">
            <Chip
              color="warning"
              variant="faded"
              className="px-2"
              startContent={<GiTargetDummy size={16} />}
            >
              Total Booking: 8
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-2"
              startContent={<SiNewrelic size={16} />}
            >
              New Booking: 4
            </Chip>
            <Chip
              color="warning"
              variant="faded"
              className="px-2"
              startContent={<LuClipboardPaste size={16} />}
            >
              Past Booking: 4
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
