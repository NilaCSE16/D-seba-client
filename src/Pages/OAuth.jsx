import { useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import { createUserWithGoogle } from "../Redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(createUserWithGoogle());
  };
  return (
    <>
      <div className="form-control card-body -mt-10">
        <button
          onClick={handleSubmit}
          className="btn bg-amber-950 hover:bg-amber-800 text-yellow-300"
        >
          <img src={logo} alt="Logo" className="w-6 h-6" />
          Continue With Google
        </button>
      </div>
    </>
  );
};

export default OAuth;
