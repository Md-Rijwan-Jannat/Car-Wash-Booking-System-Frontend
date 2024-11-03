import { FC, useState, useEffect } from "react";
import { Chip, Pagination, Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useGetAllMyBookingsQuery } from "../../../../redux/features/user/slotBokingApi";
import { TSlotBooking } from "../../../../types";
import LoaderSkeleton from "../../../../components/skeleton/LoaderSkeleton";
import NoData from "../../../../components/serviceSlots/NoData";
import { formatTo12Hour } from "../../../../utils/FormatDate";
import { FaClock } from "react-icons/fa";
import CountDownSlots from "./CountDownSlots";

type TUpcomingBookingProps = object;

const UpcomingBooking: FC<TUpcomingBookingProps> = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const queryParams: Record<string, string> = {
    sort: "-createdAt",
    limit: "100000",
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetAllMyBookingsQuery(queryParams);

  const bookings = bookingData?.data as TSlotBooking[];
  const limitPerPage = 4;

  const handlePageChange = (newPage: number) => setPage(newPage);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to parse the date string in "d-m-yyyy" format
  const parseDate = (dateString: string, timeString: string) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes); // Months are 0-indexed
  };

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (error) {
    return <NoData text="An error occurred while fetching data" />;
  }

  // Filter bookings that have upcoming slots
  const upcomingBookings = bookings?.filter((booking) =>
    booking.slot.some(
      (slot) => parseDate(slot.date, slot.startTime) > currentDate
    )
  );

  // Paginate filtered bookings
  const paginatedBookings = upcomingBookings?.slice(
    (page - 1) * limitPerPage,
    page * limitPerPage
  );

  const totalPageCount = Math.ceil(upcomingBookings.length / limitPerPage);

  if (!upcomingBookings || upcomingBookings.length === 0) {
    return <NoData text="There are no upcoming bookings available" />;
  }

  return (
    <div className={`md:p-3 ${theme === "dark" ? " " : "bg-white text-black"}`}>
      <Chip variant="bordered" className="mb-5">
        Upcoming Bookings
      </Chip>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 justify-between items-center">
        {paginatedBookings.map((booking) => {
          const validSlots = booking.slot.filter((slot) => {
            const bookingDateTime = parseDate(slot.date, slot.startTime);
            return bookingDateTime > currentDate;
          });

          return (
            <div
              key={booking._id}
              className={`p-2 md:p-3 border rounded-md ${
                theme === "dark" ? "border-gray-100 border-opacity-15" : ""
              }`}
            >
              <div className="text-center flex flex-col md:flex-wrap md:flex-row gap-3 items-center justify-center md:justify-between">
                <CountDownSlots
                  slotDates={validSlots.map((slot) => [slot.date])}
                />
              </div>
              <div className="my-3">
                <div className="flex items-center justify-between mb-3">
                  <Tooltip content={booking.service[0]?.name}>
                    <p className="font-medium">
                      {booking.service[0]?.name?.length > 15
                        ? `${booking.service[0]?.name.slice(0, 12)}...`
                        : booking.service[0]?.name}
                    </p>
                  </Tooltip>
                  <div className="flex flex-col gap-2">
                    <Chip
                      color="success"
                      variant="faded"
                      className="capitalize"
                    >
                      ৳ {booking.totalPrice} {booking.paymentStatus}
                    </Chip>
                  </div>
                </div>
              </div>
              <Chip variant="bordered" className="mt-4 mb-1">
                Customer Details
              </Chip>
              <div className="flex flex-col gap-2 mt-3">
                <Chip color="warning" variant="bordered">
                  Name: {booking.name}
                </Chip>
                <Chip color="warning" variant="bordered">
                  Email: {booking.email}
                </Chip>
                <Chip color="warning" variant="bordered">
                  Vehicle Type: {booking.vehicleType}
                </Chip>
                <Chip color="warning" variant="bordered">
                  Vehicle Details: {booking.vehicleModel}
                </Chip>
              </div>
              <div className="flex flex-col md:flex-wrap md:flex-row items-start md:items-center justify-start md:justify-between md:gap-3 mt-5">
                {validSlots.map((slot, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Chip
                      className="mt-2"
                      startContent={<FaClock />}
                      color="warning"
                      variant="faded"
                    >
                      {formatTo12Hour(slot.startTime)} -{" "}
                      {formatTo12Hour(slot.endTime)}
                    </Chip>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center items-start">
        <Pagination
          color="default"
          variant="flat"
          showControls
          total={totalPageCount}
          initialPage={page}
          className={`mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-[#F4F4F5] ${
            theme === "dark" ? " bg-opacity-30" : ""
          }`}
          onChange={(newPage) => handlePageChange(newPage)}
        />
      </div>
    </div>
  );
};

export default UpcomingBooking;
