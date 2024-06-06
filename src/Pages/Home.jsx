import { useEffect, useState } from "react";
import API from "../Services/API";
import Menu from "../Components/Data/Menu";
import DoctorList from "../Components/DoctorList";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const { data } = await API.get("/user/getAllDoctors");
      // console.log(data);
      if (data?.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Menu>
      <h1 className="text-center font-bold text-3xl py-10">Home Page</h1>
      <div className="grid grid-cols-4 mx-10">
        {doctors?.map((doctor) => (
          <DoctorList key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </Menu>
  );
};

export default Home;
