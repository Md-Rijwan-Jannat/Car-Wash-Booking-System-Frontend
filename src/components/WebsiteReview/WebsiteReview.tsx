import { FC, useState } from "react";
import { useGetAllWebsiteReviewsQuery } from "../../redux/features/websiteReviewApi";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import AddReviewModal from "./AddReviewModal";
import { useTheme } from "next-themes";

type TWebsiteReviewProps = object;

const WebsiteReview: FC<TWebsiteReviewProps> = () => {
  const { data: websiteReviewData } = useGetAllWebsiteReviewsQuery({
    limit: "10", // Fetch more than two reviews
  });
  const { theme } = useTheme();

  const [showAll, setShowAll] = useState(false);
  const websiteReviews = websiteReviewData?.data || [];

  // Display only the first two reviews by default
  const displayedReviews = showAll
    ? websiteReviews
    : websiteReviews.slice(0, 2);

  return (
    <div className="mt-10 mx-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-center mb-6">
          Customer Reviews
        </h2>
        <AddReviewModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {displayedReviews.map((review) => (
          <motion.div
            key={review._id}
            className={`p-4 border rounded-lg shadow-md ${
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
                <div className="flex space-x-1 text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < review.rating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className={`mt-4 ${theme === "dark" ? "text-gray-400" : ""}`}>
              {review.feedback}
            </p>
            <div className="text-right text-sm text-gray-500 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>

      {websiteReviews.length > 2 && (
        <div className="text-center mt-8">
          <Button
            color="default"
            variant="ghost"
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
