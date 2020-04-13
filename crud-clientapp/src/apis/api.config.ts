import * as qs from "qs";
import { PathLike } from "fs";
import Vue from "vue";
import sampleConfig from "../config";
import { AxiosRequestConfig } from 'axios';

let myconfig: AxiosRequestConfig;
export default {
    async setConfig() {

        await Promise.resolve(`Bearer ${await Vue.prototype.$auth.getAccessToken()}`).then(function (mytoken) {

            myconfig = {
                withCredentials: true,
                timeout: 30000,
                baseURL: sampleConfig.apiConfig.baseURL,
                headers: {
                    Authorization: mytoken,
                    'Content-Type': "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    common: {
                        'Content-Type': "application/json;charset=UTF-8",
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        Pragma: "no-cache",
                        Accept: "application/json, text/plain",
                    }
                },
                paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
            }
        });

        return myconfig;
    }

}
