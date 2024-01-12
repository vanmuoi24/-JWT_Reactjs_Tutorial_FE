import React, { useEffect, useState } from "react";
import { getAllUser, deleteUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModelDetele from "../ModelDelete/Modeldelete";
import { set } from "lodash";
import ModalUser from "../ModelDelete/Modeluser";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../Redux/actions/Useraction";
const User = () => {
  const [list, setList] = useState([]);
  const [currenpage, setcurrenpage] = useState(1);
  const [currenlimit, setlimit] = useState(3);
  const [totalpage, settptalpage] = useState(0);
  const [show, setShow] = useState(false);
  const [item, setitem] = useState({});
  //delete
  //update/create
  const [showcreate, setShowcreate] = useState(false);
  const [actionmodeluser, setactionmodeluser] = useState("");
  const [datamodalUser, sestdataModalusser] = useState({});
  let dispath = useDispatch();
  useEffect(() => {
    if (currenpage !== 0) {
      fetchAllUsers();
    }
  }, [currenpage]);

  const fetchAllUsers = async () => {
    try {
      let res = await getAllUser(currenpage, currenlimit);

      if (res && res.data && res.data.EC === 0) {
        settptalpage(res.data.DT.totalpage);
        setList(res.data.DT.user);
        return true;
      } else {
      }
    } catch (error) {}
  };
  const handlePageClick = async (event) => {
    setcurrenpage(+event.selected + 1);
    await fetchAllUsers();
  };

  const handledelteUser = async (value) => {
    setShow(true);
    setitem(value);
  };

  const cofirmuser = async () => {
    let res = await deleteUser(item);
    if (res && res.data.EC === 0) {
      toast.success("delete secces");
      setShow(false);
      await fetchAllUsers();
    } else {
      toast.error("delete Fail");
    }
  };
  const handleClose = async () => {
    setShow(false);
    setShowcreate(false);
    sestdataModalusser({});
    await fetchAllUsers();
  };

  const handcreate = async () => {
    setactionmodeluser("CREATE");
    setShowcreate(true);
  };
  const handleEditUser = (value) => {
    sestdataModalusser(value);
    setShowcreate(true);
    setactionmodeluser("UPDATE");
  };

  return (
    <>
      <div className="container">
        <div>
          <h2>Table User</h2>
        </div>
        <div>
          <button onClick={fetchAllUsers}>Load</button>
          <button onClick={handcreate} className="btn btn-success ">
            Add new User
          </button>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Group</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user, index) => (
              <tr key={index}>
                <th scope="row">
                  {(currenpage - 1) * currenlimit + index + 1}
                </th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.Group ? user.Group.name : false}</td>
                <td>
                  <button
                    className="btn btn-warning me-2 "
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handledelteUser(user)}
                    className="btn btn-danger d-inline me-2 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalpage > 0 && (
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalpage}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        )}
        {/* <Items currentItems={1} /> */}
      </div>
      <ModelDetele
        show={show}
        handleClose={handleClose}
        cofirmuser={cofirmuser}
        item={item}
      />
      <ModalUser
        showcreate={showcreate}
        handleClose={handleClose}
        action={actionmodeluser}
        dataModal={datamodalUser}
      />
    </>
  );
};

export default User;
