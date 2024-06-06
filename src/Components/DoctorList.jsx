import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  //   console.log(doctor);
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    specialization,
    experience,
    feesPerConsultation,
    timings,
  } = doctor;
  return (
    // <>
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <hr />
        <p>
          <b>Specialization: </b>
          {specialization}
        </p>
        <p>
          <b>Experience: </b>
          {experience}
        </p>
        <p>
          <b>Fees per Consultation: </b>
          {feesPerConsultation} Tk
        </p>
        <p>
          <b>Timings: </b>
          {timings[0]}-{timings[1]}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => navigate(`/book-appointment/${doctor._id}`)}
            className="px-3 py-2 rounded-md bg-red-900 text-yellow-500 hover:opacity-85"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
    // </>
  );
};

export default DoctorList;
