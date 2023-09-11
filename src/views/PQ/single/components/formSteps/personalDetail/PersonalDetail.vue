<template>
  <v-container class="pq-personal-detail">
    <v-row>
      <v-col sm="10" offset-sm="1">
        <v-row>
          <v-col cols="12" sm="2">
            <v-select
              label="Title"
              :items="items.titles"
              class="required"
              required
              :rules="[v => !!v || 'Title is required']"
              v-model="value.data.Salutaion"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              label="First Name"
              v-model="value.data.Fname"
              class="required"
              required
              :rules="[v => !!v || 'Please enter your first name.']"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              label="Last Name"
              v-model="value.data.Lname"
              class="required"
              required
              :rules="[v => !!v || 'Please enter your last name']"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex flex-row align-center">
            <v-text-field
              label="Other Name"
              v-model="value.data.OldNames"
              :readonly="isViewMode"
            />
            <v-btn x-small icon class="ml-3">
              <v-icon>help_outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              label="Gender"
              v-model="value.data.gender"
              :items="items.genders"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <date-picker
              v-model="value.data.DOB"
              label="Date of Birth"
              :rules="[v => !!v || 'Please enter your Date of Birth']"
              required
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Place of Birth"
              v-model="value.data.PlaceOfBirth"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              label="Country of Permanent Residence"
              :items="countries"
              v-model="value.data.CountryofPR"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Email ID (Primary)"
              v-model="value.data.Email"
              class="required"
              required
              :rules="[v => !!v || 'Please enter your Email Id', rules.emailRule]"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Email ID (Secondary)"
              v-model="value.data.Email2"
              :rules="[rules.emailRule]"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Address Line 1"
              class="required"
              required
              :rules="[v => !!v || 'Please enter your Address']"
              v-model="address.address1"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Address Line 2"
              v-model="address.address2"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              label="City"
              v-model="address.city"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              label="State"
              v-model="address.state"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              label="Zip"
              v-model="address.zip"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              label="Country"
              :items="countries"
              v-model="address.country_id"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <vue-tel-input
              v-model="mobile"
              required
              label="Mobile No. 1"
              :rules="[v => !!v || 'Please enter your mobile number']"
              @input="onInputMobile"
              validCharactersOnly
              :disabled="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <vue-tel-input
              v-model="mobile2"
              label="Mobile No. 2"
              validCharactersOnly
              @input="onInputMobile2"
              :disabled="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              type="number"
              label="Fax No."
              class="phone-number-input"
              v-model="value.data.Fax"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              :items="identificationTypes"
              label="Identification"
              v-model="value.data.IDType_id"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="value.data.IDNo"
              type="number"
              label="Identification"
              class="phone-number-input"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="value.data.PassportNo"
              label="Passport Number"
              class="required"
              required
              :rules="[v => !!v || 'Please enter your Passport Number']"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="value.data.Nationality"
              :items="countries"
              label="Nationality"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <table>
              <thead>
                <tr>
                  <th width="5%">S.No</th>
                  <th width="34%">Document Name</th>
                  <th width="15%">Upload Date</th>
                  <th width="25%">File Name</th>
                  <th width="11%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(document, i) in value.documents.mandatory" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ document.documentBrief }}<span class="text-danger">*</span></td>
                  <td></td>
                  <td>
                    <file-input
                      :userId="userData.user_id"
                      v-model="value.documents.mandatory[i]"
                      label="Upload File"
                      uploadType="pq-file"
                      :disabled="isViewMode"
                    ></file-input>
                  </td>
                  <td>
                    <img width="20px" :src="successIcon" v-if="document.link" />
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="mt-5 mb-1">Beginning with your current residential address, list below all addresses during the last 5 years with relevant dates.</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <address-records
              v-model="value.records.Addrs"
              :countries="countries"
              :pq_id="value.data.id"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-radio-group
              v-model="value.data.isPoliticallyExposed"
              row
              class="checkbox-like"
              :rules="[v => !!v || 'Political Exposed Person is required to Select']"
              :readonly="isViewMode"
            >
              <template v-slot:prepend>
                Political Exposed Person
              </template>
              <v-radio label="Yes" value="1" on-icon="check_box" off-icon="check_box_outline_blank"></v-radio>
              <v-radio label="No" value="0" on-icon="check_box" off-icon="check_box_outline_blank"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-btn color="info mr-3 ml-1 mt-4" @click="onPrevClick" :loading="subLoading || isLoading">
          <v-icon left>keyboard_arrow_left</v-icon>
          Previous
        </v-btn>
        <v-btn color="success mt-4 mr-3" v-if="!isViewMode" @click="onSaveClick" :loading="subLoading || isLoading">
          Save
        </v-btn>
        <v-btn color="info mt-4" @click="onNextClick" :loading="subLoading || isLoading">
          Next
          <v-icon right>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script>
import { addUpdateAddressRequest, getAddressById } from '@/api/requests'
import VueTelInput from'@/components/VueTelInput/vue-tel-input'
import DatePicker from '@/components/DatePicker'
import FileInput from '@/components/FileInput'
import AddressRecords from './AddressRecords'

import successIcon from '@/assets/images/successfull.png'

export default {
  components: {
    VueTelInput,
    DatePicker,
    FileInput,
    AddressRecords,
  },
  props: ['value', 'countries', 'identificationTypes', 'userData', 'isLoading', 'isViewMode'],
  data() {
    return {
      items: {
        titles: ['Mr', 'Miss'],
        genders: [
          {
            text: 'Male',
            value: 'M',
          },
          {
            text: 'Female',
            value: 'F',
          }],
      },
      rules: {
        emailRule: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return !v || pattern.test(v) || 'Invalid e-mail';
        },
      },
      successIcon,
      mobile: this.value.data.Mobile,
      mobile2: this.value.data.Mobile2,
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country_id: null,
      },
      subLoading: this.isLoading,
    }
  },
  computed: {
    mobileCode() {
      if (!this.value.data.Mobile) {
        return null;
      }
      return this.value.data.Mobile.split(' ')[0];
    },
    mobileCode2() {
      if (!this.value.data.Mobile2) {
        return null;
      }
      return this.value.data.Mobile2.split(' ')[0];
    }
  },
  methods: {
    onNextClick() {
      this.saveState(3);
    },
    onSaveClick() {
      this.saveState(2);
    },
    onPrevClick() {
      this.saveState(1);
    },
    saveState(stepNum) {
      if (this.isViewMode) {
        this.$emit('formButtonClick', stepNum);
        return;
      }
      const Address_id = this.value.data.Address_id;
      let addressEmpty = true;
      Object.values(this.address).forEach(val => {
        if (val) {
          addressEmpty = false;
        }
      });
      if ((Address_id && Address_id != '0') || !addressEmpty) {
        this.subLoading = true;

        addUpdateAddressRequest({
          Address_id: Address_id || null,
          Address1: this.address.address1,
          Address2: this.address.address2,
          City: this.address.city,
          State: this.address.state,
          Zip: this.address.zip,
          Country_id: this.address.country_id
        }).then(response => {
          window.console.log(response);
          this.subLoading = false;
          const res = response.data.response;
          if (res.status) {
            this.value.data.Address_id = res.data[0].Address_id;
          }
          this.$emit('formButtonClick', stepNum);
        }).catch(() => {
          this.subLoading = false;
          this.$emit('formButtonClick', stepNum);
        });
      } else {
        this.$emit('formButtonClick', stepNum);
      }
    },
    onInputMobile(formattedNumber, { number }) {
      window.console.log('Mobile number', number)
      this.value.data.Mobile = number.international ? number.international : formattedNumber;
    },
    onInputMobile2(formattedNumber, { number }) {
      this.value.data.Mobile2 = number.international ? number.international : formattedNumber;
    },
  },
  created() {
    if (this.value.data.Address_id && this.value.data.Address_id != '0') {
      this.subLoading = true;
      getAddressById(this.value.data.Address_id)
        .then((response) => {
          const res = response.data.response;
          if (res.status) {
            this.address = res.data[0];
            this.address.country_id = parseInt(this.address.country_id) || 0;
          }
          this.subLoading = false;
        })
        .catch((e) => {
          window.console.log('get address error', e);
          this.subLoading = false
        });
    }
  }
}
</script>

<style lang="scss">
  .pq-personal-detail {
    margin-top: 10px;

    .v-icon {
      color: #333;
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      th, td {
        height: 30px;
        font-size: 12px;
        padding: 0 8px;
        text-align: left;
        vertical-align: middle;
        border-right: 1px solid #dddbdb;
      }

      th {
        height: 32px;
      }

      thead th {
        background-color: #c2c2c2;
        color: #333;
      }

      tbody {
        tr {
          &:nth-child(odd) {
            background-color: #fff;
          }
          &:nth-child(even) {
            background-color: #eee;
          }

          &:last-child {
            border-bottom: 1px solid #dddbdb;
          }

          td > img {
            padding-top: 3px;
          }

          td .v-input {
            padding: 0;
            padding-bottom: 3px;
            margin: 0;
            width: 100%;

            label {
              color: #8a8a8a !important;
            }

            .v-input__control > .v-input__slot {
              margin-bottom: 0;
              &:before {
                display: none;
              }
              &:after {
                display: none;
              }
            }

            .v-text-field__details {
              display: none;
            }
          }
        }
      }
    }

    p {
      font-size: 13px;
    }

    .checkbox-like {
      .v-input__prepend-outer {
        font-weight: 500;
      }
    }
  }
</style>