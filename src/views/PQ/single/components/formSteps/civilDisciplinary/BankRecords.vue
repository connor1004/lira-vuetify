<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.M_BankName"
              required
              class="required"
              label="Name of Bank"
              :rules="[v => !!v || 'Please enter the Name of Bank']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <address-input
              :countries="countries"
              v-model="item.M_BankAddress_id"
              :required="true"
              class="required"
              label="Address"
              :rules="[v => !!v || 'Please enter your Address']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <vue-tel-input
              :value="item.M_BankContactNo"
              label="Contact Number"
              required
              validCharactersOnly
              @input="(num, obj) => onInputMobile(num, obj, item)"
              :rules="[v => !!v || 'Please Enter your Mobile Number']"
              :disabled="readonly"
            />
          </v-col>
        </v-row>
      </div>
      <add-remove-button
        :isLast="isLast(i)"
        @remove="() => deleteRow(i)"
        @add="addRow"
        v-if="!readonly"
      />
    </div>
  </div>
</template>

<script>
  import VueTelInput from '@/components/VueTelInput/vue-tel-input'
  import AddressInput from '@/components/AddressInput';
  import recordMixin from '@/mixins/recordMixin';

  export default {
    name: "BankRecords",
    components: {
      VueTelInput,
      AddressInput,
    },
    mixins: [recordMixin],
    props: ['pqId', 'countries', 'readonly'],
    created() {
      if (this.value.length === 0) {
        this.pushEmptyValue()
      }
    },
    methods: {
      addRow() {
        this.pushEmptyValue()
      },
      pushEmptyValue() {
        this.value.push({
          "PQRecord_id": null,
          "pq_id": this.pqId,
          "RecordType": "Bank",
          "M_BankContactNo": "",
          "M_BankName": "",
          "M_BankAddress_id": null
        })
      },
      onInputMobile(formattedNumber, { number }, item) {
        window.console.log('Mobile number', number)
        item.M_BankContactNo = number.international ? number.international : formattedNumber;
      },
    }
  }
</script>