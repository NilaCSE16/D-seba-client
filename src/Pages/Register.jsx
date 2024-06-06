import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../Redux/user/userSlice";
import OAuth from "./OAuth";
import { hideLoading, showLoading } from "../Redux/alert/alertSlice";
import { useState } from "react";

const Register = () => {
  // const base_url = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  // console.log(base_url);
  // console.log(isAdmin);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(isAdmin);
    // console.log({ name, email, password });
    try {
      dispatch(showLoading());
      dispatch(createUser({ name, email, password, isAdmin }));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  return (
    <>
      <div className="hero bg-base-200 py-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-[660px] max-w-sm shadow-2xl bg-base-100">
            <span className="text-3xl mt-8 font-bold text-center">
              Register Form
            </span>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="">
                <input
                  type="radio"
                  name="admin"
                  onClick={() => setIsAdmin(false)}
                />
                <label className="pr-10 pl-2">
                  <span>User</span>
                </label>
                <input
                  type="radio"
                  name="admin"
                  onClick={() => setIsAdmin(true)}
                />
                <label className="pl-2">
                  <span>Admin</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
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
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            <OAuth />
            <p className="text-sm ml-9 mb-10 ">
              Already have an account? Please{" "}
              <Link to={"/login"} className="text-blue-700">
                <b>login now</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
