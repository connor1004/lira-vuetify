<template>
  <div class="civil-disciplinary">
    <v-row>
      <v-col cols="12">
        <p>If any of the answers to questions 36 to 53 are "Yes", please give full particulars on a separate sheet of paper clearly  stating the number of the question to which the details relate. Please note that no time restrictions apply to the  matters  you are asked to disclose. Any  convictions  and  other  facts  must  be  stated.  The  questions refer to  all  jurisdictions and countries, and your answers should not be restricted to any one jurisdiction in isolation. Declaring a  conviction etc. should not be seen as an automatic bar to licensing, as all matters are judged individually on their  merits</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <CivilDisciplinaryItem
          v-for="(item, i) in items"
          v-model="items[i]"
          :key="item.PQMasterChecklist_id"
          :saved="isSaved"
          :readonly="isViewMode"
        >
          {{ item.QText }}
        </CivilDisciplinaryItem>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <p>Provide details of all banks (or other financial institutions2) which you have conducted your financial affairs over the previous five years.</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="11">
        <BankRecords
          v-model="value.records.Bank"
          :pq-id="value.data.id"
          :countries="countries"
          :readonly="isViewMode"
        />
      </v-col>
    </v-row>

    <v-btn color="info mr-3 ml-1 mt-6 mb-6" @click="onPrevClick" :loading="isLoading || subLoading">
      <v-icon left>keyboard_arrow_left</v-icon>
      Previous
    </v-btn>
    <v-btn color="success mr-3 mt-6 mb-6" v-if="!isViewMode" @click="onSaveClick" :loading="isLoading || subLoading">
      Save
    </v-btn>
    <v-btn color="info mt-6 mb-6" @click="onNextClick" :loading="isLoading || subLoading">
      Next
      <v-icon right>keyboard_arrow_right</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import CivilDisciplinaryItem from './CivilDisciplinaryItem'
  import BankRecords from './BankRecords'
  import { getPQChecklistDataByPQId, addUpdatePQFormChecklistData } from '../../../config/requests'

  export default {
    name: "CivilDisciplinary",
    data() {
      return {
        testItem: true,
        items: [],
        banks: [],
        isSaved: false,
        subLoading: false,
      }
    },
    props: ['value', 'countries', 'isLoading', 'isViewMode'],
    components: {
      CivilDisciplinaryItem,
      BankRecords
    },
    created() {
      this.subLoading = true;
      getPQChecklistDataByPQId(this.value.data.id)
        .then(this.successHandler)
        .catch(() => {
          this.subLoading = false;
        })
    },
    methods: {
      onNextClick() {
        this.saveState(7);
      },
      onSaveClick() {
        this.saveState(6)
      },
      onPrevClick() {
        this.saveState(5);
      },
      saveState(tabNum) {
        if (this.isViewMode) {
          this.$emit('formButtonClick', tabNum);
          return;
        }
        this.isSaved = true;
        this.subLoading = true;
        this.$emit('setLoading');
        window.console.log('check items to be saved: ', this.items);
        addUpdatePQFormChecklistData(this.items)
          .then(response => {
            this.subLoading = false;
            window.console.log('checklist add/update response: ', response);
            this.$emit('formButtonClick', tabNum)
          })
          .catch(() => {
            this.subLoading = false;
            this.$emit('formButtonClick', tabNum);
          })
      },
      successHandler(response) {
        this.subLoading = false;
        const res = response.data.response;
        if (res.status) {
          this.items = res.data;
        }
        window.console.log('checklist data', response);
      }
    }
  }
</script>

<style>
  .civil-disciplinary {
    margin: 20px 0;
  }
  .civil-disciplinary p{
    font-size: 13px;
  }
  .pr-0 {
    padding-right: 0;
  }
</style>