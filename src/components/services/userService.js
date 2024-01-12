import axios from "../setup/axios";

const registerNewUser = (email, phone, username, pass) => {
  return axios.post(`/api/v1/register`, {
    email: email,
    phone: phone,
    username: username,
    pass: pass,
  });
};
const loginUser = (valueLogin, pass) => {
  return axios.post(`/api/v1/login`, {
    email: valueLogin,
    pass: pass,
  });
};
const getAllUser = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&&limit=${limit}`);
};

const deleteUser = (user) => {
  return axios.delete(`/api/v1/user/delete`, {
    data: { id: user.id },
  });
};
const fetchGroup = () => {
  return axios.get(`/api/v1/group/read`);
};

const createUser = (userdata) => {
  return axios.post(`/api/v1/user/create`, {
    ...userdata,
  });
};
const updateUser = (userdata) => {
  return axios.put(`/api/v1/user/update`, {
    ...userdata,
  });
};

const getUserAcount = () => {
  return axios.get(`/api/v1/acount`);
};
const getUserLogOut = () => {
  return axios.post(`/api/v1/logout`);
};
export {
  registerNewUser,
  loginUser,
  getAllUser,
  deleteUser,
  fetchGroup,
  createUser,
  updateUser,
  getUserAcount,
  getUserLogOut,
};
