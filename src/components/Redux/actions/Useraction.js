export const UserLogin = (data) => {
  return {
    type: "UserLogin",
    payload: data,
  };
};
export const reset = () => {
  return {
    type: "RESET_DATA",
  };
};
export const tokenHeader = (data) => {
  return {
  type: "tokenHeader",
    payload: data,
  };
};
