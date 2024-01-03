import { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router";

const Privateroute = ({ element: Element, ...rest }) => {
  let navi = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem("key");
    if (!session) {
      navi("/l");
    }
  }, []);

  return <Element {...rest} />;
};

export default Privateroute;
