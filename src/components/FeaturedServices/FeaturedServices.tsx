import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { Card, Chip, Image, Skeleton } from "@nextui-org/react";
import { FaDollarSign } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { useGetAllServicesQuery } from "../../redux/features/admin/serviceManagement";
import { motion } from "framer-motion";

type TFeaturedServicesProps = object;

const FeaturedServices: FC<TFeaturedServicesProps> = () => {
  const { theme } = useTheme();
  const [itemsCount, setItemsCount] = useState(1);

  const { data: servicesData, isLoading } = useGetAllServicesQuery({
    limit: "6",
    sort: "createdAt",
  });
  const services = servicesData?.data;

  useEffect(() => {
    const updateItemsCount = () => {
      if (window.innerWidth >= 1280) {
        setItemsCount(4);
      } else if (window.innerWidth >= 1024) {
        setItemsCount(3);
      } else if (window.innerWidth >= 768) {
        setItemsCount(2);
      } else {
        setItemsCount(1);
      }
    };

    updateItemsCount();
    window.addEventListener("resize", updateItemsCount);
    return () => window.removeEventListener("resize", updateItemsCount);
  }, []);

  if (isLoading || !services || services.length === 0) {
    // Show loading placeholders
    return (
      <div className="flex flex-row gap-5 mt-10">
        {[...Array(itemsCount)].map((_, index) => (
          <Card key={index} className="w-full space-y-5" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-64 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3 p-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <div className="flex justify-between gap-3 mt-5">
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 relative max-w-7xl md:mx-auto mx-2">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000, // Time between slides
          disableOnInteraction: false, // Continue autoplay after user interactions
        }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service._id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`shadow-lg rounded-xl overflow-hidden w-full h-[450px] relative ${
                theme === "dark"
                  ? "bg-blend-darken text-white border border-gray-50 border-opacity-15"
                  : "bg-white text-gray-900 border"
              }`}
            >
              <Image
                src={service.image}
                alt={service.name}
                width={600}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
                <div className="flex justify-between items-center gap-3 inset-0 z-10 absolute top-[400px] px-2">
                  <Chip
                    startContent={<FaDollarSign size={18} />}
                    variant="flat"
                    size="md"
                    color="default"
                  >
                    <p>{service.price}</p>
                  </Chip>
                  <Chip
                    startContent={<FaClock size={18} />}
                    variant="flat"
                    color="warning"
                  >
                    <p>{service.duration} minutes</p>
                  </Chip>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedServices;
