<template>
  <div class="career-history">
    <v-row>
      <v-col cols="11">
        <p class="mt-6">Beginning with your present occupation or employment, please list all occupations and employment during the last 10 years including the full name and addresses of the employers, the nature of the businesses, the positions held and the relevant dates. Kindly provide the latest employment reference from the list below (NB: The Authority may seek references from previous employers.)</p>
      </v-col>
    </v-row>

    <EmployerRecords v-model="value.records.Emplr" :pq-id="value.data.id" :readonly="isViewMode"/>

    <v-row>
      <v-col cols="11">
        <p class="mt-6">Details of any body corporate of which you are a Director or Secretary.</p>
      </v-col>
    </v-row>

    <DirectorRecords
      v-model="value.records.Direc"
      :pq-id="value.data.id"
      :countries="countryOptions"
      :readonly="isViewMode"
    />

    <v-row>
      <v-col cols="11">
        <p class="mt-6">Details of any trust on which you are the trustee, enforcer or protector in a personal capacity.</p>
      </v-col>
    </v-row>

    <TrusteeRecords
      v-model="value.records.Trust"
      :pq-id="value.data.id"
      :countries="countryOptions"
      :readonly="isViewMode"
    />

    <v-row>
      <v-col cols="11">
        <p class="mt-6">Details of any body corporate of which you are in partnership, have other business interests or affiliations</p>
      </v-col>
    </v-row>
    
    <PartnerRecords
      v-model="value.records.Partn"
      :pq-id="value.data.id"
      :countries="countryOptions"
      :readonly="isViewMode"
    />

    <v-row>
      <v-col cols="11">
        <p class="mt-6">Details of any previous approvals as a key person by a relevant financial services regulatory authority (or equivalent) in any jurisdiction (if applicable), including Seychelles.</p>
      </v-col>
    </v-row>
    
    <KeyPersonRecords v-model="value.records.KPer" :pq-id="value.data.id" :readonly="isViewMode"/>

    <v-row>
      <v-col cols="11">
        <p class="mt-6">Details of any previous applications made by you, or any body corporate, partnership or unincorporated institution with which you are, or have been  associated as a director, controller, key person or company secretary, to carry on any financial services activity whether successful or not.</p>
      </v-col>
    </v-row>
    
    <PrevApplnRecords v-model="value.records.PrevA" :pq-id="value.data.id" :readonly="isViewMode"/>

    <v-btn color="info mr-3 ml-1 mt-6 mb-6" @click="onPrevClick" :loading="isLoading">
      <v-icon left>keyboard_arrow_left</v-icon>
      Previous
    </v-btn>
    <v-btn color="success mr-3 mt-6 mb-6" v-if="!isViewMode" @click="onSaveClick" :loading="isLoading">
      Save
    </v-btn>
    <v-btn color="info mt-6 mb-6" @click="onNextClick" :loading="isLoading">
      Next
      <v-icon right>keyboard_arrow_right</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import EmployerRecords from './EmployerRecords'
  import DirectorRecords from './DirectorRecords'
  import TrusteeRecords from './TrusteeRecords'
  import KeyPersonRecords from './KeyPersonRecords'
  import PartnerRecords from './PartnerRecords'
  import PrevApplnRecords from './PrevApplnRecords'

  export default {
    name: "CareerHistory",
    props: ['value', 'countries', 'isLoading', 'isViewMode'],
    data() {
      return {

      }
    },
    computed: {
      countryOptions() {
        return this.countries.map(item => {
          item.value = `${item.value}`;
          return item;
        });
      }
    },
    methods: {
      onNextClick() {
        this.$emit('formButtonClick', 6);
      },
      onSaveClick() {
        this.$emit('formButtonClick', 5);
      },
      onPrevClick() {
        this.$emit('formButtonClick', 4);
      },
    },
    components: {
      TrusteeRecords,
      KeyPersonRecords,
      PartnerRecords,
      PrevApplnRecords,
      EmployerRecords,
      DirectorRecords
    }
  }
</script>
<style lang="scss">
  .career-history {
    .recordLine > div > div:not(.add-remove-button) {
      border-bottom: 1px solid #c7c7c7;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>