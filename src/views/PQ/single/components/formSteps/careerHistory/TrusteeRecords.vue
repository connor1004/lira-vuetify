<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.G_TrustName"
              label="Name of Trust"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.G_TrustNumber"
              label="Registration Number"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="item.G_CountryOfReg"
              :items="countries"
              label="Country of Registration"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.G_Position"
              label="Position Held"
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
    name: "TrusteeRecords",
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
          "RecordType": "Trust",
          "G_TrustName": "",
          "G_TrustNumber": "",
          "G_CountryOfReg": null,
          "G_Position": ""
        })
      }
    }
  }
</script>
