import cookie from "js-cookie";

// set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
// get from cookie such as stored token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};
// will be useful when we need to make request to server
// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localStoreage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localStorage
export const authenticateAdmin = (response, next) => {
  console.log("the authenticate helper on signin response", response);
  setCookie("token", response.data.token);
  setLocalStorage("adminProfilefirstName", response.data.adminFirstName);
  setLocalStorage("adminProfilelastName", response.data.adminLastName);
  next();
};

// access user info from localStorage
export const isAuth = () => {
  const cookieChecked = getCookie("accessToken");
  if (cookieChecked) {
    return true;
  } else {
    return false;
  }
};

// access user info from localStorage
export const isAuth2 = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("adminProfilelastName")) {
        return JSON.parse(localStorage.getItem("adminProfilelastName"));
      } else {
        return false;
      }
    }
  }
};
