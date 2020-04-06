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
            <a href="#" @click.prevent="updateRecord(data.item)">Edit</a> -
            <a href="#" @click.prevent="deleteRecord(data.item.id)">Delete</a>
          </template>
        </b-table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit ID#' + model.id : 'New Record')">
          <form @submit.prevent="createRecord">
            <b-form-group label="Name">
              <b-form-input v-model="model.name" type="text"></b-form-input>
            </b-form-group>
            <b-form-group label="Value">
              <b-form-input rows="4" v-model="model.value" type="number"></b-form-input>
            </b-form-group>
            <b-form-group label="Date Time">
              <b-form-input rows="4" v-model="model.dateTime" type="datetime-local"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Record</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from "@/apis/RecordsApiService";

export default {
  data() {
    return {
      isLoading: false,
      fields: [],
      records: [],
      model: {},
      sortBy: "name",
      sortDesc: false
    };
  },
  async created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      this.isLoading = true;

      try {
        this.records = await api.getAll();
        //to make bootstrap table sortable need to provide items sortable
        //Map fields from top row
        this.fields = await Promise.all(
          Object.keys(this.records[0]).map(function(value) {
            return { key: value, sortable: value === "id" ? false : true };
          })
        );
        //push aditional column to add command links edit and delete
        this.fields.push({
          key: "commandCol",
          label: "&nbsp;",
          sortable: false
        });
      } finally {
        this.isLoading = false;
      }
    },
    async updateRecord(record) {
      // We use Object.assign() to create a new (separate) instance
      this.model = Object.assign({}, record);
    },
    async createRecord() {
      const isUpdate = !!this.model.id;

      if (isUpdate) {
        await api.update(this.model.id, this.model);
      } else {
        await api.create(this.model);
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

        await api.delete(id);
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
</style>