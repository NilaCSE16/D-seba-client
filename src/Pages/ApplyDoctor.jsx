import { useState } from "react";
import Menu from "../Components/Data/Menu";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/alert/alertSlice";
import API from "../Services/API";

const ApplyDoctor = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [timings, onChange] = useState("10:00");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    console.log({ ...info });
    try {
      dispatch(showLoading());
      const { data } = await API.post("/user/apply-doctor", {
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
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center">Apply Doctor</h2>
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    shouldCloseClock={null}
                    format="hh:mm a"
                    clearIcon={null}
                    clockIcon={null}
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="bg-red-950 text-yellow-500 rounded-md px-4 py-2 hover:opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Menu>
  );
};

export default ApplyDoctor;
