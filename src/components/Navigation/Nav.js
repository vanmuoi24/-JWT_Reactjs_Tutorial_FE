import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
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
              <NavLink to={"/about"} className="nav-link">
                about
              </NavLink>

              <NavLink to={"/contact"} className="nav-link">
                contact
              </NavLink>
              <NavLink to={"/link"} className=" nav-link ">
                Link
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
