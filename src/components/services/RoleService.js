import axios from "../setup/axios";
const Createrole = (roles) => {
  return axios.post(`/api/v1/role/create`, [...roles]);
};
const GetAllrole = () => {
  return axios.get(`/api/v1/role/show`);
};

const deleterole = (roles) => {
  return axios.delete(`/api/v1/role/delete`, {
    data: { id: roles.id },
  });
};
export { Createrole, GetAllrole, deleterole };
