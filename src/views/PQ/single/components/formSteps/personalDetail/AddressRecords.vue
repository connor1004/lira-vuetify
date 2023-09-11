<template>
  <div class="record-line">
    <div class="d-flex flex-row align-end" v-for="(item, i) in value" :key="i">
      <div class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="3">
            <v-select
              label="Month"
              :items="monthItems"
              v-model="item.L_PastMonthFrom"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-select
              label="Year"
              :items="['2001', '2002', '2003']"
              v-model="item.L_PastyearFrom"
              :readonly="readonly"
            />
          </v-col>
          <v-col cols="12" sm="7">
            <address-input
              label="Address"
              v-model="item.L_PastAddress"
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
import AddressInput from '@/components/AddressInput'
import AddRemoveButton from '@/components/AddRemoveButton'

export default {
  name: 'AddressRecords',
  components: {
    AddressInput,
    AddRemoveButton,
  },
  props: ['value', 'countries', 'pq_id', 'readonly'],
  data() {
    return {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
    }
  },
  computed: {
    monthItems() {
      return this.months.map((item, index) => {
        return {
          text: item,
          value: `${index + 1}`,
        }
      });
    }
  },
  created() {
    if (this.value.length == 0) {
      this.pushEmptyValue();
    }
  },
  methods: {
    isLast(index) {
      if (this.value.length - 1 == index) {
        return true;
      }
      return false;
    },
    addRow() {
      this.pushEmptyValue();
    },
    deleteRow(rowNum) {
      this.value.splice(rowNum, 1);
    },
    pushEmptyValue() {
      this.value.push({
        PQRecord_id: null,
        pq_id: this.pq_id,
        DocumentPath: null,
        L_PastAddress: null,
        L_PastMonthFrom: null,
        L_PastMonthTo: null,
        L_PastyearFrom: null,
        L_PastyearTo: null,
        RecordType: "Addrs"
      });
    }
  }
}
</script>