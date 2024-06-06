import { useDispatch, useSelector } from "react-redux";
import Menu from "../../Components/Data/Menu";
import { useEffect, useState } from "react";
import API from "../../Services/API";
import { useNavigate, useParams } from "react-router-dom";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { hideLoading, showLoading } from "../../Redux/alert/alertSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  // console.log(doctor);
  const [timings, onChange] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const getDoctorInfo = async () => {
    try {
      const { data } = await API.post("/doctor/getDoctorInfo", {
        userId: params.id,
      });
      if (data?.success) {
        onChange(data.data.timings);
        setDoctor(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);

  //update profile
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const website = form.website.value;
    const address = form.address.value;
    const specialization = form.specialization.value;
    const experience = form.experience.value;
    const feesPerConsultation = form.feesPerConsultation.value;
    // const timings = form.timings.value;
    const info = {
      firstName,
      lastName,
      phone,
      email,
      website,
      address,
      specialization,
      experience,
      feesPerConsultation,
      timings,
    };
    // console.log({ ...info });
    try {
      dispatch(showLoading());
      const { data } = await API.post("/doctor/updateProfile", {
        ...info,
        userId: currentUser._id,
      });
      dispatch(hideLoading());
      if (data?.success) {
        alert(`${data.message}`);
        navigate("/");
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
      <div className="bg-base-200 h-full overflow-y-scroll">
        <h2 className="text-3xl font-bold text-center mt-10">Profile</h2>
        {doctor && (
          <form className="card-body" onSubmit={handleSubmit}>
            <span className="text-xl">Personal Details:</span>
            <div className="grid grid-cols-3 gap-4">
              <div className="">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="name"
                  placeholder="First name"
                  className="input input-bordered w-full"
                  name="firstName"
                  // required
                  defaultValue={doctor?.firstName}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="name"
                  placeholder="Last name"
                  className="input input-bordered w-full"
                  name="lastName"
                  // required
                  defaultValue={doctor?.lastName}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Phone No</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="input input-bordered w-full"
                  name="phone"
                  // required
                  defaultValue={doctor?.phone}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  name="email"
                  // required
                  defaultValue={doctor?.email}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Website</span>
                </label>
                <input
                  type="text"
                  placeholder="Website"
                  className="input input-bordered w-full"
                  name="website"
                  // required
                  defaultValue={doctor?.website}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  name="address"
                  // required
                  defaultValue={doctor?.address}
                />
              </div>
            </div>
            <span className="text-xl mt-6">Professional Details:</span>
            <div className="grid grid-cols-3 gap-4">
              <div className="">
                <label className="label">
                  <span className="label-text">Specialization</span>
                </label>
                <input
                  type="text"
                  placeholder="Specialization"
                  className="input input-bordered w-full"
                  name="specialization"
                  // required
                  defaultValue={doctor?.specialization}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Experience</span>
                </label>
                <input
                  type="text"
                  placeholder="Experience"
                  className="input input-bordered w-full"
                  name="experience"
                  // required
                  defaultValue={doctor?.experience}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Fees Per Consultation</span>
                </label>
                <input
                  type="number"
                  placeholder="Fees Per Consultation"
                  className="input input-bordered w-full"
                  name="feesPerConsultation"
                  // required
                  defaultValue={doctor?.feesPerConsultation}
                />
              </div>
              <div className="">
                <label className="label">
                  <span className="label-text">Timings</span>
                </label>
                <TimeRangePicker
                  onChange={onChange}
                  value={timings}
                  className="w-full h-12 bg-white rounded-md"
                  aria-label
                  // name="timings"
                  shouldCloseClock={null}
                  format="hh:mm a"
                  clearIcon={null}
                  clockIcon={null}
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-red-950 text-yellow-500 rounded-md px-4 py-2 hover:opacity-90">
                Update Now
              </button>
            </div>
          </form>
        )}
      </div>
    </Menu>
  );
};

export default Profile;
