import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import Form from "react-bootstrap/Form";
import { fetchGroup, createUser, updateUser } from "../services/userService";
import { ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
const ModalUser = (props) => {
  const { action, dataModal } = props;
  const [userGroup, setuserGroup] = useState([]);
  const [showcreate, setShowcreate] = useState(false);
  const [datakey, setUpdateKey] = useState(false);
  console.log(userGroup);
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

  useEffect(() => {
    if (action === "UPDATE") {
      setUserdata({
        ...dataModal,
        group: dataModal.Group ? dataModal.Group.id : {},
      });
    }
  }, [dataModal]);
  useEffect(() => {
    if (action === "CREATE") {
      setUserdata({
        ...dataModal,
        group: dataModal.Group ? dataModal.Group.id : {},
      });
    }
  }, [action]);
  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setuserGroup(res.data.DT);
      console.log(res);
      if (res.data.DT && res.data.DT.length > 0) {
        setUserdata({ ...Userdata, group: res.data.DT[0].id });
      }
    }
  };

  const [ojbchecknput, setobjcheckinput] = useState(checkvalidInput);
  const handlesetinput = (event, name) => {
    let _userdata = _.cloneDeep(Userdata);
    _userdata[name] = event;
    setUserdata(_userdata);
  };
  const checkvaidateInput = () => {
    // create user
    if (action === "UPDATE") return true;
    setobjcheckinput(checkvalidInput);
    let cohieu = true;
    let arr = ["email", "phone", "password", "group"];

    let _validinput = _.cloneDeep(checkvalidInput);
    for (let i = 0; i < arr.length; i++) {
      if (!Userdata[arr[i]]) {
        _validinput[arr[i]] = false;
        setobjcheckinput(_validinput);
        toast.error(`Empty input ${arr[i]}`);
        cohieu = false;
        break;
      }
    }
    return cohieu;
  };

  const handconfirmUser = async () => {
    let check = checkvaidateInput();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createUser({ ...Userdata, groupId: Userdata["group"] })
          : await updateUser({ ...Userdata, groupId: Userdata["group"] });
      if (res && res.data && res.data.EC === 0) {
        toast.success(res.data.EM);
        setShowcreate(props.handleClose);
        props.setUpdateKey((prevKey) => prevKey + 1);
        if (res.data.DT && res.data.DT.length > 0) {
          setUserdata({ ...Userdata, group: res.data.DT[0].id });
        }
      }
      if (res && res.data && res.data.EC !== 0) {
        toast.error(res.data.EM);
        let _validinput = _.cloneDeep(checkvalidInput);
        _validinput[res.data.DT] = false;
        setobjcheckinput(_validinput);
      }
    }
  };
  const handleclossuser = () => {
    props.handleClose();
    setUserdata(defaultData);
    setobjcheckinput(checkvalidInput);
  };

  return (
    <>
      <Modal show={props.showcreate} onHide={() => handleclossuser()} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "CREATE" ? "Create New User" : "Edit a User"}
          </Modal.Title>
        </Modal.Header>
        <div className="row p-md-3 ">
          {" "}
          <div className="form-group mt-3 col-12  col-sm-6">
            <label>
              Email address :(<span style={{ color: "red" }}>*</span>)
            </label>
            <input
              disabled={action === "CREATE" ? false : true}
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
              disabled={action === "CREATE" ? false : true}
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
            {action === "CREATE" && (
              <>
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
              </>
            )}
          </div>
          <div className="form-group mt-3  col-12  col-sm-12">
            <label>Adress :</label>
            <input
              type="text"
              className="form-control"
              value={Userdata.address}
              onChange={(event) =>
                handlesetinput(event.target.value, "address")
              }
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
              value={Userdata.sex}
            >
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
              value={Userdata.group}
            >
              {userGroup.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleclossuser()}>
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
