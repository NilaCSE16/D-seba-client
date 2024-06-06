import { Link } from "react-router-dom";
import OAuth from "./OAuth";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/user/userSlice";
import { hideLoading, showLoading } from "../Redux/alert/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      dispatch(showLoading());
      dispatch(loginUser({ email, password }));
      // window.location.reload();
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <>
      <div className="hero bg-base-200 py-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-[660px] max-w-sm shadow-2xl bg-base-100">
            <span className="text-3xl mt-8 font-bold text-center">
              Login Form
            </span>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <OAuth />
            <p className="text-sm ml-9 mb-10 ">
              New to D-Appointment? Please{" "}
              <Link to={"/register"} className="text-blue-700">
                <b>register now</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
