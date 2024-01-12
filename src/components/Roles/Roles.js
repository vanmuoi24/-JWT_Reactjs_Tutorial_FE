import React, { useEffect, useState } from "react";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import "./role.scss";
import _ from "lodash";
import { toast } from "react-toastify";
import { Createrole, GetAllrole, deleterole } from "../services/RoleService";
// Muốn insert nhiều bản ghi sử dụng working in bulk sequilezi
const Roles = () => {
  const datadefau = {
    url: "",
    description: "",
    isvalid: true,
  };
  const [listrole, setlistrole] = useState([]);
  const [listChilds, setlistChilds] = useState({
    child1: datadefau,
  });
  const handleOnChange = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;

    if (value && name === "url") {
      _listChilds[key]["isvalid"] = true;
    }
    setlistChilds(_listChilds);
  };
  const handleAddRow = () => {
    const key = `child${Object.keys(listChilds).length + 1}`;
    setlistChilds((prevState) => ({
      ...prevState,
      [key]: datadefau,
    }));
  };

  const handledeleteRow = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setlistChilds(_listChilds);
  };
  const biuldata = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let reuslt = [];
    Object.entries(listChilds).map(([key, child]) => {
      reuslt.push({
        url: child.url,
        description: child.description,
      });
    });
    return reuslt;
  };
  const handlesave = async () => {
    let invalid = Object.entries(listChilds).find(([key, child]) => {
      return child && !child.url;
    });

    if (!invalid) {
      let data = biuldata();
      console.log(data);
      let res = await Createrole(data);
      console.log(res);
      if (res && res.data && res.data.EC === 0) {
        toast.success(res.data.EM);
      }
    } else {
      toast.error("Input URL must not be empty");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalid[0];
      _listChilds[key]["isvalid"] = false;
      setlistChilds(_listChilds);
    }
  };
  useEffect(() => {
    fethRole();
  }, []);

  const fethRole = async () => {
    let res = await GetAllrole();
    if (res && res.data && res.data.EC === 0) {
      setlistrole(res.data.DT);
    }
  };
  const handldeleteRole = async (role) => {
    let res = await deleterole(role);
    if (res && res.data.EC === 0) {
      toast.success("delete secces");
      await fethRole();
    } else {
      toast.error("delete Fail");
    }
  };
  return (
    <>
      <div className="role-container">
        <div className="container">
          <div>
            <h3 className="mt-3">Add a new role</h3>
          </div>

          {Object.entries(listChilds).map(([key, child]) => (
            <div className="row" key={key}>
              <div className="col-sm-5">
                <Form.Label htmlFor={`url-${key}`}>URL : </Form.Label>
                <Form.Control
                  type="text"
                  className={
                    child.isvalid
                      ? "form-control "
                      : "form-control  is-invalid "
                  }
                  value={child.url}
                  onChange={(event) =>
                    handleOnChange("url", event.target.value, key)
                  }
                  aria-describedby="passwordHelpBlock"
                />
              </div>
              <div className="col-sm-5">
                <Form.Label htmlFor={`description-${key}`}>
                  Description :{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={child.description}
                  onChange={(event) =>
                    handleOnChange("description", event.target.value, key)
                  }
                  aria-describedby="passwordHelpBlock"
                />
              </div>
              <div className="col-2 mt-4">
                {" "}
                <FontAwesomeIcon
                  className="icon me-2"
                  icon={faCirclePlus}
                  onClick={handleAddRow}
                />
                <FontAwesomeIcon
                  className="icon1"
                  icon={faTrash}
                  onClick={() => handledeleteRow(key)}
                />
              </div>
            </div>
          ))}
          <div className="mt-3">
            <button className="btn btn-warning" onClick={() => handlesave()}>
              Save
            </button>
          </div>

          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">Url</th>
                <th scope="col">Description :</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listrole.map((role, index) => (
                <tr key={index}>
                  <td>{role.url}</td>
                  <td>{role.description}</td>

                  <td>
                    <button className="btn btn-warning me-2 ">Edit</button>
                    <button
                      className="btn btn-danger d-inline me-2 "
                      onClick={() => handldeleteRole(role)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Roles;
