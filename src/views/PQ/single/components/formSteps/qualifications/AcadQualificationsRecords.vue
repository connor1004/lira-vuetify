<template>
  <div class="recordLine">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="item.A_Qual"
              required
              class="required"
              label="Qualification"
              :rules="[v => !!v || 'Please enter your Qualification']"
              :readonly="readonly"
            />
          </v-col>
          <div class="col-sm-4">
            <v-text-field
              v-model="item.A_Institute"
              required
              class="required"
              label="Institution/Awarding Body"
              :rules="[v => !!v || 'Please enter your Institution']"
              :readonly="readonly"
            />
          </div>
          <v-col cols="12" sm="2">
            <v-select
              label="Year"
              v-model="item.A_qualyear"
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
    name: "AcadQualificationsRecords",
    components: {
      FileInput,
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
          "pq_id": this.pqId,
          "RecordType": "AQual",
          "A_Qual": "",
          "A_Institute": "",
          "A_qualyear": ""
        })
      }
    },
  }
</script>