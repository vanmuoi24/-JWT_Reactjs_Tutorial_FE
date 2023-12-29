import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Nav.scss";
import { useEffect, useState } from "react";

const Nav = () => {
  let navi = useNavigate();
  const [isshow, setIsshow] = useState(false);
  useEffect(() => {
    let session = sessionStorage.getItem("key");
    if (session) {
      setIsshow(true);
      return navi("/users");
    }
  }, []);

  return (
    <>
      {isshow === true && (
        <div className="container">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
              <NavLink className="navbar-brand nav-link " to={"/"}>
                Logo
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mynavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto ">
                  <NavLink to={"/home"} className="nav-link">
                    Home
                  </NavLink>

                  <NavLink to={"/users"} className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to={"/project"} className=" nav-link ">
                    Project
                  </NavLink>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Nav;
