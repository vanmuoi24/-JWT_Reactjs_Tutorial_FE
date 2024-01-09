import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Nav.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Nav = () => {
  let navi = useNavigate();
  const dataUserLogin = useSelector((state) => state.acount.acount);
  useEffect(() => {
    if (dataUserLogin.isAuthenticated === true) {
      navi("/users");
    }
  }, []);

  return (
    <>
      {dataUserLogin.isAuthenticated === true && (
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
                  <NavLink to={"/"} className="nav-link">
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
