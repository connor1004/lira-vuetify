<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.H_CompanyName"
              label="Company Name"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.H_CompanyNumber"
              label="Company Number"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="item.H_CountryOfReg"
              :items="countries"
              label="Country of Registration"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.H_NatureOfBusiness"
              label="Nature of Business"
              required
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
  import recordMixin from '@/mixins/recordMixin'

  export default {
    name: "DirectorRecords",
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
          "RecordType": "Partn",
          "H_CompanyName": "",
          "H_CompanyNumber": "",
          "H_CountryOfReg": null,
          "H_NatureOfBusiness": ""
        })
      }
    }
  }
</script>
