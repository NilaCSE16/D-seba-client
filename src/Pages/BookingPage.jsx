import { useEffect, useState } from "react";
import Menu from "../Components/Data/Menu";
import API from "../Services/API";
import { useParams } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alert/alertSlice";

const BookingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState([]);
  // const [value, onChange] = useState("10:00");
  const [value, setValue] = useState("10:00");
  const [startDate, setStartDate] = useState(new Date());
  // console.log(doctor);
  const params = useParams();
  const dispatch = useDispatch();
  const [available, setAvailable] = useState(false);
  const getUserData = async () => {
    try {
      // dispatch(showLoading());
      const { data } = await API.post("/doctor/getDoctorById", {
        doctorId: params.doctorId,
      });
      // dispatch(hideLoading());
      // console.log(data);
      if (data?.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  const handleBooking = async () => {
    try {
      setAvailable(true);
      if (!startDate || !value) {
        return alert("Date and Time required");
      }
      dispatch(showLoading());
      const { data } = await API.post("/user/book-appointment", {
        doctorId: params.doctorId,
        userId: currentUser._id,
        userInfo: currentUser,
        doctorInfo: doctor,
        date: startDate,
        time: value,
      });
      dispatch(hideLoading());
      if (data?.success) {
        alert(`${data.message}`);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const { data } = await API.post("/user/booking-availability", {
        doctorId: params.doctorId,
        date: startDate,
        time: value,
      });
      dispatch(hideLoading());
      if (data?.success) {
        setAvailable(true);
        alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Menu>
      <h2 className="text-3xl font-bold text-center py-10">Booking Page</h2>
      {doctor && (
        <div>
          <div className="m-2">
            <h3>
              {doctor.firstName} {doctor.lastName}
            </h3>
            <h3>
              Fees:
              {doctor.feesPerConsultation}
            </h3>
            {doctor.timings && (
              <h3>
                Timings:
                {doctor.timings[0]} - {doctor.timings[1]}
              </h3>
            )}
            <div className="w-[50%]">
              <DatePicker
                className="input input-bordered my-3 w-full"
                selected={startDate}
                onChange={(date) => {
                  setAvailable(false);
                  setStartDate(date);
                }}
                dateFormat="dd-MM-yyyy"
                // showIcon
              />
              <br />
              <TimePicker
                className={"w-[41%] h-12"}
                onChange={(value) => {
                  setAvailable(false);
                  setValue(value);
                }}
                value={value}
              />
              <br />
              <button
                onClick={handleAvailability}
                className="px-3 py-2 mt-3 w-[40%] rounded-md bg-red-900 text-yellow-500 hover:opacity-85"
              >
                Check Availability
              </button>
              <br />
              {available && (
                <button
                  onClick={handleBooking}
                  className="px-3 py-2 my-3 w-[40%] rounded-md bg-slate-900 text-white hover:opacity-85"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Menu>
  );
};

export default BookingPage;
