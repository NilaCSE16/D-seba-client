import Navbar from "../../Pages/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Pages/Shared/Footer";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";

const Main = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      <Navbar />
      {/* <div className="min-h-screen "> */}
      {loading ? <Spinner /> : <Outlet />}
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Main;
