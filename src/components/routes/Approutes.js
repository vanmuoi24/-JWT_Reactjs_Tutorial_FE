import { Route, Routes } from "react-router";
import User from "../user/User";
import Login from "../Login/login";
import Register from "../Register/Register";
import Privateroute from "./PrivateRoutes";
import Homes from "../Home/Home";
import Roles from "../Roles/Roles";
const Approutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Privateroute element={User} />} />
        <Route path="/roles" element={<Privateroute element={Roles} />} />
      </Routes>
    </>
  );
};

export default Approutes;
