<template>
  <div class="list-template">
    <div class="content-header">
      <v-breadcrumbs :items="breadcumbs" divider=">"></v-breadcrumbs>
    </div>
    <div class="main-content">
      <div class="main-card card">
        <div class="card-header">
          <h3 class="card-title">
            Personal Questionnaire Forms
          </h3>
          <div class="card-header-actions">
            <v-btn icon small>
              <img :src="icons.helpIcon" />
            </v-btn>
          </div>
        </div>
        <div class="card-body">
          <div class="filters d-flex flex-row align-center">
            <v-select
              :items="statusOptions"
              label="Status"
              v-model="status"
              class="filter mr-4"
            >
            </v-select>
            <v-text-field
              v-model="username"
              label="User name"
              class="filter mr-4"
            >
            </v-text-field>
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              nudge-left="0"
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date range"
                  readonly
                  single-line
                  v-on="on"
                  class="filter mr-4"
                >
                </v-text-field>
              </template>
              <v-date-picker v-model="daterange" no-title range @input="onDatepickerInput"></v-date-picker>
            </v-menu>
            <v-btn fab dark small class="filter-btn" @click="search">
              <v-icon dark>search</v-icon>
            </v-btn>
          </div>
          <v-divider class="mb-1"></v-divider>
          <div class="table-actions mb-1">
            <v-btn text @click="onAddClick">
              <img :src="icons.addIcon"/> Add
            </v-btn>
            <v-btn text @click="onEditClick">
              <img :src="icons.editIcon"/> Edit
            </v-btn>
            <v-btn text @click="onDeleteClick">
              <img :src="icons.deleteIcon"/> Delete
            </v-btn>
            <v-btn text @click="onViewClick">
              <img :src="icons.viewIcon"/> View
            </v-btn>
          </div>
          <v-data-table
            v-model="selected"
            :headers="tableHeader"
            :items="tableData"
            item-key="UniqueRef"
            :server-items-length="serverItemsLength"
            :options.sync="tableOptions"
            :loading="this.tableLoading"
            show-select
            class="elevation-1 main-table"
          >
          </v-data-table>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="errorDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          primary-title
        >
          {{errorDialogTitle}}
        </v-card-title>

        <v-card-text>
          {{errorDialogContent}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="errorDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="confirmDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          primary-title
        >
          Confirmation
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this row?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="onConfirmClick"
          >
            Yes
          </v-btn>
          <v-btn
            text
            @click="confirmDialog = false"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from '@/axios';
import {mapActions} from 'vuex'

import helpIcon from '../../../assets/images/ques.png'
import addIcon from '../../../assets/images/plus.png'
import editIcon from '../../../assets/images/edit.png'
import deleteIcon from '../../../assets/images/del.png'
import viewIcon from '../../../assets/images/eye.png'
import uploadIcon from '../../../assets/images/upload.png'
import crossIcon from '../../../assets/images/cross.png'

import statuses from './config/statuses';
import tableHeaders from './config/table';

export default {
  data() {
    return {
      breadcumbs: [
        {
          text: 'Agent',
          disabled: false,
          to: '/',
        },
        {
          text: 'Personal Questionnaire Forms',
          disabled: false,
          to: '/pq-forms',
        },
      ],
      icons: {
        helpIcon,
        addIcon,
        editIcon,
        deleteIcon,
        viewIcon,
        uploadIcon,
        crossIcon
      },
      status: statuses.pending.value,
      username: '',
      daterange: [],
      dateMenu: false,
      errorDialog: false,
      errorDialogTitle: '',
      errorDialogContent: '',
      toLogin: false,
      confirmDialog: false,
      
      selected: [],
      tableHeader: tableHeaders[statuses.pending.value],
      tableData: [],
      tableLoading: true,
      serverItemsLength: 0,
      tableOptions: {},
      filterObject: {
        filterjson: {
          filter: [
            {
              status: "pending",
              start_date: "12-12-2019",
              end_date: "12-24-2019"
            }
          ],
          sort:[
            {
              key: "name",
              order: "Desc"
            }
          ],
          paging:[
            {
              "startindex": 11,
              "pagesize": 10
            }
          ]
        },
      },
    };
  },
  computed: {
    statusOptions() {
      const statusArray = [];
      for (let key in statuses) {
        statusArray.push(statuses[key]);
      }
      return statusArray;
    },
    dateRangeText () {
      return this.daterange.join(' ~ ')
    },
    remainingCharacters() {
      if (this.textareaModel) {
        return 255 - this.textareaModel.length;
      }
      else {
        return 255;
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    ...mapActions(['logout']),
    getTableData() {
      this.tableLoading = true;
      let filter = {
        status: this.status,
      }
      if (this.daterange.length > 0) {
        filter.start_date = this.getFormattedDate(this.daterange[0]);
        filter.end_date = this.getFormattedDate(this.daterange[this.daterange.length - 1]);
      }
      this.filterObject.filterjson.filter[0] = filter;

      const { sortBy, sortDesc, page, itemsPerPage } = this.tableOptions;

      const sort = {};
      if (sortBy.length > 0) {
        sort.key = sortBy[0];
        // if (sort.key == 'FullName') {
        //   sort.key = 'name';
        // }
        sort.order = sortDesc[0] ? 'Desc' : 'Asc';
      }
      else {
        sort.key = 'UniqueRef';
        sort.order = 'Asc';
      }
      this.filterObject.filterjson.sort[0] = sort;
      const paging = {
        startindex: itemsPerPage > 0 ? (page - 1) * itemsPerPage + 1: 1,
        pagesize: itemsPerPage
      };
      this.filterObject.filterjson.paging[0] = paging;
      window.console.log('filterObject', this.filterObject);
      axios.post('pqform/getPQlist', this.filterObject)
        .then(res => {
          this.tableLoading = false;
          const response = res.data.response;
          if (response.status) {
            this.serverItemsLength = parseInt(response.data[1][0].NumberOfRecords) || 0;
            this.tableData = response.data[0];
            this.tableData.map(item => {
              if (item.statusdate) {
                item.statusdate = item.statusdate.split(' ')[0];
              }
            });
            window.console.log('getPQlist response', response);
          }
          else {
            this.tableData = [];
            this.serverItemsLength = 0;
            this.tableOptions.page = 1;
            if (response.message != "No data found") {
              this.errorDialogTitle = 'Something went wrong';
              this.errorDialogContent = response.message;
              this.errorDialog = true;
              if (response.message.includes('Token')) {
                this.toLogin = true;
              }
            }
          }
        })
        .catch((e) => {
          this.tableLoading = false;
          this.tableData = [];
          this.errorDialogTitle = 'Something went wrong';
          this.errorDialogContent = e;
          this.errorDialog = true;
        });
    },
    getFormattedDate(dateStr) {
      const parts = dateStr.split('-');
      return `${parts[1]}-${parts[2]}-${parts[0]}`;
    },
    onDatepickerInput() {
      if (this.daterange.length == 2) {
        this.dateMenu = false;
      }
    },
    onUploadImageClick(item) {
      if (item.uploadFile) {
        item.uploadFile = null;
      }
    },
    search() {
      this.tableHeader = tableHeaders[this.status];
      this.getTableData();
    },
    getStatusObject(value) {
      const item = this.items.statuses.filter((status) => {
        return status.value == value;
      });
      if (item.length > 0) {
        return item[0];
      }
      return {};
    },
    onAddClick() {
      this.$router.push('/pq-forms/new');
    },
    onEditClick() {
      if (this.selected.length > 1) {
        this.errorDialogTitle="Selection Error"
        this.errorDialogContent="More than one item selected"
        this.errorDialog = true;
      }
      else if (this.selected.length < 1) {
        this.errorDialogTitle="Selection Error"
        this.errorDialogContent="No item selected"
        this.errorDialog = true;
      }
      else {
        this.$router.push(`/pq-forms/${this.selected[0].pq_id}`);
      }
    },
    onDeleteClick() {
      if (this.selected.length > 1) {
        this.errorDialogTitle="Selection Error"
        this.errorDialogContent="More than one item selected"
        this.errorDialog = true;
      }
      else if (this.selected.length < 1) {
        this.errorDialogTitle="Selection Error"
        this.errorDialogContent="No item selected"
        this.errorDialog = true;
      }
      else {
        // this.$router.push(`/pq-forms/${this.selected[0].pq_id}`);
        this.confirmDialog = true;
      }
    },
    onConfirmClick() {
      this.confirmDialog = false;
    },
    onViewClick() {
      if (this.selected.length > 1) {
        this.errorDialogTitle="Selection Error"
        this.errorDialogContent="More than one item selected"
        this.errorDialog = true;
      }
      else if (this.selected.length < 1) {
        this.errorDialogTitle="Selection Error"
        this.errorDialogContent="No item selected"
        this.errorDialog = true;
      }
      else {
        this.$router.push(`/pq-forms/${this.selected[0].pq_id}/view`);
      }
    }
  },
  watch: {
    tableOptions: {
      handler() {
        this.getTableData();
      },
      deep: true,
    },
    errorDialog() {
      if (!this.errorDialog && this.toLogin) {
        this.logout();
        this.$router.push('/login');
      }
    },
    daterange: {
      handler() {
        if (this.daterange.length > 1 && this.daterange[0] > this.daterange[1]) {
          const date0 = this.daterange[0];
          this.daterange[0] = this.daterange[1];
          this.daterange[1] = date0;
        } 
      }
    }
  }
}
</script>

<style lang="scss">
.list-template {
  width: 100%;
  .main-content {
    min-height: 250px;
    padding: 15px;
    padding-top: 0;

    .card-body {
      padding: 10px 15px;
      .filters {
        .filter {
          max-width: 200px;
        }

        .filter-btn {
          width: 30px;
          height: 30px;
          background-color: #6da2f9;

          .v-icon {
            font-size: 20px;
          }
        }
      }

      .table-actions {
        .v-btn {
          height: 26px;
          border-radius: 0;
          border-right: 2px solid #c7c7c7;

          img {
            width: 15px;
            height: auto;
            margin-right: 5px;
          }
        }
      }

      .file-input {
        min-width: 100px;
      }

      .v-data-table__mobile-row {
        .v-input .v-select__selections {
          flex-direction: row-reverse;
        }
      }
    }
  }
}

.v-dialog .dialog-card .card-body {
  .v-form {
    .prepend-text {
      width: 125px;
      color: #333;

      &.upload {
        font-size: 13px;
      }
    }

    .v-input {
      padding-top: 0;
      margin-top: 0;

      .v-input__slot:before {
        border-color: #e0e0e0;
      }
    }
  }
}
</style>