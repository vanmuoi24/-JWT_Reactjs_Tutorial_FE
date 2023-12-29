import { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router";

const Privateroute = (props) => {
  let navi = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem("key");
    if (!session) {
      return navi("/login");
    }
  }, []);

  return (
    <Routes>
      {" "}
      <Route {...props} />
    </Routes>
  );
};

export default Privateroute;
