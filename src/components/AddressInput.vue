<template>
  <v-dialog v-model="dialog" persistent max-width="600px" class="address-dialog">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="stringifyAddress"
        :label="label"
        readonly
        :required="required"
        :rules="rules"
        :class="required ? 'required' : ''"
        v-on="readonly ? null : on"
      ></v-text-field>
    </template>
    <v-card class="card dialog-card">
      <v-card-text class="card-body">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Address Line 1" v-model="address.address1"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Address Line 2" v-model="address.address2"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field label="City" v-model="address.city"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field label="State" v-model="address.state"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field label="Zip" v-model="address.zip"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select label="Country" :items="countries" v-model="address.country_id" @change="onCountryChange"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="info" @click="onDialogSaveClick" :loading="isLoading" class="mt-2 mb-4">
                Save
              </v-btn>
              <!-- <v-btn @click="dialog = false" :loading="isLoading" class="mt-2 mb-4 ml-4">
                Close
              </v-btn> -->
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { addUpdateAddressRequest, getAddressById } from '@/api/requests'

export default {
  name: 'AddressInput',
  props: ['value', 'label', 'countries', 'rules', 'required', 'readonly'],
  data() {
    return {
      dialog: false,
      isLoading: false,
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country_id: null,
        countryname: '',
      }
    }
  },
  computed: {
    stringifyAddress() {
      return Object.keys(this.address).reduce((acc, current) => {
        if (this.address[current] && this.address[current] !== ' ' && current != 'country_id' && current != 'caddress') {
          if (acc) {
            return `${acc}, ${this.address[current]}`;
          }
          return `${this.address[current]}`;
        }
        return `${acc}`
      }, '');
    }
  },
  created() {
    this.getAddress();
  },
  methods: {
    onDialogSaveClick() {
      this.isLoading = true;
      let isEmpty = true;
      Object.values(this.address).forEach(val => {
        if (val) {
          isEmpty = false;
        }
      });

      if (this.value || !isEmpty) {
        addUpdateAddressRequest({
          Address_id: this.value || null,
          Address1: this.address.address1,
          Address2: this.address.address2,
          City: this.address.city,
          State: this.address.state,
          Zip: this.address.zip,
          Country_id: this.address.country_id
        }).then(response => {
          this.isLoading = false;
          const res = response.data.response;
          // window.console.log('addupdateAddress', response);
          if (res.status) {
            this.dialog = false;
            this.$emit('input', response.data.response.data[0].Address_id);
          }
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    getAddress() {
      if (this.value) {
        this.isLoading = true;
        getAddressById(this.value)
          .then(this.handleRequest)
          .catch(() => { this.isLoading = false });
      }
    },
    handleRequest(response) {
      // window.console.log('getaddress', response);
      const res = response.data.response;
      if (res.status) {
        this.address = response.data.response.data[0];
        this.address.country_id = parseInt(this.address.country_id) || 0;
      }
      this.isLoading = false;
    },
    onCountryChange(val) {
      const countryFiltered = this.countries.filter(item => {
        return item.value == val;
      });
      if (countryFiltered) {
        this.address.country_name = countryFiltered[0].text;
      }
      else {
        this.address.countryname = '';
      }
    }
  },
  watch: {
    value: {
      handler() {
        this.address = {
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
          country_id: null,
          countryname: '',
        };
        this.getAddress();
      }
    }
  }
}
</script>