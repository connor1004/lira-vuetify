<template>
  <div class="list-template">
    <div class="content-header">
      <v-breadcrumbs :items="breadcumbs" divider=">"></v-breadcrumbs>
    </div>
    <div class="main-content">
      <div class="main-card card">
        <div class="card-header">
          <h3 class="card-title">
            List Template
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
              :items="items.statuses"
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
            :headers="headers"
            :items="desserts"
            item-key="name"
            show-select
            class="elevation-1 main-table"
          >
            <template v-slot:item.uploadFile="{item, value}">
              <v-file-input
                class="file-input"
                prepend-icon=""
                single-line
                :clearable="false"
                :value="value"
                @change="(val) => onUploadFileChange(val, item)"
              >
                <template v-slot:append>
                  <img
                    :src="!item.uploadFile ? icons.uploadIcon : icons.crossIcon"
                    alt=""
                    @click="() => onUploadImageClick(item)"
                  >
                </template>
              </v-file-input>
            </template>
            <template v-slot:item.status="{value, item}">
              <v-select
                :items="items.statuses"
                :value="getStatusObject(value)"
                @change="(val) => onItemStatusChange(val, item)"
              ></v-select>
            </template>
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
  </div>
</template>

<script>
import helpIcon from '../assets/images/ques.png'
import addIcon from '../assets/images/plus.png'
import editIcon from '../assets/images/edit.png'
import deleteIcon from '../assets/images/del.png'
import viewIcon from '../assets/images/eye.png'
import uploadIcon from '../assets/images/upload.png'
import crossIcon from '../assets/images/cross.png'

export default {
  data() {
    return {
      breadcumbs: [
        {
          text: 'IBC',
          disabled: false,
          to: '/',
        },
        {
          text: 'List Template',
          disabled: false,
          to: '/list-template',
        },
      ],
      items: {
        statuses: [{
          text: 'Assigned',
          value: 1,
        }, {
          text: 'Started',
          value: 2,
        }, {
          text: 'Pending',
          value: 3,
        }, {
          text: 'Incomplete',
          value: 4,
        }, {
          text: 'Complete',
          value: 5,
        }],
        entities: [
          'Entity1',
          'Entity2',
          'Entity3'
        ],
      },
      icons: {
        helpIcon,
        addIcon,
        editIcon,
        deleteIcon,
        viewIcon,
        uploadIcon,
        crossIcon
      },
      status: '',
      username: '',
      daterange: [],
      dateMenu: false,
      errorDialog: false,
      errorDialogTitle: '',
      errorDialogContent: '',
      
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Translated File', value: 'uploadFile', width: '20%' },
        { text: 'Status', value: 'status', width: '20%' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          uploadFile: null,
          status: '1',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          uploadFile: null,
          status: '2',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          uploadFile: null,
          status: '3',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          uploadFile: null,
          status: '4',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          uploadFile: null,
          status: '5',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          uploadFile: null,
          status: '5',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          uploadFile: null,
          status: '4',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          uploadFile: null,
          status: '3',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          uploadFile: null,
          status: '2',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          uploadFile: null,
          status: '1',
        },
      ],
    };
  },
  computed: {
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
  methods: {
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
    onItemStatusChange(val, item) {
      window.console.log(val);
      window.console.log(item);
    },
    onUploadFileChange(val, item) {
      item.uploadFile = val;
      // window.console.log(val);
    },
    onAddClick() {
      this.$router.push('/pq-forms');
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
    },
    onDeleteClick() {

    },
    onViewClick() {

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