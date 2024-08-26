import { FC } from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedServices from "../../components/FeaturedServices/FeaturedServices";
import WebsiteReview from "../../components/WebsiteReview/WebsiteReview";

type THomeProps = object;

const Home: FC<THomeProps> = () => {
  return (
    <div>
      <Banner />
      <div className="px-2">
        <FeaturedServices />
        <WebsiteReview />
      </div>
    </div>
  );
};

export default Home;
