import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router";

const Privateroute = ({ element: Element, ...rest }) => {
  let navi = useNavigate();
  const dataUserLogin = useSelector((state) => state.acount.acount);
  console.log(dataUserLogin);
  useEffect(() => {
    if (dataUserLogin.isAuthenticated === false) {
      navi("/login");
    }
  }, []);

  return <Element {...rest} />;
};

export default Privateroute;
