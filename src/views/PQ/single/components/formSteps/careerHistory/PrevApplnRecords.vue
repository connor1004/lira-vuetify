
<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.K_position"
              label="Position"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.K_jurisdiction"
              label="Jurisdiction"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.K_RAuthority"
              label="Regulatory Authority"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              label="Year"
              v-model="item.K_Year"
              :items="['2000', '2001', '2002', '2003', '2004']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.K_NatureOfBusiness"
              label="Nature of Business"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Outcome"
              v-model="item.K_outcome" 
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
    name: "PrevAppInnRecords",
    mixins: [recordMixin],
    props: ['pqId', 'readonly'],
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
          "RecordType": "PrevA",
          "K_position": "",
          "K_jurisdiction": "",
          "K_RAuthority": "",
          "K_Year": "",
          "K_NatureOfBusiness": "",
          "K_outcome": ""
        })
      }
    }
  }
</script>
