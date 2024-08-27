import { FC } from "react";
import { FaStar } from "react-icons/fa";
import StarRatingComponent from "react-star-rating-component";

type RatingDisplayProps = {
  rating: number;
  size?: number;
  color?: string;
};

const RatingDisplay: FC<RatingDisplayProps> = ({ rating, size, color }) => {
  return (
    <StarRatingComponent
      name="rating"
      starCount={5}
      value={rating}
      starColor="#ffd700"
      emptyStarColor={color}
      editing={false}
      renderStarIcon={(index, value) => (
        <FaStar
          size={size} // Use the size prop to control the star size
          color={index <= value ? "#ffd700" : color}
        />
      )}
    />
  );
};

export default RatingDisplay;
