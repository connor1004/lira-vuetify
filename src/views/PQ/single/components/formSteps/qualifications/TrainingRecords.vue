<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item.D_Training"
              label="Training"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.D_trainingProvider"
              label="Training Provider"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item.D_Duration"
              label="Duration"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-select
              v-model="item.D_TrainingYear"
              label="Year"
              :items="['2000', '2001', '2002']"
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
    name: "TrainingRecords",
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
          "RecordType": "Train",
          "D_Training": "",
          "D_trainingProvider": "",
          "D_Duration": "",
          "D_TrainingYear": ""
        })
      }
    }
  }
</script>

<style>
  .recordLine > .row {
    position: relative;
  }
</style>
