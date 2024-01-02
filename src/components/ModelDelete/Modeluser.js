import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { fetchGroup } from "../services/userService";
import { ListGroup } from "react-bootstrap";
const ModalUser = (props) => {
  const [show, setShow] = useState(false);
  const [userGroup, setuserGroup] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setaddress] = useState("");
  const [sex, setsex] = useState("");
  const [group, setGroup] = useState("");
  const [userGroups, setUserGroups] = useState([]);
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
  console.log(userGroup);
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
            <input type="email" className="form-control" />
          </div>{" "}
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>
              Phone Number :(<span style={{ color: "red" }}>*</span>)
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>User Name :</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>
              Passord :(<span style={{ color: "red" }}>*</span>)
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group mt-3  col-12  col-sm-12">
            <label>Adress :</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>Grender :</label>
            <Form.Select aria-label="Default select example">
              <option>chọn Giới Tính</option>
              <option value="Male">Dev</option>
              <option value="Female">Female</option>
              <option value="Female">Female </option>
            </Form.Select>
          </div>
          <div className="form-group mt-3  col-12  col-sm-6">
            <label>
              Group :(<span style={{ color: "red" }}>*</span>)
            </label>
            <Form.Select aria-label="Default select example">
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
          <Button variant="primary" onClick={props.handleSaveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
