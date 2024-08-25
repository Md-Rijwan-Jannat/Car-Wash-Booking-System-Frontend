import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import OverviewBookings from "../pages/dashboard/admin/OverviewBookings";
import AllServices from "../pages/dashboard/admin/serviceManagement/AllServices";
import AllSlots from "../pages/dashboard/admin/slotManagement/AllSlots";
import AllUserBookings from "../pages/dashboard/admin/userManagement/AllUserBookings";
import AllUsers from "../pages/dashboard/admin/userManagement/AllUsers";

export const AdminRoutes = [
  {
    path: "",
    element: <AdminDashboard />,
  },
  {
    path: "all-bookings",
    element: <OverviewBookings />,
  },
  {
    path: "all-services",
    element: <AllServices />,
  },
  {
    path: "all-slots",
    element: <AllSlots />,
  },
  {
    path: "all-user-bookings",
    element: <AllUserBookings />,
  },
  {
    path: "all-users",
    element: <AllUsers />,
  },
];
