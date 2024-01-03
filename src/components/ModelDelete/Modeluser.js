import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import Form from "react-bootstrap/Form";
import { fetchGroup } from "../services/userService";
import { ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
const ModalUser = (props) => {
  const [show, setShow] = useState(false);
  const [userGroup, setuserGroup] = useState([]);
  const defaultData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const [Userdata, setUserdata] = useState(defaultData);
  const checkvalidInput = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setuserGroup(res.data.DT);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ojbchecknput, setobjcheckinput] = useState(checkvalidInput);
  const handlesetinput = (event, name) => {
    let _userdata = _.cloneDeep(Userdata);
    _userdata[name] = event;
    setUserdata(_userdata);
  };
  const checkvaidateInput = () => {
    // create user
    setobjcheckinput(checkvalidInput);
    let cohieu = true;
    let arr = ["email", "phone", "password", "group"];
    let _validinput = _.cloneDeep(checkvalidInput);
    for (let i = 0; i < arr.length; i++) {
      if (!Userdata[arr[i]]) {
        console.log(_validinput);
        _validinput[arr[i]] = false;
        setobjcheckinput(_validinput);
        toast.error(`Empty input ${arr[i]}`);
        cohieu = false;
        break;
      }
    }
    return cohieu;
  };

  const handconfirmUser = () => {
    checkvaidateInput();
  };
  console.log(checkvalidInput);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <div className="row p-md-3 ">
          {" "}
          <div className="form-group mt-3 col-12  col-sm-6">
            <label>
              Email address :(<span style={{ color: "red" }}>*</span>)
            </label>
            <input
              type="email"
              className={
                ojbchecknput.email
                  ? "form-control "
                  : "form-control  is-invalid "
              }
              value={Userdata.email}
              onChange={(event) => handlesetinput(event.target.value, "email")}
            />
          </div>{" "}
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>
              Phone Number :(<span style={{ color: "red" }}>*</span>)
            </label>
            <input
              type="text"
              className={
                ojbchecknput.phone
                  ? "form-control "
                  : "form-control  is-invalid "
              }
              value={Userdata.phone}
              onChange={(event) => handlesetinput(event.target.value, "phone")}
            />
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>User Name :</label>

            <input
              type="text"
              className="form-control"
              value={Userdata.username}
              onChange={(event) =>
                handlesetinput(event.target.value, "username")
              }
            />
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>
              Passord :(<span style={{ color: "red" }}>*</span>)
            </label>
            <input
              type="text"
              className={
                ojbchecknput.password
                  ? "form-control "
                  : "form-control  is-invalid "
              }
              value={Userdata.password}
              onChange={(event) =>
                handlesetinput(event.target.value, "password")
              }
            />
          </div>
          <div className="form-group mt-3  col-12  col-sm-12">
            <label>Adress :</label>
            <input
              type="text"
              className="form-control"
              vvaue={Userdata.address}
              onChange={(event) => handlesetinput(event.target.value, "adress")}
            />
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>Grender :</label>

            <Form.Select
              className={
                ojbchecknput.sex ? "form-select " : "form-select  is-invalid "
              }
              aria-label="Default select example"
              onChange={(event) => handlesetinput(event.target.value, "sex")}
            >
              <option>chọn Giới Tính</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Female">Female </option>
            </Form.Select>
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>
              Group :(<span style={{ color: "red" }}>*</span>)
            </label>
            <Form.Select
              className={
                ojbchecknput.group ? "form-select " : "form-select  is-invalid "
              }
              aria-label="Default select example"
              onChange={(event) => handlesetinput(event.target.value, "group")}
            >
              <option>chọn Phân Quyền</option>
              {userGroup.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handconfirmUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
