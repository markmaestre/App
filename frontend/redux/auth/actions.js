export const setJwtToken = (token) => ({
  type: 'SET_JWT_TOKEN',
  payload: token,
});

export const logout = () => ({
  type: 'LOGOUT',
});
