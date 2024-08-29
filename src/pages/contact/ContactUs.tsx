import { FC } from "react";
import {
  IoMdPerson,
  IoMdMail,
  IoMdCall,
  IoMdPin,
  IoMdSend,
} from "react-icons/io";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import CWForm from "../../components/form/CWForm";
import CWInput from "../../components/form/CWInput";
import CWTextarea from "../../components/form/CWTextarea";
import { Button, Checkbox } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import BackButton from "../../components/serviceSlots/BackButton";

type TContactUsFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const ContactUs: FC = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  const onSubmit = (data: TContactUsFormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div>
      <BackButton />
      <motion.div
        className={`flex flex-col items-center justify-center gap-8 p-2  ${
          theme === "dark" ? "" : ""
        }`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <CWForm<TContactUsFormValues> onSubmit={onSubmit}>
          <motion.div
            className={`flex flex-col items-center justify-center gap-5 border bg-gray-50 ${
              theme === "dark"
                ? "border-gray-50 border-opacity-15 bg-opacity-10"
                : ""
            } rounded-md p-3 lg:p-5 w-full md:w-[500px]`}
            variants={itemVariants}
          >
            <CWInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              icon={<IoMdPerson className="text-2xl text-warning" />}
            />
            <CWInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              icon={<IoMdMail className="text-2xl text-warning" />}
            />
            <CWInput
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              icon={<IoMdCall className="text-2xl text-warning" />}
            />
            <CWTextarea
              name="address"
              label="Address"
              placeholder="Enter your address"
              endContent={
                <IoMdPin className="text-2xl text-warning pointer-events-none flex-shrink-0" />
              }
              variant="bordered"
              color="warning"
              rows={3}
              required
            />
            <CWTextarea
              name="message"
              label="Your Message"
              placeholder="Write your message here"
              endContent={
                <IoMdSend className="text-2xl text-warning pointer-events-none flex-shrink-0" />
              }
              variant="bordered"
              color="warning"
              rows={5}
              required
            />
            <Button color="warning" variant="flat" type="submit">
              Send Message
            </Button>
            <div className="flex py-2 px-1 justify-between w-full">
              <Checkbox
                classNames={{
                  label: "text-small",
                }}
                color="warning"
              >
                Subscribe to our newsletter
              </Checkbox>
            </div>
            <Link to="/auth/login" className="mt-3 border-b text-primary">
              Already have an account? Log in
            </Link>
          </motion.div>
        </CWForm>
        <motion.div
          className="flex flex-col items-center mt-8 space-y-4"
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-semibold" variants={itemVariants}>
            Follow Us
          </motion.h3>
          <motion.div className="flex gap-4" variants={itemVariants}>
            {/* Add your social media links here */}
            <a href="#" className="text-2xl text-warning">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl text-warning">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl text-warning">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl text-warning">
              <FaLinkedin />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
