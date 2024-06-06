import { FaHome, FaUserAlt, FaListUl } from "react-icons/fa";
// import { FaListUl } from "react-icons/fa";
// import { FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaListUl />,
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: <FaUserDoctor />,
  },
  {
    name: "Profile",
    path: "/profile/:id",
    icon: <FaUserAlt />,
  },
  {
    name: "Logout",
    path: "/login",
    icon: <MdOutlineLogout />,
  },
];

//Admin menu
export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: <FaUserDoctor />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <FaUserAlt />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUserAlt />,
  },
  {
    name: "Logout",
    // path: "/login",
    icon: <MdOutlineLogout />,
  },
];
