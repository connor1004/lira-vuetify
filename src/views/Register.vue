<template>
  <div class="register-page">
    <header>
      <div class="register-header">
        <img :src="liraLogo" alt="Lira"/>
      </div>
    </header>
    <div class="main">
      <div v-if="!EmailSent" class="card">
        <h4 class="card-header">
          New User Registration
        </h4>
        <v-form
          class="registration-form"
          ref="form"
          lazy-validation
          v-model="valid"
        >
          <h4>Please fill the following fields to create an account with FSA</h4>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  class="required"
                  v-model="user.Fname"
                  label="First Name"
                  required
                  :rules="[v => !!v || 'First Name is required.']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  class="required"
                  v-model="user.Lname"
                  label="Last Name"
                  required
                  :rules="[v => !!v || 'Last Name is required.']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field
                  :class="user.NA ? '' : 'required'"
                  v-model="user.company"
                  label="Company Name"
                  ref="company"
                  :rules="companyRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-checkbox
                  v-model="user.NA"
                  label="Not Applicable"
                  @change="onNAChange"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.Mobile"
                  label="Mobile Number"
                  required
                  :rules="[v => !!v || 'Mobile Number is required.']"
                  @input="onMobileChange"
                  class="required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.MobileValidated"
                  label="Confirm Your Mobile Number"
                  required
                  :rules="MobileValidatedRules"
                  ref="MobileValidated"
                  class="required"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.email"
                  label="Email ID"
                  required
                  :rules="[v => !!v || 'Email ID is required.']"
                  @input="onemailChange"
                  class="required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.emailValidated"
                  label="Confirm Your Email ID"
                  required
                  ref="emailValidated"
                  :rules="emailValidatedRules"
                  class="required"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.Address1"
                  label="Address Line 1"
                  required
                  :rules="[v => !!v || 'Address Line 1 is required.']"
                  class="required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.Address2"
                  label="Address Line 2"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="user.City"
                  label="City"
                  required
                  :rules="[v => !!v || 'City is required.']"
                  class="required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="user.State"
                  label="State"
                  required
                  :rules="[v => !!v || 'State is required.']"
                  class="required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="user.Zip"
                  label="Zip"
                  required
                  :rules="[v => !!v || 'Zip is required.']"
                  class="required"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="countries"
                  v-model="user.Country_id"
                  label="Country"
                  required
                  :rules="[v => !!v || 'Country is required.']"
                  class="required"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="purposes"
                  v-model="user.RegistrationPurposes"
                  label="Purpose For Account"
                  required
                  :rules="[v => !!v || 'Select your Purpose of creating FSA Account.']"
                  class="required"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="user.BriefProfile"
                  label="Brief about yourself"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="IsTermAccepted"
                  label="I agree to the Terms and Conditions"
                  :rules="[v => !!v || 'Please accept the Terms of use & privacy policy.']"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-btn
              color="secondary"
              @click="submit"
              :loading="loading"
            >
              Sign Up
            </v-btn>
            <div class="form-link">
              Already have an Account?
              &nbsp;<router-link to="/login" class="forget">Click here to Login</router-link>
            </div>
          </v-container>
        </v-form>
      </div>

      <div v-else class="success-message">
        <div class="success-img">
            <img :src="successfulPNG" alt="Successfull" />
        </div>
        <h1>Mobile Verified Successfully!</h1>
        <h4>An email has been sent to your registered email address. Please click on the verification link included in the email to activate your account.</h4>
        <p><b>Note:</b> In case you haven't recieved the mail, request you to check the spam folder.</p>
      </div>

      <v-dialog v-model="userCreated" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Sign Up Successful!</span>
          </v-card-title>
          <v-card-text>
            <p>
              One Time Password has been sent to your number,
              &nbsp;please enter the same here to login. Valid for 10 minutes.
            </p>
            <v-form class="otp-form" ref="otpForm" v-model="otpFormValid" lazy-validation>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <span class="resent-message" v-if="resentOTP && !invalidOTP">
                      An OTP has been resent to your mobile number.
                    </span>
                    <v-text-field
                      v-model="MobileOTP"
                      label="Enter OTP here."
                      required
                      :rules="MobileOTPRules"
                    ></v-text-field>
                    <v-btn
                      color="secondary"
                      @click="verifyOTP"
                      :loading="loading"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
                <p>Didn't receive the OTP?  <v-btn :loading="loading" class="resend-btn" text color="secondary" @click="resendOTP">Resend OTP</v-btn></p>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
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
    <app-footer />
  </div>
</template>

<script>
import axios from '../axios';
import AppFooter from '../components/Footer'

import liraLogo from '../assets/images/lera-logo-web.png'
import successfulPNG from '../assets/images/successfull.png';

export default {
  components: {
    AppFooter,
  },
  data() {
    return {
      liraLogo,
      successfulPNG,
      valid: true,
      countries: [],
      purposes: [],
      user: {
        id: '',
        Fname: '',
        Lname: '',
        company: '',
        Mobile: '',
        MobileValidated: '',
        email: '',
        emailValidated: '',
        BriefProfile: '',
        RegistrationPurpose_id: '',
        NA:false,
        
        Address1:'',
        Address2: '',
        City: '',
        State: '',
        Zip: '',
        Country_id: '',
        RegistrationPurposes: '',
      },
      MobileOTP: '',
      Address_id: '',
      IsTermAccepted: '',
      userCreated: false,

      EmailSent: false,
      resentOTP: false,
      invalidOTP: false,
      OTPvalidation: false,
      loading: false,
      errorDialog: false,
      errorDialogContent: '',
      errorDialogTitle: '',
      otpFormValid: true,
      refreshed: false,
    }
  },
  computed: {
    emailValidatedRules() {
      return [
        v => !!v || 'Email ID is required.',
        v => !v || v == this.user.email || 'The Email and Confirm Email do not match.'
      ];
    },
    companyRules() {
      return [v => !!v || this.user.NA || 'Company is Required'];
    },
    MobileValidatedRules() {
      return [
        v => !!v || 'Mobile Number is required.',
        v => !v || v == this.user.Mobile || 'The Mobile No. and Confirm Mobile No. do not match'
      ];
    },
    MobileOTPRules() {
      return [
        v => !!v || 'Please enter the code.',
        v => !v || !this.invalidOTP || 'Invalid code entered.'
      ];
    }
  },
  mounted() {
    axios.get('/public/fetchAllCountriesforSignup')
      .then((res) => {
        const data = res.data.response.data;
        this.countries = data.map(item => {
          return {
            text: item.Name,
            value: item.id,
          };
        });
      })
      .catch(response => {
          window.console.log(response);
      });
    axios.get('/list/fetchSignUpPurposes')
      .then((res) => {
        const data = res.data.response.data;
        this.purposes = data.map(item => {
          return {
            text: item.Name,
            value: item.id,
          };
        });
      })
      .catch(response => {
        window.console.log(response);
      });
  },
  methods: {
    onNAChange() {
      this.$refs.company.validate();
    },
    onemailChange() {
      this.$refs.emailValidated.validate();
    },
    onMobileChange() {
      this.$refs.MobileValidated.validate();
    },
    submit() {
      if (this.$refs.form.validate()) {
        window.console.log('before created');
        this.loading = true;

        axios.post('/webuser/createuser', this.user)
          .then(res => {
            let data = res.data.response;
            window.console.log(data);
            if(data.code == 201){
              this.user.id = data.user.id;
              this.Address_id = data.address.id;
              this.userCreated = true;
              setTimeout( () => this.refresh(), 600000 );
            } else if( data.code == 409 ){
              this.errorDialogContent = data.message;
              this.errorDialogTitle = 'Duplicate Data';
              this.errorDialog = true;
            } else if( data.code == 500 ) {
              this.errorDialogContent = data.message;
              this.errorDialogTitle = 'Invalid Data';
              this.errorDialog = true;
            }
            this.loading = false
          })
          .catch(() => {
            this.errorDialogTitle = 'Catch'
            this.errorDialogContent = 'Something went wrong.';
            this.errorDialog = true;
            this.loading = false;
          });
      }
    },
    refresh() {
      this.userCreated = false;
      
      axios.get('/webuser/deleteuserfromSignUp/'+this.user.id+'/'+this.Address_id)
        .then(res => {
          let data = res.data.response;
          if (data.status == true) {
            this.errorDialogTitle = "OTP timeout";
            this.errorDialogContent = 'The OTP has expired. Register again';
            this.errorDialog = true;
            this.refreshed = true;
          }
        })
        .catch(() => {
          this.errorDialogContent = 'Something went wrong.';
          this.errorDialogTitle = 'Catch';
          this.errorDialog = true;
          this.loading = false;
        });
    },
    verifyOTP() {
      if (this.$refs.otpForm.validate()) {
        this.loading = true;
        var otpdetails = { id: this.user.id, otp: this.MobileOTP };
        axios.post('/webuser/verifySignUpOTP', otpdetails)
          .then(res => {
            let data = res.data.response;
            if(data.code == 201){
              this.userCreated = false;
              this.EmailSent = true;
            }else if( data.code == 409 ){
              this.OTPvalidation = true;
              this.invalidOTP = true;
            }
            else if( data.code == 400 ){
              this.userCreated = false;
              this.errorDialogContent = data.message;
              this.errorDialogTitle = "Limit Exceeded";
              this.errorDialog = true;
              this.refreshed = true;
            }
            else if ( data.code == 401 ) {
              this.userCreated = false;
              this.errorDialogContent = data.message;
              this.errorDialogTitle = "Session expired";
              this.errorDialog = true;
              this.refreshed = true;
            }else if( data.code == 500 ) {
              this.userCreated = false;
              this.errorDialogContent = data.message;
              this.errorDialogTitle = "Invalid Data";
              this.errorDialog = true;
              this.refreshed = true;
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.errorDialogContent = 'Something went wrong.';
            this.errorDialogTitle = 'Catch';
            this.errorDialog = true;
          });
      }
    },
    resendOTP() {
      this.loading = true;
      var otpdetails = { id: this.user.id };
      axios.post('/webuser/resendOTP', otpdetails)
        .then(res => {
          let data = res.data.response;

          if(data.code == 201){
            this.resentOTP = true;
            setTimeout( () => this.refresh(), 60000);
          } else if ( data.code == 400 ){
            this.userCreated = false;
            this.errorDialogContent = data.message;
            this.errorDialogTitle = 'Limit Exceeded';
            this.errorDialog = true;
            this.refreshed = true;
          } else if( data.code == 401 ) {
            this.userCreated = false;
            this.errorDialogContent = data.message;
            this.errorDialogTitle = 'Session expired';
            this.errorDialog = true;
            this.refreshed = true;
          } else if ( data.code == 500 ) {
            this.userCreated = false;
            this.errorDialogContent = data.message;
            this.errorDialogTitle = 'Invalid Data';
            this.errorDialog = true;
            this.refreshed = true;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.errorDialogContent = 'Something went wrong.';
          this.errorDialogTitle = 'Catch';
          this.errorDialog = true;
        });
    }
  },
  watch: {
    errorDialog() {
      if (!this.errorDialog && this.refreshed) {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style lang="scss">
.register-page {
  header {
    position: relative;
    z-index: 1;
    .register-header {
      box-shadow: 0 12px 16px #bbbabd87;
      padding: 15px 15px 0px 15px;

      img {
        max-width: 110px;
      }
    }
  }

  .main {
    padding-bottom: 0;
    background: #fff;
    height: calc(100vh - 55px);
    overflow: hidden;
    overflow-y: auto;
    padding: 20px 45px 30px;

    .card {
      margin-bottom: 0;
      box-shadow: 0 0 2px 0 rgba(0,0,0,.16),
                  0 0 0 0 rgba(0,0,0,.12);
      padding-bottom: 50px;
      font-weight: 400;

      .card-header {
        margin-bottom: 7px;
        box-shadow: 0 4px 5px #00000073;
        position: relative;
        font-size: 14px;
        background: #6da2f9;
        padding: 0 10px;
        line-height: 35px;
        font-weight: 400;
        text-align: center;
      }

      .v-form.registration-form {
        width: 650px;
        max-width: 100%;
        padding: 10px 25px 40px 25px;
        margin: auto;

        h4 {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .row > div {
          padding-top: 0;
          padding-bottom: 0;
        }

        .v-text-field .v-label {
          font-size: 13px;
          margin-top: -1px;
        }

        .v-text-field .v-label--active {
          transform: translateY(-18px) scale(0.8);
        }

        .v-text-field {
          input, textarea {
            font-size: 13px;
          }
        }

        .v-input .v-label {
          font-size: 13px;
        }

        .v-select .v-select__selection {
          font-size: 13px;
          font-weight: 400;
          color: #555;
        }

        .v-btn {
          width: 100px;
          font-size: 12px;
          margin-top: 5px;
        }

        .form-link {
          margin-top: 10px;
          font-size: 13px;
          font-weight: 400;
          color: #3a3838;

          a {
            text-decoration: none;
            color: #3c8dbc;
          }
        }
      }
    }

    .success-message {
      width: 650px;
      max-width: 100%;
      padding: 40px 25px 40px 25px;
      margin: auto;
      text-align: center;

      h1 {
        margin: 20px auto;
      }

      h4 {
        font-weight: 500;
      }

      p {
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
}

.otp-form {
  .resent-message {
    color: #ff3547;
  }
  p .v-btn.resend-btn {
    box-shadow: none;
    padding: 0 5px;
  }
}
</style>