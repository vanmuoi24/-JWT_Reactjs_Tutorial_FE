import { Route, Routes } from "react-router";
import User from "../user/User";
import Login from "../Login/login";
import Register from "../Register/Register";
import Privateroute from "./PrivateRoutes";
import Homes from "../Home/Home";
const Approutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Privateroute path="/users" element={<User></User>}></Privateroute>
      <Privateroute path="/home" element={<Homes></Homes>}></Privateroute>
    </>
  );
};

export default Approutes;
