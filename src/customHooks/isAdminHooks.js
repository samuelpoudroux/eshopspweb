const useIsAdmin = (props) => {
  const user = JSON.parse(localStorage.getItem('users'));
  const isAdmin = user && user.role === 'admin';
  return { isAdmin };
};

export default useIsAdmin;
