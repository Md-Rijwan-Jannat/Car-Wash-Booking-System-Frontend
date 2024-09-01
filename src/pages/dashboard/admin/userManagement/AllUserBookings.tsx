/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useGetAllBookingsQuery } from "../../../../redux/features/admin/serviceManagementApi";
import { TMeta, TSlotBooking } from "../../../../types";
import LoaderSkeleton from "../../../../components/skeleton/LoaderSkeleton";
import NoData from "../../../../components/serviceSlots/NoData";
import { formatTo12Hour } from "../../../../utils/FormatDate";

type TAllUserBookingsProps = object;

const AllUserBookings: FC<TAllUserBookingsProps> = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const queryParams: Record<string, string> = {
    sort: "-createdAt",
    limit: "9",
    page: page.toString(),
  };
  const { data: bookingData, isLoading } = useGetAllBookingsQuery(queryParams);

  const bookings = bookingData?.data as TSlotBooking[] | undefined;
  const meta = bookingData?.meta as TMeta;

  const handlePageChange = (newPage: number) => setPage(newPage);

  // payment status mapping
  const statusColorMap: any = {
    Pending: "warning",
    Paid: "success",
    Failed: "default",
  };

  // table columns
  const columns = [
    { uid: "customer", name: "Customer" },
    { uid: "service", name: "Service" },
    { uid: "vehicleBrand", name: "Vehicle Type" },
    { uid: "slot", name: "Slot" },
    { uid: "totalPrice", name: "Total Price" },
    { uid: "paymentStatus", name: "Payment Status" },
  ];

  const renderCell = useCallback(
    (booking: TSlotBooking, columnKey: keyof TSlotBooking | "actions") => {
      switch (columnKey) {
        case "customer":
          return (
            <User
              avatarProps={{
                radius: "full",
                src: booking.customer?.profileImg,
              }}
              description={booking.customer?.email}
              name={booking.customer?.name}
            />
          );
        case "service":
          return (
            <User
              avatarProps={{
                radius: "full",
                src: booking.service?.[0]?.image,
              }}
              description={"৳ " + booking.service[0]?.price}
              name={booking.service[0]?.name}
            />
          );
        case "vehicleBrand":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize whitespace-nowrap">
                {booking.vehicleBrand} {booking.vehicleModel}
              </p>
              <p className="text-bold text-sm capitalize whitespace-nowrap text-default-400">
                {booking.vehicleType}
              </p>
            </div>
          );
        case "slot":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize whitespace-nowrap">
                {booking.slot[0]?.date}
              </p>
              <p className="text-bold text-sm capitalize whitespace-nowrap text-default-400">
                {formatTo12Hour(booking.slot[0]?.startTime)} -{" "}
                {formatTo12Hour(booking.slot[0]?.endTime)}
              </p>
            </div>
          );
        case "totalPrice":
          return <p>৳{booking.totalPrice}</p>;
        case "paymentStatus":
          return (
            <Chip
              className="capitalize whitespace-nowrap px-5"
              color={statusColorMap[booking.paymentStatus] || "default"}
              size="sm"
              variant="bordered"
            >
              {booking.paymentStatus}
            </Chip>
          );

        default:
          return null;
      }
    },
    []
  );

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!bookings || (bookings?.length === 0 && undefined)) {
    return <NoData text="There are no bookings available" />;
  }

  return (
    <div>
      <Table aria-label="Bookings Overview Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={bookings || []}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item,
                    columnKey as keyof TSlotBooking | "actions"
                  )}
                </TableCell>
              )}
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
            className={`px-5 py-1 mx-3 border-none shadow-none rounded-full bg-[#F4F4F5] ${
              theme === "dark" ? " bg-opacity-30" : ""
            }`}
            onChange={(newPage) => handlePageChange(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default AllUserBookings;
