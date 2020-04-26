import { Api } from './api';
import NProgress from "nprogress";

export class RecordsApi extends Api {
    constructor(config) {
        // NEVER FORGET THE SUPER
        super(config);
        this.config = config;
        this.errorCall = false;
    }
    getAllRecords() {
        NProgress.start();
        return this.get("records")
            .then((response) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error) => {
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
    postRecord(data) {
        NProgress.start();
        return this.post("records", JSON.stringify(data))
            .then((response) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error) => {
                this.errorCall = true;
                const nprogressEl = document.getElementById("nprogress");
                nprogressEl?.classList.add("red");
                throw (error);
            });
    }
    putRecord(id, data) {
        NProgress.start();
        return this.put(`records/${id}`, JSON.stringify(data))
            .then((response) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error) => {
                this.errorCall = true;
                const nprogressEl = document.getElementById("nprogress");
                nprogressEl?.classList.add("red");
                throw (error);
            });
    }
    deleteRecord(id) {
        NProgress.start();
        return this.delete(`records/${id}`)
            .then((response) => {
                const { data } = response;
                NProgress.done();
                return data;
            })
            .catch((error) => {
                this.errorCall = true;
                const nprogressEl = document.getElementById("nprogress");
                nprogressEl?.classList.add("red");
                throw (error);
            });
    }
}
//# sourceMappingURL=recordsapi.js.map