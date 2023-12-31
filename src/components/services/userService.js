import axios from "axios";
const registerNewUser = (email, phone, username, pass) => {
  return axios.post(`http://localhost:8080/api/v1/register`, {
    email: email,
    phone: phone,
    username: username,
    pass: pass,
  });
};
const loginUser = (valueLogin, pass) => {
  return axios.post(`http://localhost:8080/api/v1/login`, {
    email: valueLogin,
    pass: pass,
  });
};
const getAllUser = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&&limit=${limit}`
  );
};
export { registerNewUser, loginUser, getAllUser };
