export  const saveLoginData = (data: any) => {
  localStorage.setItem('loginData', JSON.stringify(data));
};

export const getLoginData = () => {
  const data = localStorage.getItem('loginData');
  return data ? JSON.parse(data) : null;
};

export const clearLoginData = () => {
  localStorage.removeItem('loginData');
};
 