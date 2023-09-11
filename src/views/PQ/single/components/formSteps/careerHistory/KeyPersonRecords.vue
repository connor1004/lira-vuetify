
<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.J_Position"
              label="Position"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="item.J_jurisdiction"
              label="Jurisdiction"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              label="Year"
              v-model="item.J_Year"
              :items="['2000', '2001', '2002', '2003', '2004']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.J_NatureOfBusiness"
              label="Nature of Business"
              required
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Regulatory Authority"
              v-model="item.J_RAuthority"
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
    name: "KeyPersonRecords",
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
          "RecordType": "KPer",
          "J_Position": "",
          "J_position": "",
          "J_jurisdiction": "",
          "J_Year": "",
          "J_NatureOfBusiness": "",
          "J_RAuthority": ""
        })
      }
    }
  }
</script>
