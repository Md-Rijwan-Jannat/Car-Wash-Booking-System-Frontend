import { FC } from 'react';
import Banner from '../../components/banner/Banner';
import FeaturedServices from '../../components/featuredServices/FeaturedServices';
import WebsiteReview from '../../components/WebsiteReview/WebsiteReview';
import ServiceHighlights from './ServiceHighligts';
import PricingPlans from './PricingPlans';
import Container from '../../components/ui/Container';

type THomeProps = object;

const Home: FC<THomeProps> = () => {
  return (
    <>
      <Banner />
      <Container>
        <FeaturedServices />
        <ServiceHighlights />
        <PricingPlans />
        <WebsiteReview />
      </Container>
    </>
  );
};

export default Home;
