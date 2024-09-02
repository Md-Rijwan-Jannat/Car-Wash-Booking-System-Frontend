import { FC } from "react";
import SlotBooking from "../../components/slotBooking/SlotBooking";

type TBookingsProps = object;

const Bookings: FC<TBookingsProps> = () => {
  return (
    <div className="p-2">
      <SlotBooking />
    </div>
  );
};

export default Bookings;
