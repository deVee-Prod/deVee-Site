export const useInternetIdentity = () => {
  return {
    isAuthenticated: false,
    identity: null,
    login: () => {},
    logout: () => {}
  };
};

export default useInternetIdentity;ד