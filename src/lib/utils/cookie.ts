import Cookies from "js-cookie";

export const getCookie = Cookies.get;

export const setCookie = (name: string, value: string, days: number) =>
  Cookies.set(name, value, { expires: days, sameSite: "Lax" });

export const deleteCookie = Cookies.remove;
