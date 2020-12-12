export default {
  statement: (id: number) => `/p/${id}`,
  index: () => `/`,
  login: () => `/signin`,
  logout: () => `/signout`
};
