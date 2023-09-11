<template>
  <div class="qualifications">
    <v-row class="mt-4">
      <v-col cols="11">
        <p>
          Details of any higher academic qualifications and the year in which they were obtained. (E.g. BA, LLB,
          MBA, etc.). Please provide certified true copies of certificates in relation to the qualifications
          obtained. In the event that the applicant is unable to provide proof of a stated qualification, the
          Authority would not consider the stated qualification in its assessment.
        </p>
      </v-col>
    </v-row>
    <AcadQualificationsRecords
      :pq-id="value.data.id"
      v-model="value.records.AQual"
      v-if="value.records"
      :readonly="isViewMode"
    />
    <v-row class="mt-4">
      <v-col cols="11">
        <p>
          Details of any professional qualifications and the year in which they were obtained (E.g. ACA, ACCA, ACIB
          etc.). Please provide certified true copies of certificates in relation to the qualifications obtained.
          Part Qualifications may also be included provided that they are indicated accordingly. In the event that
          the applicant is unable to provide proof of a stated qualification, the Authority would not consider the
          stated qualification in its assessment.
        </p>
      </v-col>
    </v-row>
    <ProfQualificationsRecords
      :pq-id="value.data.id"
      :qualificationTypes="qualificationTypes"
      v-model="value.records.PQual"
      v-if="value.records"
      :readonly="isViewMode"
    />
    <v-row class="mt-4">
      <v-col cols="11">
        <p>
          Details of current membership of any relevant professional bodies, their contact details and year of
          admission (e.g. Institute of Directors, Institute of Management, etc.).
        </p>
      </v-col>
    </v-row>
    <CurrentMembershipRecords
      :pq-id="value.data.id"
      :qualificationTypes="qualificationTypes"
      v-model="value.records.CMemb"
      :countries="countries"
      v-if="value.records"
      :readonly="isViewMode"
    />
    <v-row class="mt-4">
      <v-col cols="11">
        <p>Details of any relevant training undertaken (e.g. AML/ CFT Training, Compliance Training, etc.)</p>
      </v-col>
    </v-row>
    <TrainingRecords
      :pq-id="value.data.id"
      :qualificationTypes="qualificationTypes"
      v-model="value.records.Train"
      v-if="value.records"
      :readonly="isViewMode"
    />
    <v-btn color="info mr-3 ml-1 mt-2 mb-5" @click="onPrevClick" :loading="isLoading">
      <v-icon left>keyboard_arrow_left</v-icon>
      Previous
    </v-btn>
    <v-btn color="success mr-3 mt-2 mb-5" v-if="!isViewMode" @click="onSaveClick" :loading="isLoading">
      Save
    </v-btn>
    <v-btn color="info mt-2 mb-5" @click="onNextClick" :loading="isLoading">
      Next
      <v-icon right>keyboard_arrow_right</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import AcadQualificationsRecords from './AcadQualificationsRecords'
  import ProfQualificationsRecords from './ProfQualificationsRecords'
  import CurrentMembershipRecords from './CurrentMembershipRecords'
  import TrainingRecords from './TrainingRecords'

  export default {
    name: "Qualifications",
    components: {
      AcadQualificationsRecords,
      ProfQualificationsRecords,
      CurrentMembershipRecords,
      TrainingRecords,
    },
    props: ['value', 'qualificationTypes', 'stepId', 'countries', 'isLoading', 'isViewMode'],
    methods: {
      onNextClick() {
        this.$emit('formButtonClick', 5);
      },
      onSaveClick() {
        this.$emit('formButtonClick', 4);
      },
      onPrevClick() {
        this.$emit('formButtonClick', 3);
      }
    }
  }
</script>
<style lang="scss">
  .qualifications {
    p {
      font-size: 13px;
    }
  }
</style>