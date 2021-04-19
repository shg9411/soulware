import axios from "axios";
import domain from "./domain.js";
import store from "@/store";

const BASE_URL = process.env.VUE_APP_API_SERVER;

const instance = axios.create({
  baseURL: BASE_URL,
});

const _generateUrl = (url, params, mapping = null) => {
  if (params == null) {
    return url;
  } else {
    let result = [];
    let list = url.split("/");
    for (let item of list) {
      let resultItem = item;
      if (item.startsWith("#")) {
        let key = item.substring(1);
        if (key && key.length > 0) {
          if (mapping != null) {
            resultItem = mapping[key] ? mapping[key] : "";
          } else {
            resultItem = params[key] ? params[key] : "";
            delete params[key];
          }
        }
      }
      result.push(resultItem);
    }
    return result.join("/");
  }
};

export default {
  process: (name, action, params = null, axiosOpt = null) => {
    return new Promise((resolve, reject) => {
      let info = domain[name][action];
      if (info) {
        let headers = {};
        if (info.requestAuth) {
          if (store.state.auth.loggedIn) {
            headers = { Authorization: `Bearer ${store.state.auth.token}` };
          }
        }
        let newUrl = _generateUrl(info.url, params);
        let method = info.task;
        let newParams = params;
        let p = null;
        if (info.task == "getToken") {
          p = instance["post"](newUrl, newParams, {
            headers: headers,
          });
        } else if (info.task == "refreshToken") {
          p = instance["post"](newUrl, newParams);
        } else if (method == "download") {
          p = instance["get"](newUrl, axiosOpt);
        } else if (method == "get") {
          let opt = {
            params: newParams,
            headers: headers,
          };
          p = instance[method](newUrl, opt);
        } else if (method == "post" || method == "patch") {
          p = instance[method](newUrl + "/", newParams["data"], {
            headers: headers,
          });
        } else if (method == "delete") {
          p = instance[method](newUrl, {
            headers: headers,
          });
        }
        return p
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            let res = err.response;
            if (res && res.status == 401) {
              console.log(`${res.status}, ${res.data.error}`);
            } else if (res && res.data && res.data.message) {
              console.log(`${res.status}, ${res.data.message}`);
              reject(res.data.message);
            } else if (err.message && err.message.includes("Network Error")) {
              reject("413");
            } else {
              reject(err);
            }
          });
      } else {
        reject("no domain info");
      }
    });
  },
};
