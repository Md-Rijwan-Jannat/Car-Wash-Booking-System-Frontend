// FeaturedServices.tsx
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { Chip, Skeleton } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useGetAllServicesQuery } from '../../redux/features/admin/serviceManagementApi';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import ServiceCard from '../carService/ServiceCard';
import FeatureCard from './FratureCard';

type TFeaturedServicesProps = object;

// SkeletonCard Component
const SkeletonCard: FC = () => (
  <div className="w-full space-y-5 h-[300px]">
    <Skeleton className="rounded-lg">
      <div className="h-[170px] rounded-lg bg-default-300"></div>
    </Skeleton>
    <div className="space-y-3 p-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <div className="flex justify-between gap-3 mt-10">
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  </div>
);

const FeaturedServices: FC<TFeaturedServicesProps> = () => {
  const { theme = 'light' } = useTheme(); // Fallback to 'light' if theme is undefined
  const [itemsCount, setItemsCount] = useState(1);
  const navigate = useNavigate();
  const { data: servicesData, isLoading } = useGetAllServicesQuery({
    limit: '6',
    sort: 'createdAt',
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
    window.addEventListener('resize', updateItemsCount);
    return () => window.removeEventListener('resize', updateItemsCount);
  }, []);

  const handleDetailsPage = (id: string) => {
    navigate(`/service-details/${id}`);
  };

  if (isLoading || !services || services.length === 0) {
    return (
      <div className="mt-10">
        <div className="my-3">
          <SectionTitle
            subHeader="Featured Services"
            header="Professional Car Care Services"
            des="Choose a service that suits your needs. From quick washes to full detailing, we offer everything to keep your car looking its best."
          />
        </div>
        <div className="flex flex-row gap-5 mt-5">
          {[...Array(itemsCount)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 relative max-w-7xl md:mx-auto mx-2">
      <SectionTitle
        subHeader="Featured Services"
        header="Professional Car Care Services"
        des="Choose a service that suits your needs. From quick washes to full detailing, we offer everything to keep your car looking its best."
      />
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service._id}>
            <FeatureCard
              service={service}
              onClick={() => handleDetailsPage(service._id)}
              theme={theme}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedServices;
