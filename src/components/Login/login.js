import { NavLink } from "react-router-dom";
import "./login.scss";

const Login = () => {
  return (
    <div className="container">
      <div className="row p-5 ">
        <div className="text col-sm-6  ">
          <h1 className="texth1">Facebook</h1>
          <p className=" fw-bolder">Connect with friends and the world</p>
          <p>around you on Facebook.</p>
        </div>
        <div className="col-sm-6 from">
          <div>
            <h3 className="text-center"> Login</h3>
          </div>
          <form action="#">
            <div className="mb-3">
              <label>Email :</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email or phone number"
                required
              />
            </div>
            <label>Password :</label>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <div className="text-center mt-3 ">
              <a href="#" className="forgot">
                Forgot password?
              </a>
            </div>
            <hr />
            <div className="text-center mt-3">
              <NavLink to={"/register"} className="btn btn-success ">
                Create new account
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
