import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../services/userService";

const Register = () => {
  let navi = useNavigate();
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [username, setusername] = useState("");
  const [pass, setpass] = useState("");
  const [comfirmpass, setpcomfirm] = useState("");
  const defauvalue = {
    isValuesEmail: true,
    isValuesphone: true,
    isValuesname: true,
    isValuespass: true,
    isValuescomfirmpass: true,
  };
  const [ojbchecknput, setobjcheckinput] = useState(defauvalue);
  const isvalue = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setobjcheckinput(defauvalue);
    if (!email) {
      setobjcheckinput({ ...defauvalue, isValuesEmail: false });
      toast.error("Email is required");

      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      setobjcheckinput({ ...defauvalue, isValuesEmail: false });
      return false;
    }

    if (!phone) {
      toast.error("Phone number is required");
      setobjcheckinput({ ...defauvalue, isValuesphone: false });
      return false;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number format");
      return false;
    }
    if (!username) {
      setobjcheckinput({ ...defauvalue, isValuesname: false });
      toast.error("user required");
      return false;
    }
    if (!pass) {
      setobjcheckinput({ ...defauvalue, isValuespass: false });
      toast.error("passs required");
      return false;
    }
    if (pass !== comfirmpass) {
      setobjcheckinput({ ...defauvalue, isValuescomfirmpass: false });
      toast.error("comfrim required");
      return false;
    }
    return true;
  };

  const handlevalue = async () => {
    if (!isvalue()) {
      return false;
    } else {
      let respon = await registerNewUser(email, phone, username, pass);
      console.log(respon);
      let severdata = respon.data;
      console.log(severdata);
      if (+severdata.EC === 0) {
        toast.success(severdata.EM);
        navi("/login");
      } else {
        toast.error(severdata.EM);
      }
    }
  };
  return (
    <div className="container">
      <div className="row p-5 justify-content-center ">
        <div className="col-sm-6 from">
          <div>
            <h3 className="text-center"> Register</h3>
          </div>
          <form action="#" onSubmit={handlevalue}>
            <label>Email:</label>
            <div className="mb-3">
              <input
                type="text"
                className={
                  ojbchecknput.isValuesEmail
                    ? "form-control "
                    : "form-control  is-invalid "
                }
                value={email}
                onChange={(event) => setemail(event.target.value)}
                placeholder="Email or phone number"
              />
            </div>
            <div className="mb-3">
              <label>Phone number:</label>
              <input
                type="text"
                value={phone}
                onChange={(event) => setphone(event.target.value)}
                className={
                  ojbchecknput.isValuesphone
                    ? "form-control "
                    : "form-control  is-invalid "
                }
                placeholder="Phone number"
              />
            </div>
            <div className="mb-3">
              <label>User Name:</label>
              <input
                type="text"
                className={
                  ojbchecknput.isValuesname
                    ? "form-control "
                    : "form-control  is-invalid "
                }
                placeholder="User name"
                value={username}
                onChange={(event) => setusername(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password:</label>
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
            <div className="mb-3">
              <label>Comfirm Password:</label>
              <input
                type="password"
                className={
                  ojbchecknput.isValuescomfirmpass
                    ? "form-control "
                    : "form-control  is-invalid "
                }
                placeholder="Password"
                value={comfirmpass}
                onChange={(event) => setpcomfirm(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>

            <hr />
            <div className="text-center mt-3">
              <NavLink to={"/login"} className="btn btn-success ">
                Already've an account Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
