/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Chip, Skeleton } from "@nextui-org/react";
import { FC, useMemo, useEffect } from "react";
import { TSlot } from "../../types/slotManagement.type";
import { useTheme } from "next-themes";
import { useGetAllCarBookingSlotsWithServiceQuery } from "../../redux/features/admin/slotManagementApi";
import NoData from "./NoData";
import {
  addBookmark,
  TSlotBookmark,
} from "../../redux/features/user/slotBookmarkSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

type TServicesSlotsProps = {
  slotsId: string | undefined;
  selectedDate: string | null;
  availableDays?: (dates: string[]) => void;
  onSelectDate?: (date: string) => void;
};

const ServicesSlots: FC<TServicesSlotsProps> = ({
  slotsId,
  selectedDate,
  availableDays,
}) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const { data: serviceWithSlotsData, isLoading: slotsLoading } =
    useGetAllCarBookingSlotsWithServiceQuery(slotsId);
  const slotsData = serviceWithSlotsData?.data;

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const getUniqueDates = () => {
    const uniqueDates = new Set<string>();
    slotsData?.forEach((slot: TSlot) => {
      if (isValidDate(slot.date)) {
        uniqueDates.add(formatDate(new Date(slot.date)));
      }
    });
    return Array.from(uniqueDates);
  };

  const uniqueDates = useMemo(() => getUniqueDates(), [slotsData]);

  useEffect(() => {
    if (availableDays) {
      availableDays(uniqueDates); // Pass uniqueDates to parent
    }
  }, [uniqueDates, availableDays]);

  const filteredSlots = useMemo(() => {
    if (!selectedDate || !isValidDate(selectedDate)) return slotsData;

    const selectedDateISO = formatDate(new Date(selectedDate));

    return slotsData?.filter((slot: TSlot) => {
      const slotDateISO = formatDate(new Date(slot.date));
      return slotDateISO === selectedDateISO;
    });
  }, [slotsData, selectedDate]);

  if (slotsLoading) {
    return (
      <div className="flex flex-col mt-6">
        <Skeleton className="w-[80px] h-[25px] rounded-lg" />
        <div className="mt-3">
          <Skeleton className="w-full h-[200px] rounded-lg" />
        </div>
      </div>
    );
  }

  const slotBookingHandler = (slot: TSlot) => {
    const slotBookingData: TSlotBookmark = {
      serviceId: slot.service._id,
      slotId: slot._id,
      serviceName: slot.service.name,

      serviceImage: slot.service.image,
      duration: slot.service.duration,
      price: slot.service.price,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };

    if (user) {
      dispatch(addBookmark(slotBookingData));
      toast.success("Slot successfully bookmarked!");
    } else {
      navigate("/auth/signup");
    }

    console.log("Slot booking data:", slotBookingData);
  };

  return (
    <div className="mt-6 flex flex-col justify-center">
      <div className="my-3">
        <Chip variant="faded">Services slots</Chip>
      </div>

      {!filteredSlots?.length ? (
        <NoData text="There are no slots available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between w-full gap-3">
          {filteredSlots?.map((slot: TSlot) => (
            <div
              key={slot._id}
              className={`flex flex-col gap-3 items-start border px-3 py-2 rounded-md ${
                theme === "dark" ? "border-gray-100 border-opacity-15" : ""
              }`}
            >
              <Chip
                color={slot.isBooked === "available" ? "warning" : "default"}
                variant="faded"
              >
                {slot.date}
              </Chip>
              <div className="flex items-center justify-between gap-3 mb-5 mt-2">
                <Chip color="warning" variant="dot">
                  Start Time: {slot.startTime}
                </Chip>
                <Chip color="warning" variant="dot">
                  End Time: {slot.endTime}
                </Chip>
              </div>
              <Button
                color={`${
                  slot.isBooked === "available" ? "warning" : "default"
                }`}
                variant="bordered"
                size="sm"
                disabled={slot.isBooked !== "available"}
                onClick={() => slotBookingHandler(slot)}
              >
                {slot.isBooked === "available"
                  ? "Book this slot"
                  : "Slot Unavailable"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesSlots;
