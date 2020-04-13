import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Record } from "@/models/Record"
import { Api } from './api';
import sampleConfig from "../config";
import NProgress from "nprogress";


export default class RecordsApi extends Api {

    config: AxiosRequestConfig;
    errorCall: boolean;
    public constructor(config: AxiosRequestConfig) {
        // NEVER FORGET THE SUPER
        super(config);
        this.config = config;
        this.errorCall = false;

    }

    public getAllRecords(): Promise<Record[]> {
        NProgress.start();
        return this.get<Record[]>("records")
            .then((response: AxiosResponse<Record[]>) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error: AxiosError) => {
                this.errorCall = true;
                const nprogressEl = document.getElementById("nprogress");
                nprogressEl?.classList.add("red");
                throw (error);
            });

    }

    /**
    *
    * @param {object} data - Record
    * @param {number} data.id - Record id
    * @param {number} data.value - Record number
    * @param {string} data.date - Record number
    * @param {string} data.time - Record number
    * @returns {Promise<void>} void,
    */
    public postRecord(data: Record): Promise<void> {
        NProgress.start();

        return this.post<void>("records", JSON.stringify(data))
            .then((response: AxiosResponse<void>) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error: AxiosError) => {
                this.errorCall = true;
                const nprogressEl = document.getElementById("nprogress");
                nprogressEl?.classList.add("red");
                throw (error);
            });

    }

    public putRecord(id: number, data: Record): Promise<void> {
        NProgress.start();
        return this.put<void>(`records/${id}`, JSON.stringify(data))
            .then((response: AxiosResponse<void>) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error: AxiosError) => {
                this.errorCall = true;
                const nprogressEl = document.getElementById("nprogress");
                nprogressEl?.classList.add("red");
                throw (error);
            });

    }

    public deleteRecord(id: number): Promise<void> {
        NProgress.start();
        return this.delete<void>(`records/${id}`)
            .then((response: AxiosResponse<void>) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error: AxiosError) => {
                this.errorCall = true;
                const nprogressEl = document.getElementById("nprogress");
                nprogressEl?.classList.add("red");
                throw (error);
            });

    }


    // const cfgnew = this.config;
    // cfgnew.params = { 'id': id };




}