<template>
  <div class="proposed-role">
    <v-row>
      <v-col cols="12" sm="9">
        <p>Is your role with the licence holder or licence applicant full time or part‐time?</p>
        <span class="text-danger" v-if="!value.data.FullOrParttime"><span class="invalid-feedback">This field is required to select</span></span>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          single-line
          label="Select One"
          v-model="value.data.FullOrParttime"
          :items="items.time"
          :readonly="isViewMode"
        />
      </v-col>
    </v-row>

    <v-row v-if="value.data.FullOrParttime === 'P'">
      <v-col cols="12" sm="9">
        <p>
          How much time do you give, or (if a new appointment) do you anticipate giving, 
          to the work of the licence holder? For applicant working part‐time only
          <span class="text-danger"> *</span>
        </p>
        <span class="text-danger"
          v-if="!value.data.TimeExpectedToSpend && isSaved"
        >
          <span class="invalid-feedback">This field is required</span>
        </span>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          ref="timeExpectedToSpend"
          label="Access Time"
          single-line
          append-icon="access_time"
          v-model="value.data.TimeExpectedToSpend"
          :readonly="isViewMode"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="9">
        <p>
          Would you be fulfilling the dual control requirement as specified under paragraph 4 
          of the Code of Licencees of the ICSP ACT? For entities licenced under the International 
          Corporate Service Providers Act, 2003 only:
          <span class="text-danger"> *</span>
        </p>
        <span class="text-danger"
          v-if="!value.data.DualYN && isSaved"
        ><span class="invalid-feedback">This field is required to select</span></span>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          single-line
          label="Select One"
          :items="items.duals"
          v-model="value.data.DualYN"
          :readonly="isViewMode"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="9">
        <p>
          Would you be based in Seychelles?
          <span class="text-danger"> *</span>
        </p>
        <span class="text-danger"
          v-if="!value.data.IsSeyResident && isSaved"
        ><span class="invalid-feedback">This field is required to select</span></span>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          single-line
          label="Select One"
          v-model="value.data.IsSeyResident"
          :items="items.seyResidentValues"
          :readonly="isViewMode"
        />
      </v-col>
    </v-row>

    <template v-if="value.data.IsSeyResident == '0'">
      <v-row>
        <v-col cols="12" sm="9">
          <p>If no, indicate the length of time to be spent in the Seychelles per year.</p>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            label="Select One"
            single-line
            v-model="value.data.LenOfTimeInSey"
            :items="items.period"
            :readonly="isViewMode"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="9">
          <p>If no, indicate the Country and business address where you will be based.</p>
        </v-col>
        <v-col cols="12" sm="3">
          <v-select
            :items="countries"
            single-line
            v-model="value.data.CountryWhereExpected"
            label="Country"
          :readonly="isViewMode"
          />
        </v-col>
      </v-row>
    </template>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Address Line 1"
          required
          class="required"
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
          :items="countries"
          label="Select Country"
          v-model="address.country_id"
          :readonly="isViewMode"
        />
      </v-col>
    </v-row>

    <v-btn color="info mr-3 ml-1 mt-2 mb-5" @click="onPrevClick" :loading="isLoading || subLoading">
      <v-icon left>keyboard_arrow_left</v-icon>
      Previous
    </v-btn>
    <v-btn color="success mt-2 mr-3 mb-5" v-if="!isViewMode" @click="onSaveClick" :loading="isLoading || subLoading">
      Save
    </v-btn>
    <v-btn color="info mt-2 mb-5" @click="onNextClick" :loading="isLoading || subLoading">
      Next
      <v-icon right>keyboard_arrow_right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { addUpdateAddressRequest, getAddressById } from '@/api/requests'
export default {
  name: "ProposedRole",
  props: ['value', 'countries', 'isLoading', 'isViewMode'],
  data() {
    return {
      items: {
        time: [
          {
            text: 'Full Time',
            value: 'F',
          },
          {
            text: 'Part Time',
            value: 'P'
          }
        ],
        duals: [
          { text: 'Yes', value: 'Y' },
          { text: 'No', value: 'N' },
        ],
        seyResidentValues: [
          { text: 'Yes', value: '1' },
          { text: 'No', value: '0' },
        ],
        period: ['None', '1 Month', '6 Months'],
      },
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country_id: null,
      },
      subLoading: false,
      isSaved: false,
    }
  },
  methods: {
    onNextClick() {
      this.saveState(4);
    },
    onSaveClick() {
      this.saveState(3);
    },
    onPrevClick() {
      this.saveState(2);
    },
    saveState(stepNum) {
      if (this.isViewMode) {
        this.$emit('formButtonClick', stepNum);
        return;
      }
      this.isSaved = true;
      const Address_id = this.value.data.SeyAddress_id;
      let addressEmpty = true;
      Object.values(this.address).forEach(val => {
        if (val) {
          addressEmpty = false;
        }
      });
      if ((Address_id && Address_id != '0') || !addressEmpty) {
        // this.subLoading = true;
        this.$emit('setLoading');
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
            this.value.data.SeyAddress_id = res.data[0].Address_id;
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
  },
  created() {
    if (this.value.data.SeyAddress_id && this.value.data.SeyAddress_id != '0') {
      this.subLoading = true;
      getAddressById(this.value.data.SeyAddress_id)
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
  },
}
</script>

<style lang="scss">
.proposed-role {
  margin-top: 10px;
  font-size: 13px;

  .text-danger {
    font-size: 11px;
    color: #ff3547;
  }

  p {
    margin-top: 20px;
  }
}
</style>