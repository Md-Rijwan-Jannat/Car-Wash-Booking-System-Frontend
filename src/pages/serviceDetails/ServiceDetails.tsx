import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../../redux/features/admin/serviceManagement";
import { useGetAllCarBookingSlotsWithServiceQuery } from "../../redux/features/admin/slotManagement";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { TSlot } from "../../types/slotManagement.type";
import { Button, Calendar } from "@nextui-org/react";

const ServiceDetails: FC = () => {
  const { id } = useParams<string>();
  const { theme } = useTheme();

  const { data: serviceData, isLoading: serviceLoading } =
    useGetSingleServiceQuery(id);
  const { data: serviceWithSlotsData, isLoading: slotsLoading } =
    useGetAllCarBookingSlotsWithServiceQuery(id);
  const slotsData = serviceWithSlotsData?.data;

  console.log("slotsData", slotsData);

  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);

  useEffect(() => {
    if (slotsData) {
      setSelectedSlot(null);
    }
  }, [slotsData]);

  // const handleDateChange = (date: Date | null) => {
  //   if (date) {
  //     setSelectedDate(date);
  //     setSelectedSlot(null);
  //   }
  // };

  // const availableSlots =
  //   slotsData?.filter(
  //     (slot: TSlot) =>
  //       new Date(slot.date).toDateString() === selectedDate.toDateString()
  //   ) || [];

  // const handleSlotClick = (slot: TSlot) => {
  //   if (slot.isBooked === "false") {
  //     setSelectedSlot(slot);
  //   }
  // };

  if (serviceLoading || slotsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!serviceData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold mb-4">
              {serviceData?.data.name}
            </h1>
            <img
              src={serviceData?.data.image}
              alt={serviceData?.data.name}
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
            <p className="text-lg mb-4">{serviceData?.data.description}</p>
            <p className="text-lg font-semibold mb-4">
              Price: ${serviceData?.data.price}
            </p>
            <p className="text-lg font-semibold mb-4">
              Duration: {serviceData?.data.duration} minutes
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">Select a Date</h2>
            <Calendar aria-label="Select a date" className="mb-6" />
          </div>
        </div>

        {/* <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Available Booking Slots</h2>
          {availableSlots.length > 0 ? (
            <ul className="list-disc list-inside">
              {availableSlots.map((slot: TSlot) => (
                <li
                  key={slot._id}
                  className={`mb-2 cursor-pointer p-2 rounded-lg ${
                    slot.isBooked === "true"
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-100 hover:bg-blue-200"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  <span className="font-semibold">Date:</span> {slot.date}{" "}
                  <span className="font-semibold">Time:</span> {slot.startTime}{" "}
                  - {slot.endTime}
                </li>
              ))}
            </ul>
          ) : (
            <p>No available slots for this date</p>
          )}
        </div> */}

        {selectedSlot && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => alert(`Booked slot: ${selectedSlot._id}`)} // Replace with actual booking logic
              className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all duration-200"
            >
              Book This Service
            </Button>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <Button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Go Back
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-all duration-200"
          >
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetails;
