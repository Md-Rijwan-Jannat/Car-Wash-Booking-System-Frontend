/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Skeleton } from "@nextui-org/react";
import { FC, useMemo, useEffect } from "react";
import { TSlot } from "../../types/slotManagement.type";
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
import SlotCard from "./SlotCard";
import SlotSkeleton from "../skeleton/ServiceSlotSkeleton";

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
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`; // Adjusted to format as MM-DD-YYYY
  };

  const getUniqueDates = () => {
    const uniqueDates = new Set<string>();
    slotsData?.forEach((slot: TSlot) => {
      if (isValidDate(slot.date)) {
        const formattedDate = formatDate(new Date(slot.date));
        uniqueDates.add(formattedDate);
      }
    });
    return Array.from(uniqueDates);
  };

  const uniqueDates = useMemo(() => getUniqueDates(), [slotsData]);

  console.log("uniqueDates", uniqueDates);

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
      console.log("ISO date format", selectedDateISO, slotDateISO);
      return slotDateISO === selectedDateISO;
    });
  }, [slotsData, selectedDate]);

  console.log("filteredSlot=>", filteredSlots);

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

  if (slotsLoading) {
    return <SlotSkeleton />;
  }
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
            <SlotCard
              key={slot._id}
              slot={slot}
              onBookSlot={slotBookingHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesSlots;
