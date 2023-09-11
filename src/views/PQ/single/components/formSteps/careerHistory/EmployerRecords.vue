<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.E_Employername"
              label="Name"
              required
              class="required"
              :rules="[v => !!v || 'Please enter the name']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.E_employerAddress_id"
              label="Address"
              required
              class="required"
              :rules="[v => !!v || 'Please enter the Address']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.E_EmployerContact"
              label="Contact Detail of Employer"
              required
              class="required"
              :rules="[v => !!v || 'Please enter the Contact Detail']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.E_NatureOfBusiness"
              label="Nature of Business"
              required
              class="required"
              :rules="[v => !!v || 'Please enter the Nature of Business']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="item.E_Position"
              label="Position Held"
              required
              class="required"
              :rules="[v => !!v || 'Please enter the Position Held']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <date-picker 
              v-model="item.E_EmploymentStartDate"
              label="Dates of Employment"
              required
              class="required"
              :rules="[v => !!v || 'Please enter the Date']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <date-picker 
              v-model="item.E_EmploymentEndDate"
              :singleLine="true"
              label="mm/dd/yyyy"
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
  import DatePicker from '@/components/DatePicker'
  import recordMixin from '@/mixins/recordMixin'

  export default {
    name: "EmployerRecords",
    components: {
      DatePicker,
    },
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
          "pq_id":  this.pqId,
          "RecordType": "Emplr",
          "E_Employername": "",
          "E_employerAddress_id": null,
          "E_EmployerContact": "",
          "E_NatureOfBusiness": "",
          "E_Position": "",
          "E_EmploymentStartDate": '',
          "E_EmploymentEndDate": ''
        })
      }
    }
  }
</script>
