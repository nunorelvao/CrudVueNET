import Vue from "vue";
import axios from "axios";
import sampleConfig from "../config";
import NProgress from "nprogress/nprogress";
import "nprogress/nprogress.css";

const client = axios.create({
  baseURL: sampleConfig.resourceServer.messagesUrl,
  json: true
});

export default {
  async execute(method, resource, data) {
    NProgress.start();
    let errorCall = false;
    const accessToken = `Bearer ${await Vue.prototype.$auth.getAccessToken()}`;

    // console.log("TOKEN :" + accessToken)

    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: accessToken
      }
    })
      .catch(function(error) {
        errorCall = true;
        const nprogressEl = document.getElementById("nprogress");
        nprogressEl.classList.add("red");
      })
      .then(req => {
        if (!errorCall) {
          NProgress.done();
          return req.data;
        }
      });
  },
  getAll() {
    return this.execute("get", "/");
  },
  create(data) {
    return this.execute("post", "/", data);
  },
  update(id, data) {
    return this.execute("put", `/${id}`, data);
  },
  delete(id) {
    return this.execute("delete", `/${id}`);
  }
};
