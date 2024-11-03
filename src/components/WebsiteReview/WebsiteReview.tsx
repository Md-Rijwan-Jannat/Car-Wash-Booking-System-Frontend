import { FC, useRef } from 'react';
import { useGetAllWebsiteReviewsQuery } from '../../redux/features/websiteReviewApi';
import { motion } from 'framer-motion';
import { Button, Chip, Tooltip } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useAppSelector } from '../../redux/hook';
import { useCurrentUser } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import RatingDisplay from './Rating';
import AddReviewModal from '../modal/AddReviewModal';
import WebsiteReviewSkeleton from './WebsiteReviewSkeleton';
import SectionTitle from '../ui/SectionTitle';
import { VscEmptyWindow } from 'react-icons/vsc';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type WebsiteReviewType = {
  _id: string;
  user: {
    name: string;
    profileImg: string;
  };
  rating: number;
  feedback: string;
  createdAt: string;
};

const WebsiteReview: FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const user = useAppSelector(useCurrentUser);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { data: websiteReviewData, isLoading: reviewLoading } =
    useGetAllWebsiteReviewsQuery({ limit: '10' });

  const reviewHandler = () => {
    navigate('/auth/login');
  };

  const websiteReviews: WebsiteReviewType[] = websiteReviewData?.data || [];

  // Calculate overall site rating
  const overallRating =
    websiteReviews.length > 0
      ? websiteReviews.reduce((acc, review) => acc + review.rating, 0) /
        websiteReviews.length
      : 0;

  if (reviewLoading) {
    return <WebsiteReviewSkeleton />;
  }

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <div className="mt-10 mx-2">
      <SectionTitle
        subHeader="Customer Reviews"
        header="What Our Clients Say"
        des="Read real testimonials from our satisfied clients. We pride ourselves on our quality of service and customer satisfaction."
      />
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="text-center flex items-center gap-3 font-semibold bg-default-300 px-4 py-1 rounded-lg">
          Overall website rating: {overallRating.toFixed(1)} / 5{' '}
          <RatingDisplay rating={overallRating} size={14} color="#ffffff" />
        </div>

        {user ? (
          <AddReviewModal />
        ) : (
          <Button
            onClick={reviewHandler}
            color="warning"
            variant="shadow"
            radius="full"
            className="text-white"
          >
            Add Review
          </Button>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          isIconOnly
          radius="full"
          startContent={<IoIosArrowBack size={25} />}
          onClick={handlePrevSlide}
          aria-label="Previous review"
          className="bg-default-200 p-1 rounded-full text-warning-500"
        />
        <Button
          isIconOnly
          radius="full"
          startContent={<IoIosArrowForward size={25} />}
          onClick={handleNextSlide}
          aria-label="Next review"
          className="bg-default-200 p-1 rounded-full text-warning-500"
        />
      </div>

      {websiteReviews.length === 0 ? (
        <div className="flex items-center justify-center w-full mt-5">
          <h2 className="text-default-900 text-center text-sm flex flex-col items-center gap-2 bg-default-50 rounded-lg px-6 py-1 my-10">
            <VscEmptyWindow className="text-warning text-lg" />
            No reviews are here!
          </h2>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={3} // Adjust based on your responsiveness needs
          autoplay={{ delay: 5000 }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-5"
        >
          {websiteReviews.map((review) => (
            <SwiperSlide key={review._id}>
              <motion.div
                className={`p-4 border rounded-lg bg bg-default-50 my-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={review.user?.profileImg}
                    alt={review.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">
                      {review.user?.name}
                    </h3>
                    <div className="flex space-x-1 text-warning">
                      <RatingDisplay
                        rating={review.rating}
                        size={14}
                        color="#E4E6E7"
                      />
                    </div>
                  </div>
                </div>{' '}
                <p className={`mt-4 text-xs text-default-800`}>
                  {review.feedback}
                </p>
                <div className="text-right text-xs text-default-600 mt-4">
                  {format(new Date(review.createdAt), 'MMMM dd, yyyy')}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default WebsiteReview;
