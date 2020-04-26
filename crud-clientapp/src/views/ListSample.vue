<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">List Sample</h1>
    <!-- <b-alert :show="isLoading" variant="info">Loading...</b-alert> -->
    <b-row>
      <b-col>
        <b-table
          :items="records"
          :fields="fields"
          :busy="isLoading"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          primary-key="id"
          dark
          striped
          hover
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

          <template v-slot:head()="data">
            <span
              class="text-light"
              v-html="data.label"
            >{{ data.label.replace(/(\w)(\w*)/g, function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}) }}</span>
          </template>

          <template v-slot:cell(commandCol)="data">
            <a href="#" class="text-primary" @click.prevent="updateRecord(data.item)">Edit</a> -
            <a href="#" class="text-danger" @click.prevent="deleteRecord(data.item.id)">Delete</a>
          </template>
        </b-table>
      </b-col>
      <!-- EDIT FORM -->
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit ID#' + model.id : 'New Record')">
          <form @submit.prevent="createRecord">
            <b-form-group label="Name">
              <b-form-input v-model="model.name" type="text"></b-form-input>
            </b-form-group>
            <b-form-group label="Value">
              <b-form-input rows="4" v-model.number="model.value" type="number"></b-form-input>
            </b-form-group>
            <b-form-group label="Date Time">
              <b-form-datepicker
                id="form-datepicker-button"
                v-model="model.date"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                today-button
                reset-button
                close-button
              ></b-form-datepicker>

              <b-form-timepicker v-model="model.time" :hour12="false"></b-form-timepicker>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Record</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>

    <my-toast
      :show="updateToast"
      :append="false"
      :toasttext="toastText"
      :toasttitle="toastTitle"
      :variant="toastVariant"
    ></my-toast>
  </div>
</template>


<script>
//LEGACY JavaScript API
// import api from "@/apis/RecordsApiService";
//NEW TypeScript API (Typed)
import RecordsApi from "@/apis/recordsapi";
import { Record } from "@/models/Record";

import apiConfig from "@/apis/api.config";
import { isNullOrUndefined } from "util";

import Vue from "vue";
import MyBVToast from "@/components/BVToastVueComponent";
Vue.component("my-toast", MyBVToast);

let apiTS = null;

export default {
  data() {
    return {
      isLoading: false,
      fields: [],
      records: Array[Record],
      model: new Record(),
      sortBy: "name",
      sortDesc: false,
      updateToast: false,
      toastTitle: "",
      toastText: "",
      toastVariant: ""
    };
  },
  async created() {
    this.getAll();
  },
  methods: {
    setToast(title, text, variant) {
      this.toastVariant = variant;
      this.toastTitle = title;
      this.toastText = text;
      this.updateToast = true;
    },
    async getAll() {
      this.isLoading = true;

      try {
        const config = await apiConfig.setConfig();
        apiTS = new RecordsApi(config);
        this.records = await apiTS.getAllRecords();

        //this.records = await api.getAllRecords();

        //to make bootstrap table sortable need to provide items sortable
        //Map fields from top row
        //console.log(isNullOrUndefined(this.records[0]));

        if (!isNullOrUndefined(this.records[0]) && this.records != []) {
          this.fields = await Promise.all(
            Object.keys(this.records[0]).map(function(value) {
              return {
                key: value,
                sortable: value === "id" ? false : true
              };
            })
          );
        }

        //push aditional column to add command links edit and delete
        this.fields.push({
          key: "commandCol",
          label: "&nbsp;",
          sortable: false
        });
      } catch (errors) {
        console.log(errors);
      } finally {
        this.isLoading = false;
      }
    },
    async updateRecord(record) {
      // We use Object.assign() to create a new (separate) instance
      this.model = Object.assign(new Record(), record);
      this.updateToast = false;
    },
    async createRecord() {
      const isUpdate = !!this.model.id;

      if (isUpdate) {
        await apiTS.putRecord(this.model.id, this.model);
        //show toast sucess
        this.setToast(
          "UPDATED RECORD ID " + `${this.model.id}`,
          "THE RECORD ID " + `${this.model.id}` + " HAS BEEN UPDATED!",
          "success"
        );
        //await api.update(this.model.id, this.model);
      } else {
        await apiTS.postRecord(this.model);
        //await api.create(this.model);
      }
      // Clear the data inside of the form
      this.model = {};
      // Fetch all records again to have latest data
      await this.getAll();
    },
    async deleteRecord(id) {
      if (confirm("Are you sure you want to delete this record?")) {
        // if we are editing a record we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {};
        }

        await apiTS.deleteRecord(id);
        //await api.delete(id);
        await this.getAll();
      }
    }
  }
};
</script>

 <style>
#nprogress.red .bar {
  background: red;
}
#nprogress.red .spinner-icon {
  border-top-color: red;
  border-left-color: red;
}
</style>