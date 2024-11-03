import { FC } from 'react';
import { Button, Chip } from '@nextui-org/react';
import { TSlot } from '../../types/slotManagement.type';
import { useTheme } from 'next-themes';
import { formatTo12Hour } from '../../utils/FormatDate';
import { useAppSelector } from '../../redux/hook';
import { TUser, useCurrentUser } from '../../redux/features/auth/authSlice';

type SlotCardProps = {
  slot: TSlot;
  onBookSlot: (slot: TSlot) => void;
};

const SlotCard: FC<SlotCardProps> = ({ slot, onBookSlot }) => {
  const { theme } = useTheme();
  const user = useAppSelector(useCurrentUser) as TUser;

  return (
    <div
      key={slot._id}
      className={`flex flex-col gap-3 items-start border px-3 py-2 rounded-md ${
        theme === 'dark' ? 'border-gray-100 border-opacity-15' : ''
      }`}
    >
      <Chip
        color={slot.isBooked === 'available' ? 'warning' : 'default'}
        variant="faded"
      >
        {slot.date}
      </Chip>
      <div className="flex items-center justify-between gap-3 mb-5 mt-2">
        <Chip color="warning" variant="dot">
          Start: {formatTo12Hour(slot.startTime)}
        </Chip>
        <Chip color="warning" variant="dot">
          End: {formatTo12Hour(slot.endTime)}
        </Chip>
      </div>
      <Button
        color={`${slot.isBooked === 'available' ? 'warning' : 'default'}`}
        variant="bordered"
        size="sm"
        disabled={slot.isBooked !== 'available'}
        onClick={() => onBookSlot(slot)}
      >
        {slot.isBooked === 'available' && user?.role === 'user'
          ? 'Book this slot'
          : 'Slot Unavailable'}
      </Button>
    </div>
  );
};

export default SlotCard;
