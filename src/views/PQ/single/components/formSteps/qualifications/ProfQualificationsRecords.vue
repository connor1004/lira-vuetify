<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              required
              class="required"
              label="Membership No."
              v-model="item.B_MembershipNumber"
              :rules="[v => !!v || 'Please enter your Membership Number']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              required
              class="required"
              label="Professional Qualification"
              v-model="item.B_MembershipQual"
              :rules="[v => !!v || 'Qualification is Required']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-select
              v-model="item.B_MembershipQualType"
              :items="qualificationTypes"
              label="Qualification Type"
              :readonly="readonly"
            />
          </v-col>
          <v-col class="col-sm-2">
            <v-select
              label="Year"
              v-model="item.B_Membershipyear"
              :items="['2000', '2001', '2002']"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <file-input
              label="Upload File"
              :value="item"
              uploadType="pq-record"
              :disabled="!item.PQRecord_id || readonly"
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
  import FileInput from '@/components/FileInput'
  import recordMixin from '@/mixins/recordMixin'

  export default {
    name: "ProfQualificationsRecords",
    components: {
      FileInput,
    },
    mixins: [recordMixin],
    props: ['pqId', 'qualificationTypes', 'countries', 'readonly'],
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
          "RecordType": "PQual",
          "B_MembershipNumber": "",
          "B_MembershipQual": "",
          "B_MembershipQualType": 1,
          "B_Membershipyear": "2003"
        })
      }
    }
  }
</script>
