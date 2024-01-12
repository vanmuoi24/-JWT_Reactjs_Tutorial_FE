import "./Nav.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getUserLogOut } from "../services/userService";
import { toast } from "react-toastify";
const NavHeader = () => {
  const navi = useNavigate();
  const dataUserLogin = useSelector((state) => state.acount.acount);
  const [shouldRender, setShouldRender] = useState(false);
  const localtion = useLocation();

  const handleLogOut = async () => {
    let res = await getUserLogOut();
    if (res && res.data && res.data.EC === 0) {
      toast.success("Log Out Seccess");
      navi("/login");
    } else {
      toast.error("Log out Fail");
    }
  };
  if (dataUserLogin.isAuthenticated === true || localtion.pathname === "/") {
    return (
      <>
        {" "}
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid className=" container ">
            <Navbar.Brand>React</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px", fontSize: "15px" }}
                navbarScroll
              >
                <Link to={"/"} className=" nav-link ">
                  Home
                </Link>
                <Link to={"/users"} className=" nav-link ">
                  Uses
                </Link>
                <Link to={"/roles"} className=" nav-link ">
                  Roles
                </Link>
                <Link to={"/project"} className=" nav-link ">
                  Project
                </Link>
                <Link to={"/about"} className=" nav-link ">
                  About
                </Link>
              </Nav>

              {dataUserLogin && dataUserLogin.isAuthenticated === true ? (
                <>
                  <span className="me-4">
                    Xin chao : {dataUserLogin.username}
                  </span>

                  <NavDropdown title="Setting" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Link
                      className=" nav-link text-center"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </Link>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link to={"/login"} className=" nav-link ">
                    Log in
                  </Link>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return null;
  }
};

export default NavHeader;
