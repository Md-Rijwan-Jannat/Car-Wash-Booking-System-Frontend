import { FC, useState, useEffect } from "react";
import { Chip, Pagination, Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useGetAllMyBookingsQuery } from "../../../../redux/features/user/slotBokingApi";
import { TMeta, TSlotBooking } from "../../../../types";
import LoaderSkeleton from "../../../../components/skeleton/LoaderSkeleton";
import NoData from "../../../../components/serviceSlots/NoData";
import { formatTo12Hour } from "../../../../utils/FormatDate";
import { FaClock } from "react-icons/fa";

type TUpcomingBookingProps = object;

const UpcomingBooking: FC<TUpcomingBookingProps> = () => {
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const queryParams: Record<string, string> = {
    sort: "-createdAt",
    limit: "4",
    page: page.toString(),
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetAllMyBookingsQuery(queryParams);

  const bookings = bookingData?.data as TSlotBooking[];
  const meta = bookingData?.meta as TMeta;

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

  const getCountdown = (startDateTime: Date) => {
    const timeDiff = startDateTime.getTime() - currentDate.getTime();
    if (timeDiff <= 0) return "Start Vehicle Service";

    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (error) {
    return <NoData text="An error occurred while fetching data" />;
  }

  if (!bookings || bookings.length === 0) {
    return <NoData text="There are no upcoming bookings available" />;
  }

  return (
    <div className={`md:p-3 ${theme === "dark" ? " " : "bg-white text-black"}`}>
      <Chip variant="bordered" className="mb-5">
        Upcoming Bookings
      </Chip>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 justify-between items-center">
        {bookings
          .filter((booking) => {
            // Check if any of the slots in the booking are upcoming
            return booking.slot.some((slot) => {
              const bookingDateTime = parseDate(slot.date, slot.startTime);
              return bookingDateTime > currentDate;
            });
          })
          .map((booking) => {
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
                  {validSlots.map((slot, index) => (
                    <Tooltip key={index} content={"Starting service"}>
                      <div
                        className={`bg-gray-50 rounded-full py-2 px-5 font-semibold w-[200px] border text-warning ${
                          theme === "dark"
                            ? "bg-opacity-10 border-gray-100 border-opacity-15"
                            : ""
                        } mb-3`}
                      >
                        <p>
                          {getCountdown(parseDate(slot.date, slot.startTime))}
                        </p>
                        <p className="text-[14px] font-normal">
                          Service starting time
                        </p>
                      </div>
                    </Tooltip>
                  ))}
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
                    <div
                      key={index}
                      className="flex items-center justify-center"
                    >
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

export default UpcomingBooking;
