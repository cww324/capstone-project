export const useUser = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return { currentUser };
};
