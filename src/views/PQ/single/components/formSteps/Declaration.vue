<template>
  <div class="declaration mt-4">
    <v-row>
      <v-col cols="12">
        <h6>Declare:</h6>
        <ol type="a">
          <li>that I have, to the best of my knowledge, truthfully and fully answered the relevant questions in this Questionnaire and disclosed any information which might reasonably be considered relevant;</li>
          <li>that I will promptly notify the Financial Services Authority of any changes in the information I have provided and supply any other information that may arise: and</li>
          <li>that I fully understand and acknowledge that a failure on my part to comply with the declaration will render the application liable to be refused and, if such failure is discovered after the application has been accepted, will render the application liable to be suspended or revoked.</li>
        </ol>
      </v-col>
      <v-col cols="12">
        <p class="mt-4">I hereby understand and consent that the Financial Services Authority (the "Authority") may wish to make enquiries, both now and on a continuing basis, to satisfy itself as to my initial and continuing fitness and propriety. Accordingly, I authorize the bankers named in this Questionnaire, together with any other person, body or institution (including the Police) which the Authority may approach, to provide such information as the Authority believes may be relevant to its assessment of my initial and continuing fitness and propriety. I consent to the FSA accessing information on my credit history from credit information sources in the Seychelles or elsewhere.</p>
      </v-col>
      <div class="center-width">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Applicant Name"
              v-model="value.data.FullName"
              required
              class="required"
              :rules="[v => !!v || 'Please enter your Name']"
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Signature"
              v-model="value.data.Signature" 
              :readonly="isViewMode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <date-picker type="date"
              v-model="value.data.Signdate"
              required
              class="required"
              label="mm/dd/yyyy"
              :singleLine="true"
              :rules="[v => !!v || 'Please enter Date']"
              :readonly="isViewMode"
            />
          </v-col>
        </v-row>
      </div>
    </v-row>
    <v-btn color="info mr-3 ml-1 mt-8 mb-5" @click="onPrevClick" :loading="isLoading">
      <v-icon left>keyboard_arrow_left</v-icon>
      Previous
    </v-btn>
    <v-btn color="success mt-8 mb-5" v-if="!isViewMode" @click="onSubmitClick" :loading="isLoading">
      Submit
    </v-btn>
  </div>
</template>

<script>
  import DatePicker from '@/components/DatePicker'
  export default {
    name: "Declaration",
    components: {
      DatePicker,
    },
    props: ['value', 'isLoading', 'isViewMode'],
    methods: {
      onSubmitClick() {
        this.$emit('formButtonClick', 8, true);
      },
      onPrevClick() {
        this.$emit('formButtonClick', 7);
      }
    }
  }
</script>

<style lang="scss">
.declaration {
  padding: 15px;

  h6 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  ol {
    padding-left: 40px;

    li {
      font-size: 13px;
      margin-bottom: 10px;
      font-weight: 400;
    }
  }

  .center-width {
    width: 600px;
    padding: 40px 30px 0;
    max-width: 100%;
    margin: 20px auto 0;
  }
}
</style>