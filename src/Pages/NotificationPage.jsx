import { useDispatch, useSelector } from "react-redux";
import Menu from "../Components/Data/Menu";
import { hideLoading, showLoading } from "../Redux/alert/alertSlice";
import API from "../Services/API";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useEffect, useState } from "react";

const NotificationPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await API.post("/user/get-all-notification", {
        userId: currentUser._id,
      });
      dispatch(hideLoading());
      if (data?.success) {
        // console.log(data);
        setUser(data.data);
        // window.location.reload();
        alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert("Something went wrong");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await API.post("/user/delete-all-notification", {
        userId: currentUser._id,
      });
      dispatch(hideLoading());
      if (data?.success) {
        // window.location.reload();
        setUser(data.data);
        alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <Menu>
      <h1 className="pt-5 text-center text-2xl font-semibold">Notification</h1>
      <div role="tablist" className="tabs tabs-bordered mt-10">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Unread"
          defaultChecked={true}
        />
        <div role="tabpanel" className="tab-content bg-base-100 p-6">
          <div className="w-full justify-end flex mb-5">
            <h4
              className="font-semibold text-sm cursor-pointer bg-red-900 text-yellow-500 rounded-md px-2 py-1"
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMsg, index) => (
            <div key={index} className="cursor-pointer">
              <div onClick={() => navigate(notificationMsg.onClickPath)}>
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Read"
          // checked
        />
        <div
          // onClick={handleMarkAllRead}
          role="tabpanel"
          className="tab-content bg-base-100 p-6"
        >
          <div className="w-full justify-end flex mb-5">
            <h4
              onClick={handleDeleteAllRead}
              className="font-semibold text-sm cursor-pointer bg-red-900 text-yellow-500 rounded-md px-2 py-1"
            >
              Delete All Read
            </h4>
          </div>
          {user?.seenNotification.map((notificationMsg, index) => (
            <div key={index} className="cursor-pointer">
              <div onClick={() => navigate(notificationMsg.onClickPath)}>
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Menu>
  );
};

export default NotificationPage;
