<template>
  <div class="pq">
    <div class="content-header">
      <v-breadcrumbs :items="breadcumbs" divider=">"></v-breadcrumbs>
    </div>
    <div class="main-content">
      <main-card
        title="Personal Questionnaire Form"
      >
        <stepper-tab
          :steps="steps"
          :activeStep="step"
          @tabClick="onTabClick"
        >
          <div class="stepper-tab-content" v-if="step == 1">
            <general-info
              :value="form"
              :isLoading="isLoading"
              :isViewMode="isViewMode"
              @formButtonClick="onFormButtonClick"
            />
          </div>
          <div class="stepper-tab-content" v-if="step == 2">
            <personal-detail
              :value="form"
              :isLoading="isLoading"
              :countries="countries"
              :identificationTypes="identificationTypes"
              :userData="loggedInUser"
              :isViewMode="isViewMode"
              @formButtonClick="onFormButtonClick"
            />
          </div>
          <div class="stepper-tab-content" v-if="step == 3">
            <proposed-role
              :value="form"
              :isLoading="isLoading"
              :countries="countries"
              :isViewMode="isViewMode"
              @formButtonClick="onFormButtonClick"
              @setLoading="isLoading = true"
            />
          </div>
          <div class="stepper-tab-content" v-if="step == 4">
            <qualifications
              :value="form"
              :isLoading="isLoading"
              :countries="countries"
              :isViewMode="isViewMode"
              :qualificationTypes="qualificationTypes"
              @formButtonClick="onFormButtonClick"
            />
          </div>
          <div class="stepper-tab-content" v-if="step == 5">
            <career-history
              :value="form"
              :isLoading="isLoading"
              :countries="countries"
              :isViewMode="isViewMode"
              @formButtonClick="onFormButtonClick"
            />
          </div>
          <div class="stepper-tab-content" v-if="step == 6">
            <civil-disciplinary
              ref="civilDisciplinaryRef"
              :value="form"
              :isLoading="isLoading"
              :countries="countries"
              :isViewMode="isViewMode"
              @setLoading="isLoading = true"
              @formButtonClick="onFormButtonClick"
            />
          </div>
          <div class="stepper-tab-content" v-if="step == 7">
            <discloser-conflict
              :value="form"
              :isLoading="isLoading"
              :isViewMode="isViewMode"
              @formButtonClick="onFormButtonClick"
            />
          </div>
          <div class="stepper-tab-content" v-if="step == 8">
            <declaration
              :value="form"
              :isLoading="isLoading"
              :isViewMode="isViewMode"
              @formButtonClick="onFormButtonClick"
            />
          </div>
        </stepper-tab>
      </main-card>
    </div>
    <v-dialog
      v-model="errorDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          primary-title
        >
          {{errorDialogTitle}}
        </v-card-title>

        <v-card-text>
          {{errorDialogContent}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="errorDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainCard from '@/components/MainCard'
import StepperTab from '@/components/StepperTab'
import {
  GeneralInfo,
  PersonalDetail,
  ProposedRole,
  Qualifications,
  CareerHistory,
  CivilDisciplinary,
  DiscloserConflict,
  Declaration,
} from './components/formSteps'
import data from './config/data';
import {
  getIdentificationTypes,
  getCountries,
  getQualificationTypes,
  addUpdatePQForm,
  createNewForm,
  // getPQformById,
  // addUpdatePQFormChecklistData,
  // getPQMasterChecklist,
  // getPQChecklistDataByPQId,
  addUpdatePQRecord,
  getPQformDetails,
  getPQRecordByPQid,
  getProcessDocument
} from './config/requests'

export default {
  components: {
    MainCard,
    StepperTab,
    GeneralInfo,
    PersonalDetail,
    ProposedRole,
    Qualifications,
    CareerHistory,
    CivilDisciplinary,
    DiscloserConflict,
    Declaration,
  },
  data() {
    return {
      breadcumbs: [
        {
          text: 'IBC',
          disabled: false,
          to: '/',
        },
        {
          text: 'Personal Questionnaire Form',
          disabled: true,
          to: '/pq-forms',
        },
      ],
      steps: [
        'General Info',
        'Personal Detail',
        'Proposed Role',
        'Qualifications',
        'Career History',
        'Civil and Disciplinary',
        'Discloser of Conflict',
        'Declaration'
      ],
      step: 1,
      items: {},
      errorDialog: false,
      errorDialogTitle: '',
      errorDialogContent: '',
      isLoading: false,
      form: {
        data,
        records: {
          AQual: [],
          Addrs: [],
          Bank: [],
          CMemb: [],
          Direc: [],
          Emplr: [],
          KPer: [],
          PQual: [],
          Partn: [],
          PrevA: [],
          Train: [],
          Trust: [],
        },
        documents: [],
      },
      identificationTypes: null,
      qualificationTypes: null,
      countries: [],
      isViewMode: false,
    };
  },
  created() {
    const { id: formId } = this.$route.params;
    this.isViewMode = this.$route.path.includes('view');
    window.console.log('isViewMode: ' + this.isViewMode);
    this.isLoading = true;
    if (formId === 'new') {
      if (this.isViewMode) {
        this.$router.push('/pq-forms');
        return;
      }
      createNewForm({ process_id: 702 }).then((res) => {
        const response = res.data.response;
        window.console.log(response);
        if (response.status) {
          this.form.data.id = response.data[0].TAskReference_id;
          this.$rouer.replace({ path: `/pq-forms/${this.form.data.id}` });
          this.getDataRequest()
            .then(this.handleDataRequest)
            .catch(err => {
              this.isLoading = false;
              this.showErrorDialog(`Please refresh the page. ${err}`);
            });
        }
        else {
          this.showErrorDialog(response.message);
          this.isLoading = false;
        }
      }).catch(err => {
        this.showErrorDialog(`Please refresh the page. ${err}`);
        window.console.log(err);
        this.isLoading = false;
      })
    } else {
      this.form.data.id = formId;
      this.getDataRequest()
        .then(this.handleDataRequest)
        .catch(err => {
          this.isLoading = false;
          this.showErrorDialog(`Please refresh the page. ${err}`);
        });
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    onTabClick(tabNum) {
      if (this.step != tabNum) {
        if (this.isViewMode) {
          this.step = tabNum;
        }
        else if (this.step == 6) {
          this.$refs.civilDisciplinaryRef.saveState(tabNum);
        }
        else {
          this.updateForm(tabNum);
        }
      }
    },
    showErrorDialog(message) {
      this.errorDialogTitle = 'Something went wrong';
      this.errorDialogContent = message;
      this.errorDialog = true;
    },
    pqFormDataRequest() {
      return getPQformDetails({
        pq_id: this.form.data.id,
        webuser_id: this.loggedInUser.user_id,
      })
    },
    getDataRequest() {
      const requests = [
        getIdentificationTypes(),
        getQualificationTypes(),
        getCountries(),
      ];
      if (this.form.data.id) {
        requests.push(this.pqFormDataRequest());
        requests.push(getPQRecordByPQid(this.form.data.id));
      }
      requests.push(getProcessDocument({
        process_id: 702
      }));
      return Promise.all(requests);
    },
    handleDataRequest(response) {
      window.console.log('total response: ', response);
      for (let i = 0; i < response.length; i ++) {
        const res = response[i].data.response;
        if (!res.status) {
          this.showErrorDialog(res.message);
          return;
        }
      }
      this.identificationTypes = response[0].data.response.data.map(item => {
        return {
          value: item.id,
          text: item.DisplayName,
        };
      });
      this.qualificationTypes = response[1].data.response.data.map(item => {
        return {
          value: item.id,
          text: item.DisplayName,
        };
      });
      this.countries = response[2].data.response.data.map(item => {
        return {
          value: item.id,
          text: item.Name,
        };
      });
      this.form.data = response[3].data.response.data[0];
      window.console.log('form.data', this.form.data);
      this.form.data.Nationality = parseInt(this.form.data.Nationality) || 0;
      if (response[4].data.response.data) {
        this.form.records = response[4].data.response.data;
        if (this.form.records.KPer) {
          for (let i = 0; i < this.form.records.KPer.length; i ++) {
            if (!this.form.records.KPer[i].J_Position) {
              this.form.records.KPer[i].J_Position = this.form.records.KPer[i].J_position;
            }
          }
        }
      }
      this.form.documents = response[5].data.response.data;
      this.isLoading = false;
    },
    updateForm(stepNum, isSubmit = false) {
      this.isLoading = true;
      window.console.log('submit data', this.form);
      this.form.data.license = this.form.data.License;
      this.form.data.Salutation = this.form.data.Salutaion;
      Promise.all([
        addUpdatePQForm(this.form.data),
        addUpdatePQRecord({
          pq_id: this.form.data.id,
          recordJson: this.form.records
        }),
      ]).then(response => {
        this.isLoading = false;
        for (let i = 0; i < response.length; i ++) {
          const res = response[i].data.response;
          if (!res.status) {
            this.showErrorDialog(res.message);
            return;
          }
        }
        this.form.data.id = response[0].data.response.data[0].PQForm_id;
        this.form.records = response[1].data.response.data;
        if (this.form.records.KPer) {
          for (let i = 0; i < this.form.records.KPer.length; i ++) {
            if (!this.form.records.KPer[i].J_Position) {
              this.form.records.KPer[i].J_Position = this.form.records.KPer[i].J_position;
            }
          }
        }
        // this.form = {...this.form};
        if (stepNum == this.step && isSubmit) {
          this.$router.push('/pq-forms');
        }
        else {
          this.step = stepNum;
        }
      }).catch(err => {
        this.isLoading = false;
        this.showErrorDialog(`Please refresh the page. ${err}`);
      })
    },
    onFormButtonClick(stepNum, isSubmit = false) {
      if (this.isViewMode) {
        this.step = stepNum;
      }
      else {
        this.updateForm(stepNum, isSubmit);
      }
    }
  }
}
</script>

<style lang="scss">
.pq {
  width: 100%;
  .main-content {
    min-height: 250px;
    padding: 15px;
    padding-top: 0;

    .card-body {
      padding: 40px 15px 10px;
      overflow: auto;
      min-height: 460px;

      p {
        font-size: 13px;
      }
    }
  }
}

.v-dialog .dialog-card .card-body {
  .v-form {
    .prepend-text {
      width: 125px;
      color: #333;

      &.upload {
        font-size: 13px;
      }
    }

    .v-input {
      padding-top: 0;
      margin-top: 0;

      .v-input__slot:before {
        border-color: #e0e0e0;
      }
    }
  }
}
</style>