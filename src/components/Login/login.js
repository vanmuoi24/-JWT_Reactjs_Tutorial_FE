import { NavLink, json, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState } from "react";

import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
const Login = () => {
  let navi = useNavigate();
  const [valueLogin, setvalueLogin] = useState("");
  const [pass, setpass] = useState("");
  const defauvalue = {
    isValuesEmail: true,
    isValuespass: true,
  };
  const [ojbchecknput, setobjcheckinput] = useState(defauvalue);
  const handleLogin = async () => {
    setobjcheckinput(defauvalue);
    if (!valueLogin) {
      toast.error("please enter your phone number ");
      setobjcheckinput({ ...defauvalue, isValuesEmail: false });
      return;
    }
    if (!pass) {
      toast.error("please enter your password ");
      setobjcheckinput({ ...defauvalue, isValuespass: false });
      return;
    }
    let res = await loginUser(valueLogin, pass);
    if (res && res.data && +res.data.EC === 0) {
      toast.success(res.data.EM);
      let datauserlogin = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("key", JSON.stringify(datauserlogin));
      navi("/users");
    } else {
      toast.error(res.data.EM);
    }
  };
  return (
    <div className="container">
      <div className="row p-5 ">
        <div className="text col-sm-6  ">
          <h1 className="texth1">Facebook</h1>
          <p className=" fw-bolder">Connect with friends and the world</p>
          <p>around you on Facebook.</p>
        </div>
        <div className="col-sm-6 input-row p-md-4">
          <div>
            <h3 className="text-center"> Login</h3>
          </div>
          <form action="#">
            <div className="mb-3">
              <label>Email :</label>
              <input
                type="text"
                className={
                  ojbchecknput.isValuesEmail
                    ? "form-control "
                    : "form-control  is-invalid "
                }
                placeholder="Email or phone number"
                value={valueLogin}
                onChange={(event) => setvalueLogin(event.target.value)}
              />
            </div>
            <label>Password :</label>
            <div className="mb-3">
              <input
                type="password"
                className={
                  ojbchecknput.isValuespass
                    ? "form-control "
                    : "form-control  is-invalid "
                }
                placeholder="Password"
                value={pass}
                onChange={(event) => setpass(event.target.value)}
              />
            </div>
          </form>
          <div className="d-grid gap-2 mt-5 ">
            <button onClick={handleLogin} className="btn btn-primary col-12">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
