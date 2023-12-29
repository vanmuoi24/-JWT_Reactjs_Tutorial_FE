import React, { useEffect, useState } from "react";
import { getAllUser } from "../services/userService";

const User = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      let res = await getAllUser();
      if (res && res.data && res.data.EC === 0) {
        setList(res.data.DT);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Table User</h2>
      </div>
      <div>
        <button onClick={fetchAllUsers}>Load</button>
        <button>Add new User</button>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-success">Edit</button>
                <button type="submit" className="btn btn-danger d-inline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
