import { createBrowserRouter } from "react-router-dom";
// import Main from "../Layout/Main";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "../../Pages/Doctors/Profile";
import Appointments from "../../Pages/Appointments";
import ApplyDoctor from "../../Pages/ApplyDoctor";
import NotificationPage from "../../Pages/NotificationPage";
import Users from "../../Pages/Admin/Users";
import Doctors from "../../Pages/Admin/Doctors";
import BookingPage from "../../Pages/BookingPage";
import DoctorAppointments from "../../Pages/Doctors/DoctorAppointments";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Main />,
  //   children: [
  //     {
  //       path: "/",
  //       element: (
  //         <PrivateRoute>
  //           <Home />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //     {
  //       path: "/register",
  //       element: <Register />,
  //     },
  //   ],
  // },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/appointments",
    element: <Appointments />,
  },
  {
    path: "/apply-doctor",
    element: <ApplyDoctor />,
  },
  {
    path: "/notification",
    element: <NotificationPage />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/doctors",
    element: <Doctors />,
  },
  {
    path: "/doctor-appointments",
    element: <DoctorAppointments />,
  },
  {
    path: "/book-appointment/:doctorId",
    element: <BookingPage />,
  },
]);

export default router;
