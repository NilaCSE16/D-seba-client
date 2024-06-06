import { useEffect, useState } from "react";
import Menu from "../../Components/Data/Menu";
import API from "../../Services/API";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //   console.log(doctors);
  const getDoctors = async () => {
    try {
      const { data } = await API.get("/admin/getAllDoctors");
      if (data?.success) {
        setDoctors(data.data);
        // alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);
  const handleAccountStatus = async (doctor, status) => {
    try {
      const { data } = await API.post("/admin/changeAccountStatus", {
        doctorId: doctor._id,
        userId: doctor.userId,
        status: status,
      });
      if (data?.success) {
        alert(`${data.message}`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <Menu>
      <div className="h-full overflow-y-scroll">
        <h2 className="text-center font-semibold text-3xl my-10">
          Doctors List
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-black text-sm">
                <th className="text-center">Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Phone No</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="text-center">
                    {doctor.firstName} {doctor.lastName}
                  </td>
                  <td className="text-center">{doctor.status}</td>
                  <td className="text-center">{doctor.phone}</td>
                  <td className="text-center">
                    {/* <div className="flex"> */}
                    {doctor.status === "Pending" ? (
                      <button
                        onClick={() => handleAccountStatus(doctor, "Approved")}
                        className="px-3 hover:opacity-85 py-2 bg-green-500 rounded-md"
                      >
                        Approve
                      </button>
                    ) : (
                      <button className="px-3 hover:opacity-85 py-2 bg-red-500 rounded-md">
                        Reject
                      </button>
                    )}
                    {/* </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Menu>
  );
};

export default Doctors;
