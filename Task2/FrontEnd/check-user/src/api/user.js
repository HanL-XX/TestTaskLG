import axios from "axios";
import { MAIN_URL } from "../config";

// Lấy hết người dùng
export const fetchUserAll = async (token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${MAIN_URL}/api/user`,
      params: {
        search: null,
      },
      headers: {
        authtoken: token,
      },
    })
      .then((response) => {
        resolve(response.data.outSearch);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Lấy người dùng dược search
export const fetchUser = async (token, search) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${MAIN_URL}/api/user`,
      params: {
        search: search,
      },
      headers: {
        authtoken: token,
      },
    })
      .then((response) => {
        resolve(response.data.outSearch);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//update dử liệu, add dử liệu
export const changeUser = async (token, arayUser) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${MAIN_URL}/api/user`,
      data: {
        user: arayUser,
      },
      headers: {
        'authtoken': token,
      },
    })
      .then((response) => {
        resolve(response.data.log);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
