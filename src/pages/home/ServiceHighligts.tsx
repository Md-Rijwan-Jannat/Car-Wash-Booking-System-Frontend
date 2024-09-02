import React from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaWater,
  FaTools,
  FaShower,
  FaTint,
  FaWind,
} from "react-icons/fa";
import { useTheme } from "next-themes";
import { Chip } from "@nextui-org/react";

const services = [
  {
    icon: <FaCar className="text-4xl text-warning" />,
    title: "Exterior Wash",
    description:
      "High-quality exterior wash that leaves your car shining like new.",
  },
  {
    icon: <FaWater className="text-4xl text-warning" />,
    title: "Interior Cleaning",
    description: "Deep interior cleaning to remove all dirt, dust, and odors.",
  },
  {
    icon: <FaTools className="text-4xl text-warning" />,
    title: "Engine Detailing",
    description:
      "Comprehensive engine cleaning for optimal performance and appearance.",
  },
  {
    icon: <FaShower className="text-4xl text-warning" />,
    title: "Underbody Wash",
    description:
      "Thorough underbody wash to remove dirt and salt, protecting your car's underside.",
  },
  {
    icon: <FaTint className="text-4xl text-warning" />,
    title: "Wax & Polish",
    description:
      "Premium wax and polish service that gives your car a mirror-like finish.",
  },
  {
    icon: <FaWind className="text-4xl text-warning" />,
    title: "Tire & Wheel Cleaning",
    description:
      "Detailed tire and wheel cleaning for a spotless, like-new appearance.",
  },
];

const ServiceHighlights: React.FC = () => {
  const { theme } = useTheme();
  return (
    <motion.section
      className="py-12 rounded-md "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Chip size="lg" variant="bordered" className="text-xl">
        Our Services
      </Chip>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`bg-gray-50 p-6 rounded-lg border hover:shadow transition-shadow duration-300 text-center ${
              theme === "dark"
                ? "bg-opacity-5 border-gray-100 border-opacity-15"
                : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {service.icon}
            <h3 className="text-xl font-semibold mt-4 text-warning">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ServiceHighlights;
