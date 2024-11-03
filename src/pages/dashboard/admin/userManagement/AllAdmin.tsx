/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useGetAllAdminsQuery } from "../../../../redux/features/admin/userManagementApi"; // Adjust the import path as needed
import { TMeta, TUserData } from "../../../../types";
import LoaderSkeleton from "../../../../components/skeleton/LoaderSkeleton";
import UserRoleDropdown from "./UserRoleDropdown";
import { useTheme } from "next-themes";
import NoData from "../../../../components/serviceSlots/NoData";

type TAllAdminsProps = object;

const AllAdmins: FC<TAllAdminsProps> = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const queryParams: Record<string, string> = {
    sort: "-createdAt",
    limit: "9",
    page: page.toString(),
  };

  const { data: allAdminsData, isLoading } = useGetAllAdminsQuery(queryParams);
  const admins = allAdminsData?.data as TUserData[];
  const meta = allAdminsData?.meta as TMeta | undefined;

  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!admins || (admins?.length === 0 && undefined)) {
    return <NoData text="There are no admin available" />;
  }

  return (
    <div>
      <div className="mb-3">
        <Chip variant="bordered">All Admins</Chip>
      </div>
      <Table aria-label="Admins Overview Table">
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Update Role</TableColumn>
        </TableHeader>
        <TableBody items={admins || []}>
          {(admin) => (
            <TableRow key={admin._id}>
              <TableCell>
                <User
                  avatarProps={{ radius: "full", src: admin.profileImg }}
                  name={admin.name}
                />
              </TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.phone}</TableCell>
              <TableCell>{admin.address}</TableCell>
              <TableCell>
                <UserRoleDropdown user={admin} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {meta && (
        <div className="mt-10 flex justify-center items-start">
          <Pagination
            color="default"
            variant="flat"
            showControls
            total={meta.totalPage}
            initialPage={page}
            className={`mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-[#F4F4F5] ${
              theme === "dark" ? " bg-opacity-30" : ""
            }`}
            onChange={(newPage) => handlePageChange(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default AllAdmins;
