import { FC, useState } from "react";
import { useGetAllWebsiteReviewsQuery } from "../../redux/features/websiteReviewApi";
import { motion } from "framer-motion";
import { Button, Chip } from "@nextui-org/react";
import AddReviewModal from "./AddReviewModal";
import { useTheme } from "next-themes";
import { useAppSelector } from "../../redux/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import RatingDisplay from "./Rating";

type TWebsiteReviewProps = object;

const WebsiteReview: FC<TWebsiteReviewProps> = () => {
  const [showAll, setShowAll] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { data: websiteReviewData } = useGetAllWebsiteReviewsQuery({
    limit: "10", // Fetch more than two reviews
  });

  const reviewHandler = () => {
    navigate("/auth/login");
  };

  const websiteReviews = websiteReviewData?.data || [];

  // Display only the first two reviews by default
  const displayedReviews = showAll
    ? websiteReviews
    : websiteReviews.slice(0, 2);

  // Calculate overall site rating
  const overallRating =
    websiteReviews.reduce((acc, review) => acc + review.rating, 0) /
    websiteReviews.length;

  return (
    <div className="mt-10 mx-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-center mb-6">
          Customer Reviews
        </h2>
        {user ? (
          <AddReviewModal />
        ) : (
          <Button onClick={reviewHandler} color="warning" variant="flat">
            Add Review
          </Button>
        )}
      </div>
      <Chip>
        <div className="text-center flex items-center gap-3 font-semibold">
          Overall website rating: {overallRating.toFixed(1)} / 5{" "}
          <RatingDisplay rating={overallRating} size={14} color="#ffffff" />
        </div>
      </Chip>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {displayedReviews.map((review) => (
          <motion.div
            key={review._id}
            className={`p-4 border rounded-lg shadow-md relative ${
              theme === "dark"
                ? "bg-blend-darken border-gray-100 border-opacity-15"
                : "bg-white"
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <img
                src={review.user.profileImg}
                alt={review.user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.user.name}</h3>
                <div className="flex space-x-1 text-warning">
                  <RatingDisplay
                    rating={review.rating}
                    size={20}
                    color="#E4E6E7"
                  />
                </div>
              </div>
            </div>
            <p
              className={`mt-4 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {review.feedback}
            </p>
            <div className="text-right text-sm text-gray-500 mt-2 absolute right-2 bottom-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
      {websiteReviews.length > 2 && (
        <div className="text-center mt-8">
          <Button
            color="default"
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 font-semibold rounded-lg shadow-md hover:bg-secondaryColor transition duration-300"
          >
            {showAll ? "Show Less" : "See More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WebsiteReview;
