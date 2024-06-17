import Cookies from "js-cookie";

export const userLogged = () => {
  const cookie = Cookies.get("accessToken");
  console.log(cookie)
  return cookie
};
