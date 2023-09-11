<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item.C_MembershipNumber"
              label="Membership No."
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="4" sm="4">
            <v-text-field
              v-model="item.C_Institute"
              label="Name of Institute"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-select
              v-model="item.C_MembershipYear"
              label="Year"
              :items="['2000', '2001', '2002']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              label="Select One"
              v-model="item.C_MembershipType_AFM"
              :items="membershipTypes"
              :readonly="readonly"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="11" class="mt-3">
            <h6 class="mb-0 contact-detail">Contact Detail</h6>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              label="Name"
              v-model="item.C_ContactName"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <vue-tel-input
              :value="item.C_ContactPhone"
              label="Mobile"
              validCharactersOnly
              @input="(num, obj) => onInputMobile(num, obj, item)"
              :disabled="readonly"
            />
          </v-col>
          <v-col cols="12" sm="5">
            <address-input label="Address"
              v-model="item.C_Address_id"
              :countries="countries"
              :readonly="readonly"
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
  import recordMixin from '@/mixins/recordMixin'
  import AddressInput from '@/components/AddressInput'

  export default {
    name: "CurrentMembershipRecords",
    components: {
      VueTelInput,
      AddressInput,
    },
    mixins: [recordMixin],
    props: ['pqId', 'qualificationTypes', 'countries', 'readonly'],
    data() {
      return {
        membershipTypes: [
          {
            text: 'Associate', value: 'A'
          },
          {
            text: 'Fellow', value: 'F'
          },
          {
            text: 'Member', value: 'M'
          },
        ]
      };
    },
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
          "RecordType": "CMemb",
          "C_MembershipNumber": "",
          "C_Institute": "",
          "C_MembershipYear": "",
          "C_MembershipType_AFM": "",
          "C_ContactName": "",
          "C_ContactPhone": "",
          "C_Address_id": null
        })
      },
      onInputMobile(formattedNumber, { number }, item) {
        window.console.log('Mobile number', number)
        item.C_ContactPhone = number.international ? number.international : formattedNumber;
      },
    }
  }
</script>

<style lang="scss">
 h6.contact-detail {
   font-size: 14px;
   font-weight: 500;
 }
</style>