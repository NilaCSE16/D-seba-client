import moment from "moment";
import Menu from "../../Components/Data/Menu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import API from "../../Services/API";

const DoctorAppointments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  // console.log(appointments);
  const getAppointments = async () => {
    try {
      const { data } = await API.get("/doctor/doctor-appointments", {
        userId: currentUser._id,
      });
      if (data?.success) {
        setAppointments(data.data);
        // alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
    //eslint-disable-next-line
  }, []);
  const handleStatus = async (user, status) => {
    try {
      const { data } = await API.post("/doctor/update-status", {
        appointmentsId: user._id,
        status,
      });
      if (data?.success) {
        getAppointments();
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Menu>
      <h2 className="text-center font-semibold text-3xl py-10">
        Appointments List
      </h2>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-black text-sm">
            <th className="text-center">ID</th>
            {/* <th className="text-center">Name</th>
            <th className="text-center">Phone</th> */}
            <th className="text-center">Date & Time</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((user) => (
            <tr key={user._id}>
              <td className="text-center">{user._id}</td>
              {/* <td className="text-center">
                {user.doctorId.firstName} {user.doctorInfo.lastName}
              </td>
              <td className="text-center">{user.doctorId.phone}</td> */}
              <td className="text-center">
                {/* <span> */}
                {moment(user.date).format("DD-MM-YYYY")}{" "}
                {moment(user.time).format("HH:mm")}
                {/* </span> */}
              </td>
              <td className="text-center">{user.status}</td>
              <td className="text-center">
                {user.status === "Pending" ? (
                  <div>
                    <button
                      onClick={() => handleStatus(user, "Approved")}
                      className="px-3 hover:opacity-85 py-2 bg-green-500 mx-4 rounded-md"
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => handleStatus(user, "Reject")}
                      className="px-3 hover:opacity-85 py-2 bg-red-500 rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <button className="px-3 hover:opacity-85 py-2 bg-red-500 rounded-md">
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
          {/* row 1 */}
        </tbody>
      </table>
    </Menu>
  );
};

export default DoctorAppointments;
