import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import { IoNotificationsSharp } from "react-icons/io5";
import { hideLoading, showLoading } from "../../Redux/alert/alertSlice";
import { logoutUser } from "../../Redux/user/userSlice";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { FaHome, FaUserAlt, FaListUl } from "react-icons/fa";
// import { FaListUl } from "react-icons/fa";
// import { FaUserAlt } from "react-icons/fa";
// import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import API from "../../Services/API";

const Menu = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(currentUser);
  const dispatch = useDispatch();
  const getUser = async () => {
    if (!currentUser) {
      try {
        dispatch(showLoading());
        const { data } = await API.post("/user/getUserData", {
          userId: currentUser?._id,
        });
        dispatch(hideLoading());
        if (data?.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
  };
  useEffect(() => {
    getUser();
  });
  // const [cnt, setCnt] = useState(false);
  // console.log(cnt);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(currentUser?.notification.length);
  // const dispatch = useDispatch();

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <FaListUl />,
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: <FaUserAlt />,
    },
    {
      name: "Logout",
      path: "/login",
      icon: <MdOutlineLogout />,
    },
  ];

  // const handleLogout = () => {
  //   try {
  //     dispatch(showLoading());
  //     dispatch(logoutUser());
  //     dispatch(hideLoading());
  //   } catch (error) {
  //     // console.log(error);
  //     dispatch(hideLoading());
  //     alert("Something went wrong");
  //   }
  // };
  //rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="p-2 min-h-screen">
        <div className="flex">
          <div
            className="min-h-[100%] w-[300px] text-yellow-300 mr-5 rounded-md bg-red-950"
            style={{ boxShadow: "0 0 2px gray" }}
          >
            <div>
              <h6 className="text-[1.5rem] text-center font-bold font-serif my-5">
                D-SEBA
              </h6>
              <hr className="border-yellow-500" />
            </div>
            <div className="justify-center pt-10">
              {SidebarMenu.map((menu, index) => {
                return (
                  <span key={index}>
                    <div
                      className={`mt-7 flex ${
                        location.pathname === menu.path &&
                        "bg-yellow-500 text-red-900 font-bold"
                      }`}
                    >
                      <span
                        className="mx-3 active:bg-yellow-300 active:text-red-900 py-3"
                        style={{ fontSize: "22px" }}
                      >
                        {menu.icon}
                      </span>
                      {menu.name === "Logout" ? (
                        <button
                          onClick={() => dispatch(logoutUser())}
                          className="text-[1.2rem] -mt-1"
                        >
                          {menu.name}
                        </button>
                      ) : (
                        <Link to={menu.path} className="text-[1.2rem] mt-2">
                          {menu.name}
                        </Link>
                      )}
                    </div>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="w-[100%] h-[100%]">
            <div
              className="h-16 mb-5 bg-white"
              style={{ boxShadow: "0 0 2px gray" }}
            >
              <div className="text-red-950 flex mx-4 items-center justify-end h-full">
                {/* Header */}
                <Badge
                  onClick={() => {
                    navigate("/notification");
                  }}
                  badgeContent={`${user?.notification.length}`}
                  color={"error"}
                  className="mr-6 cursor-pointer"
                >
                  <IoNotificationsSharp
                    className=""
                    style={{ fontSize: "1.5rem" }}
                  />
                </Badge>
                <Link to="/profile" className="mx-2 -mt-1 uppercase">
                  {user?.name}
                </Link>
              </div>
            </div>
            <div
              className="h-[85vh] mb-5 bg-white"
              style={{ boxShadow: "0 0 2px gray" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
