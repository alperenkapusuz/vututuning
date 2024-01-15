import Cookies from "js-cookie";

export const setClientToken = (token: string) => {
  Cookies.set("token", token, { expires: 1, secure: true, sameSite: "strict" });
};

export const deleteClientToken = () => {
    Cookies.remove("token");
}

export const getClientToken = () => {
  return Cookies.get("token");
};