import AboutUs from "../pages/about/AboutUs";
import Bookings from "../pages/booking/Bookings";
import ContactUs from "../pages/contact/ContactUs";
import Home from "../pages/home/Home";
import Services from "../pages/service/Services";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import Success from "../pages/success/Success";

export const MainRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "services",
    element: <Services />,
  },
  {
    path: "booking",
    element: <Bookings />,
  },
  {
    path: "aboutUs",
    element: <AboutUs />,
  },
  {
    path: "contactUs",
    element: <ContactUs />,
  },
  {
    path: "service-details",
    element: <ServiceDetails />,
  },
  {
    path: "success",
    element: <Success />,
  },
];
