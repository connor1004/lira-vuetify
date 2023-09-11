<template>
  <div class="login-page">
    <div class="login-frm">
      <div>
        <div class="top-logo">
          <img :src="clientLogo" alt="Client Logo" />
        </div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          autocomplete="off"
        >
          <div class="unauthorized-error" v-if="errorMessage != ''">
            {{ errorMessage }}
          </div>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="User ID"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            autocomplete="new-password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn
            color="secondary"
            @click="submit"
            :loading="loading"
          >
            Sign in
          </v-btn>
        </v-form>
        <div class="form-link">
          <router-link to="/register" class="sign-up">New to FSA</router-link>
          <router-link to="/forgotPassword" class="forget">Forgot Password?</router-link>
        </div>
      </div>
      <div class="bottom-logo">
        <img :src="liraLogo" alt="Lira Logo" />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AppFooter from '../components/Footer'
import clientLogo from '../assets/images/fsa-logo.png'
import liraLogo from '../assets/images/lera-logo-web.png'

export default {
  components: {
    AppFooter,
  },
  data() {
    return {
      clientLogo,
      liraLogo,
      username: '',
      usernameRules: [v => !!v || 'User ID is required'],
      password: '',
      passwordRules: [v => !!v || 'Password is required'],
      valid: true,
      loading: false,
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions(['login']),
    submit() {
      if (this.$refs.form.validate()) {
        const that = this;
        this.loading = true;
        this.login({
          email: this.username,
          password: this.password
        }).then(response => {
          switch (response.code) {
            case '201':
              that.$router.push('/');
              break;
            case '403':
              that.errorMessage = response.message;
              break;
          }
          that.loading = false;
        }).catch((error) => {
          window.console.log(error);
          that.loading = false;
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-page {
    width: 100vw;
    flex: 1;
    background: #9ac2d2;
    background-size: cover;
    background-position: 0 14%;
    background-repeat: no-repeat;
    background-image: url('~@/assets/images/login-bg-v1.jpg');
    padding: 0 30px;
    
    @media screen and (max-width: 1040px) {
      background-image: url('~@/assets/images/login-bg-mob.jpg');
      background-position: 32% 12%;
    }
    @media screen and (max-width: 350px) {
      padding: 0 10px;
    }

    .login-frm {
      width: 330px;
      max-width: 100%;
      background: #f5f6f9de;
      padding: 20px;
      padding-bottom: 62px;
      min-height: 100vh;
      box-shadow: 0px 5px 4px #0000003d;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .top-logo {
        margin-top: 56px;
        margin-bottom: 60px;
        text-align: center;

        img {
          max-width: 140px;
        }
      }

      .v-form {
        .unauthorized-error {
          color: #ff3547;
          font-weight: 500;
          text-align: center;
        }

        button {
          width: 100%;
          margin-top: 20px;
          margin-bottom: 7px;
        }
      }

      .form-link {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        a {
          font-size: 14px;
          text-decoration: none;

          &:first-child {
            color: #37a0cf;
          }

          &:last-child {
            color: #919496;
            font-size: 13px;
          }
        }
      }

      .bottom-logo {
        text-align: center;
        img {
          max-width: 90px;
        }
      }
    }
  }
</style>