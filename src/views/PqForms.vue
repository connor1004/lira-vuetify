<template>
  <div class="pq-forms">
    <div class="content-header">
      <v-breadcrumbs :items="breadcumbs" divider=">"></v-breadcrumbs>
    </div>
    <div class="main-content">
      <div class="main-card card">
        <div class="card-header">
          <h3 class="card-title">
            Personal Questionair Form
          </h3>
          <div class="card-header-actions">
            <v-btn icon small>
              <img :src="icons.helpIcon" />
            </v-btn>
          </div>
        </div>
        <div class="card-body">
          <div class="stepper-tab">
            <div class="stepper-tab-header">
              <div
                class="stepper-tab-step"
                v-for="(item, index) in steps"
                v-bind:key="index"
                :class="step == (index + 1) ? 'active' : ''"
              >
                <v-btn fab @click="step = index + 1">{{index + 1}}</v-btn>
                <div class="step-title">{{item}}</div>
              </div>
            </div>

            <div class="stepper-tab-items">
              <div class="stepper-tab-content" v-if="step == 1">
                <step1
                  @nextClick="step = 2"
                />
              </div>
              <div class="stepper-tab-content" v-if="step == 2">
                <step2
                  @nextClick="step = 3"
                  @prevClick="step = 1"
                />
              </div>
            </div>
          </div>
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
import Step1 from '../components/pqforms/step1'
import Step2 from '../components/pqforms/Step2'

import helpIcon from '../assets/images/ques.png'
import addIcon from '../assets/images/plus.png'
import editIcon from '../assets/images/edit.png'
import deleteIcon from '../assets/images/del.png'
import viewIcon from '../assets/images/eye.png'
import uploadIcon from '../assets/images/upload.png'
import crossIcon from '../assets/images/cross.png'

export default {
  components: {
    Step1,
    Step2,
  },
  data() {
    return {
      breadcumbs: [
        {
          text: 'IBC',
          disabled: false,
          to: '/',
        },
        {
          text: 'PQ Form',
          disabled: false,
          to: '/pq-forms',
        },
      ],
      steps: [
        'General Info',
        'Personal Detail',
        'Proposed Role',
        'Qualifications',
        'Career History',
        'Civil and Disciplinary',
        'Discloser of Conflict',
        'Declaration'
      ],
      step: 1,
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
      errorDialog: false,
      errorDialogTitle: '',
      errorDialogContent: '',
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
      this.$router.push('/pg-forms');
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
.pq-forms {
  width: 100%;
  .main-content {
    min-height: 250px;
    padding: 15px;
    padding-top: 0;

    .card-body {
      padding: 40px 15px 10px;
      overflow: auto;
      min-height: 460px;
      
      .stepper-tab {
        width: 100%;
        .stepper-tab-header {
          min-width: 100%;
          width: fit-content;
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;

          &::before {
            content: ' ';
            display: block;
            position: absolute;
            height: 1px;
            background-color: #ccc;
            left: 0;
            right: 0;
            top: 15px;
          }

          .stepper-tab-step {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            &::before {
              content: ' ';
              display: block;
              position: absolute;
              width: 100%;
              height: 1px;
              background-color: #ccc;
              left: 0;
              top: 15px;
            }

            &:first-child::before {
              width: 50%;
              background-color: #fff;
            }

            &:last-child::before {
              content: ' ';
              display: block;
              position: absolute;
              width: 50%;
              height: 1px;
              background-color: #fff;
              left: 50%;
              right: 0;
              top: 15px;
            }

            .v-btn {
              background-color: #fff;
              color: #000;
              font-size: 12px;
              box-shadow: none;
              width: 30px;
              height: 30px;
              border: 1px solid #ddd;

              &:hover {
                background-color: #fff;
                box-shadow: 0 5px 11px 0 rgba(0,0,0,.18),
                            0 4px 15px 0 rgba(0,0,0,.15);
                &::before {
                  opacity: 0;
                }
              }
            }

            &.active {
              .v-btn {
                background-color: #4285f4;
                color: #fff;
                border-color: #367fa9;
              }
            }

            .step-title {
              margin-top: 5px;
              font-size: 13px;
              margin-bottom: 10px;
              font-weight: 400;
              color: #333;
            }
          }
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