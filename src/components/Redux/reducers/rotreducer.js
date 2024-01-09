const initvalue = {
  acount: {
    email: "",
    username: "",
    groupWithrolos: {},
    isAuthenticated: false,
    token: "",
  },
};

const rotreducer = (state = initvalue, action) => {
  switch (action.type) {
    case "UserLogin":
      return {
        ...state,
        acount: { ...state.acount, ...action.payload },
      };
    default:
      return state;
  }
};
export default rotreducer;
