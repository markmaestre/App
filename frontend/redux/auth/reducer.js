const initialState = {
  jwtToken: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_JWT_TOKEN':
      return {
        ...state,
        jwtToken: action.payload,
        isLoggedIn: Boolean(action.payload), 
      };
    case 'LOGOUT':
      return {
        ...state,
        jwtToken: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
