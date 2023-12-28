import axios from "axios";
const registerNewUser = (email, phone, username, pass) => {
  return axios.post(`http://localhost:8080/api/v1/register`, {
    email: email,
    phone: phone,
    username: username,
    pass: pass,
  });
};

export { registerNewUser };
