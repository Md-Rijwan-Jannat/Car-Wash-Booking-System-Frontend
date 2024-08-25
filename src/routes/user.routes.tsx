import NewBookings from "../pages/dashboard/user/Bookings/NewBookings";
import PastBookings from "../pages/dashboard/user/Bookings/PastBookings";
import OverviewMyBooking from "../pages/dashboard/user/OverviewMyBooking";
import UserDashboard from "../pages/dashboard/user/UserDashboard";

export const UserRoutes = [
  {
    path: "",
    element: <UserDashboard />,
  },
  {
    path: "my-bookings",
    element: <OverviewMyBooking />,
  },
  {
    path: "new-bookings",
    element: <NewBookings />,
  },
  {
    path: "past-bookings",
    element: <PastBookings />,
  },
];
