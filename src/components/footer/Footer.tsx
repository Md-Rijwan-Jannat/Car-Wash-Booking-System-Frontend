import { FC } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import brandLogo from "../../../public/car-wash-brand-logo.png";
import { motion } from "framer-motion";

type TFooterProps = object;

const Footer: FC<TFooterProps> = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-10${theme === "dark" ? "" : ""}`}>
      <div className="container mx-auto px-4">
        {/* Logo and Description */}
        <motion.div
          className="flex flex-col items-center sm:flex-row sm:justify-start gap-5 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            className={`w-20 md:w-24 px-3 rounded-md ${
              theme === "dark" ? "bg-gray-50 bg-opacity-50" : "bg-[#FEF1DC]"
            }`}
            src={brandLogo}
          />
          <p className="mt-4 sm:mt-0 text-center sm:text-left max-w-md">
            Providing top-notch car wash services with the best products and
            professionals in the industry.
          </p>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <Link
              to="/services"
              className="block hover:text-warning font-normal mb-2"
            >
              Car Wash
            </Link>
            <Link
              to="/services"
              className="block hover:text-warning font-normal mb-2"
            >
              Detailing
            </Link>
            <Link
              to="/services"
              className="block hover:text-warning font-normal mb-2"
            >
              Waxing
            </Link>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <Link
              to="/aboutUs"
              className="block hover:text-warning font-normal mb-2"
            >
              About Us
            </Link>
            <Link
              to="/contactUs"
              className="block hover:text-warning font-normal mb-2"
            >
              Contact Us
            </Link>
            <Link
              to="/dashboard/admin"
              className="block hover:text-warning font-normal mb-2"
            >
              Dashboard
            </Link>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center sm:justify-start gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl hover:text-warning" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl hover:text-warning" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl hover:text-warning" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xl hover:text-warning" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className={`text-center border-t pt-6 ${
            theme === "dark" ? "border-gray-50 border-opacity-15" : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {currentYear} Car Wash Company. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
