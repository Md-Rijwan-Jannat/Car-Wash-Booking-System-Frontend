import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaCar,
  FaWater,
  FaTools,
  FaShower,
  FaTint,
  FaWind,
} from 'react-icons/fa';
import { useTheme } from 'next-themes';
import SectionTitle from '../../components/ui/SectionTitle';

const services = [
  {
    icon: <FaCar className="text-4xl text-warning" />,
    title: 'Exterior Wash',
    description:
      'High-quality exterior wash that leaves your car shining like new.',
  },
  {
    icon: <FaWater className="text-4xl text-warning" />,
    title: 'Interior Cleaning',
    description: 'Deep interior cleaning to remove all dirt, dust, and odors.',
  },
  {
    icon: <FaTools className="text-4xl text-warning" />,
    title: 'Engine Detailing',
    description:
      'Comprehensive engine cleaning for optimal performance and appearance.',
  },
  {
    icon: <FaShower className="text-4xl text-warning" />,
    title: 'Underbody Wash',
    description:
      "Thorough underbody wash to remove dirt and salt, protecting your car's underside.",
  },
  {
    icon: <FaTint className="text-4xl text-warning" />,
    title: 'Wax & Polish',
    description:
      'Premium wax and polish service that gives your car a mirror-like finish.',
  },
  {
    icon: <FaWind className="text-4xl text-warning" />,
    title: 'Tire & Wheel Cleaning',
    description:
      'Detailed tire and wheel cleaning for a spotless, like-new appearance.',
  },
];

const ServiceHighlights: React.FC = () => {
  const { theme } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      className="py-12 rounded-md"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <SectionTitle
        subHeader="Our Services"
        header="Explore Our Car Care Options"
        des="Choose a service tailored to your vehicle's needs, ensuring it stays clean and well-maintained."
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5"
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg border hover:shadow-lg transition-shadow duration-300 cursor-pointer text-center transform bg-default-50 text-default-900 border-default-100 flex flex-col items-center justify-center
            `}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-default-800">{service.icon}</h2>
            <h3 className="text-xl font-semibold mt-4 text-default-900">
              {service.title}
            </h3>
            <p className="mt-2 text-default-600">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ServiceHighlights;
