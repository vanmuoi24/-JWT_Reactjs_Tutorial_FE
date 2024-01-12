const initvalue = {
  acount: {
    email: "",
    username: "",
    groupWithrolos: {},
    isAuthenticated: false,
    token: "",
    isloading: true,
  },

  tokenheader: {
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
    case "RESET_DATA":
      return initvalue;
    case "tokenHeader":
      return {
        ...state,
        tokenheader: { ...state.tokenheader, ...action.payload },
      };
    default:
      return state;
  }
};
export default rotreducer;
