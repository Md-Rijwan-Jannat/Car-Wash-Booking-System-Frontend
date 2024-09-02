import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const images = [
  "https://res.cloudinary.com/dihqveqyc/image/upload/v1725259261/fcndoplz9igyxfozfzdn.jpg",
  "https://res.cloudinary.com/dihqveqyc/image/upload/v1725259258/t6vsckoinzgf3p0g7ahx.jpg",
  "https://res.cloudinary.com/dihqveqyc/image/upload/v1725259258/fvw9ynggqnc3m212tswl.jpg",
  "https://res.cloudinary.com/dihqveqyc/image/upload/v1725259258/dpultgpvxg9usomnixky.jpg",
  "https://res.cloudinary.com/dihqveqyc/image/upload/v1725259255/gk4aqiclmfl1kevc4cmq.jpg",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden -mt-[90px]">
      <AnimatePresence initial={false}>
        {images.map((image, index) =>
          index === currentIndex ? (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
                <motion.p
                  className="text-warning-300 text-lg uppercase tracking-wide mb-3"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Modern Equipment
                </motion.p>
                <h1 className="text-white text-2xl md:text-5xl lg:text-7xl font-bold mb-4">
                  Quality Service for You
                </h1>
                <motion.p
                  className="text-white text-sm md:text-medium text-md mb-8 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Duis eu commodo massa. Integer volutpat imperdiet libero vel
                  laoreet sed euismod ligula.
                </motion.p>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => navigate("/aboutUs")}
                    color="warning"
                    size="lg"
                    variant="ghost"
                  >
                    Read more
                  </Button>
                  <Button
                    onClick={() => navigate("/services")}
                    color="warning"
                    size="lg"
                    variant="shadow"
                  >
                    Order now
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <Button
        onClick={prevSlide}
        size="sm"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black rounded-md focus:outline-none hidden md:block"
      >
        <IoMdArrowDropleft size={25} />
      </Button>
      <Button
        onClick={nextSlide}
        size="sm"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black rounded-md focus:outline-none hidden md:block"
      >
        <IoMdArrowDropright size={25} />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            initial={{ scale: 0.9 }}
            animate={{
              scale: index === currentIndex ? 1.2 : 0.9,
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
