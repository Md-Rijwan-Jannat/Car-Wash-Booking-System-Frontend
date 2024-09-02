import { FC } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Chip } from "@nextui-org/react";

type TAboutUsProps = object;

const AboutUs: FC<TAboutUsProps> = () => {
  const { theme } = useTheme();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="p-2">
      <div
        className={`p-2 rounded-lg border  ${
          theme === "dark" ? "border-gray-100 border-opacity-15" : ""
        }`}
      >
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Our Car Washing Services
        </motion.h2>
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p custom={0} variants={textVariants}>
            <strong>Comprehensive Exterior Cleaning:</strong> Our services
            include a thorough exterior wash using premium quality soaps and
            waxes to protect your car’s paint.
          </motion.p>
          <motion.p custom={1} variants={textVariants}>
            <strong>Interior Detailing:</strong> We offer deep cleaning of your
            car’s interior, including vacuuming, upholstery cleaning, and
            dashboard polishing.
          </motion.p>
          <motion.p custom={2} variants={textVariants}>
            <strong>Engine Bay Cleaning:</strong> Keep your engine clean and
            running efficiently with our engine bay cleaning service.
          </motion.p>
          <motion.p custom={3} variants={textVariants}>
            <strong>Wheel and Tire Shine:</strong> We’ll make your wheels and
            tires shine like new with our specialized cleaning products.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h3 custom={4} variants={textVariants}>
            <Chip variant="bordered" size="lg">
              Our Mission
            </Chip>
          </motion.h3>
          <motion.p custom={5} variants={textVariants}>
            Our mission is to provide top-quality car washing and detailing
            services, ensuring customer satisfaction and maintaining the value
            of your vehicle. We are committed to eco-friendly practices and
            delivering excellence in every wash.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h3
            className="text-2xl font-semibold"
            custom={6}
            variants={textVariants}
          >
            <Chip variant="bordered" size="lg">
              Why Choose Us?
            </Chip>
          </motion.h3>
          <motion.ul
            className="list-disc list-inside space-y-2"
            custom={7}
            variants={textVariants}
          >
            <li>Experienced and professional staff</li>
            <li>High-quality products and eco-friendly solutions</li>
            <li>Convenient mobile service</li>
            <li>Affordable membership plans</li>
            <li>100% satisfaction guarantee</li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="mt-8 space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h3
            className="text-2xl font-semibold"
            custom={8}
            variants={textVariants}
          >
            <Chip variant="bordered" size="lg">
              Customer align
            </Chip>
          </motion.h3>
          <motion.blockquote
            className="border-l-4 border-warning pl-4 italic"
            custom={9}
            variants={textVariants}
          >
            "I've never seen my car look this good! The attention to detail is
            amazing, and the team is super friendly." - Jane Doe
          </motion.blockquote>
          <motion.blockquote
            className="border-l-4 border-warning pl-4 italic"
            custom={10}
            variants={textVariants}
          >
            "The mobile service is a lifesaver. I don't have to leave my house,
            and my car looks brand new every time." - John Smith
          </motion.blockquote>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
