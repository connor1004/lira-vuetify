<template>
  <div class="modal-template">
    <div class="content-header">
      <v-breadcrumbs :items="breadcumbs" divider=">"></v-breadcrumbs>
    </div>
    <div class="main-content">
      <div class="main-card card">
        <div class="card-header">
          <h3 class="card-title">
            Form Component
          </h3>
          <div class="card-header-actions">
            <v-btn icon small>
              <img :src="icons.helpIcon" />
            </v-btn>
          </div>
        </div>
        <div class="card-body">
          <v-container>
            <v-row>
              <v-col cols="10" offset="1">
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Name"
                        required
                        :rules="[v => !!v || 'Please enter Proposed Name.']"
                        class="required"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Your Email"
                        type="email"
                        :rules="[rules.emailRule]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
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
                            v-model="computedDateFormatted"
                            label="mm/dd/yyyy"
                            readonly
                            single-line
                            class="datepicker-text"
                          >
                            <template v-slot:append>
                              <img v-on="on" width="24" height="22" :src="icons.calendarIcon" alt="">
                            </template>
                          </v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="dateMenu = false"></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Mobile"
                        type="number"
                        class="phone-number-input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-combobox
                        :items="items.searchItems"
                        label="Type Search"
                        class="required"
                        :rules="[v => !!v || 'Title is Required']"
                      ></v-combobox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Company"
                        required
                        :rules="[v => !!v || 'Please enter Proposed Name.']"
                        class="required"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-select
                        :items="items.countries"
                        label="Country"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <!-- <v-file-input
                        label="Upload File"
                        class="file-input"
                        v-model="uploadFile"
                        prepend-icon=""
                        single-line
                        :clearable="false"
                      >
                        <template v-slot:append>
                          <img
                            :src="!uploadFile ? icons.uploadIcon : icons.crossIcon"
                            alt=""
                            @click="onUploadImageClick"
                          >
                        </template>
                      </v-file-input> -->
                      <file-input
                        label="Upload File"
                        v-model="uploadFile"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="items.countries"
                        label="Country"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="items.countries"
                      >
                        <template v-slot:prepend>
                          Country
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Reg#"
                        single-line
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div class="custom-textarea">
                        <label>Details of the applicant company (showing details of company secretary and of any other affiliations with other companies; partnership etc., in seychelles or abroad)</label>
                        <textarea rows="3" maxlength="255" v-model="textareaModel"></textarea>
                        <div class="feedback">{{ `${remainingCharacters} characters remaining` }}</div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="d-flex">
                      <v-checkbox class="mr-3" color="info" label="ICSP"></v-checkbox>
                      <v-checkbox class="mr-3" color="info" label="ITSP"></v-checkbox>
                      <v-checkbox class="mr-3" color="info" label="FSP"></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-radio-group v-model="radioGroup">
                        <v-radio label="Male" value="1" color="info"></v-radio>
                        <v-radio label="Female" value="2" color="info"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-radio-group v-model="radioGroup2" row>
                        <v-radio label="1" value="1" color="info"></v-radio>
                        <v-radio label="2" value="2" color="info"></v-radio>
                        <v-radio label="3" value="3" color="info"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row class="mb-6">
                    <v-col>
                      <v-btn color="info" @click="dialog = true">
                        Open Modal
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row class="mb-4">
                    <v-col>
                      <v-btn color="info" class="mr-3">
                        <v-icon left>keyboard_arrow_left</v-icon>
                        Previous
                      </v-btn>
                      <v-btn color="success" class="mr-3">
                        Submit
                      </v-btn>
                      <v-btn color="info">
                        Next
                        <v-icon right>keyboard_arrow_right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      width="500"
      class="custom-dialog"
    >
      <div class="dialog-card card">
        <div class="card-header">
          <h4 class="card-title">
            Add Entry
          </h4>
          <div class="card-header-actions">
            <v-btn icon small @click="dialog = false" class="close-btn">
              x
            </v-btn>
          </div>
        </div>
        <div class="card-body">
          <v-form>
            <v-text-field>
              <template v-slot:prepend>
                <div class="prepend-text">
                  Entity Type
                </div>
              </template>
            </v-text-field>
            <v-text-field>
              <template v-slot:prepend>
                <div class="prepend-text">
                  Name
                </div>
              </template>
            </v-text-field>
            <v-text-field>
              <template v-slot:prepend>
                <div class="prepend-text">
                  Foreign Name
                </div>
              </template>
            </v-text-field>
            <div class="d-flex align-center">
              <div class="prepend-text mr-2 upload">
                Upload File
              </div>
              <v-file-input
                class="file-input"
                v-model="uploadFileDialog"
                prepend-icon=""
                single-line
                :clearable="false"
              >
                <template v-slot:append>
                  <img
                    :src="!uploadFileDialog ? icons.uploadIcon : icons.crossIcon"
                    alt=""
                    @click="uploadFileDialog = null"
                  >
                </template>
              </v-file-input>
            </div>
            <v-divider class="mt-2 mb-9"></v-divider>
            <v-btn color="success" @click="dialog = false" class="mb-5">
              Save
            </v-btn>
          </v-form>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import FileInput from '../components/FileInput'
import helpIcon from '../assets/images/ques.png'
import calendarIcon from '../assets/images/calendar.png'

export default {
  components: {
    FileInput
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
          text: 'Form Component',
          disabled: true,
          to: '/modal-template',
        },
      ],
      items: {
        searchItems: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],
        countries: [
          'India',
          'Sri Lanka',
          'England'
        ],

      },
      icons: {
        helpIcon,
        calendarIcon,
      },
      rules: {
        emailRule: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return !v || pattern.test(v) || 'Invalid e-mail';
        },
      },
      date: '',
      dateMenu: false,
      uploadFile: null,
      textareaModel: '',
      radioGroup: '',
      radioGroup2: '',
      dialog: false,
      uploadFileDialog: null,
    };
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
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
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    }
  }
}
</script>

<style lang="scss">
.modal-template {
  width: 100%;
  .main-content {
    min-height: 250px;
    padding: 15px;
    padding-top: 0;
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