<template>
  <div class="discloser-conflict mt-4">
    <v-row>
      <v-col cols="12">
        <p>
          <b>
            Please be advised that the information provided below will not affect your application. 
            It is requested so that the  Authority can identify and manage potential conflicts of interest, 
            both in the handling of this application and in any  future dealings with your organization.
          </b>
        </p>
      </v-col>
      <v-col cols="12">
        <p class="mb-0">
          Do you have any close connection with a member or  employee  of  the  Authority 
          (for  example,  friends,  close  business  relationship  or  immediate  family 
          (which includes spouse, partner, children and their  spouses or partners, parents or siblings)
          <span class="text-danger invalid-feedback"> *</span>
        </p>
        <span class="text-danger" v-if="!value.data.Conflict && isSaved"><span class="invalid-feedback">This field is required</span></span>
      </v-col>
      <v-col cols="12" sm="8">
        <div class="form-group my-custom-scrollbar">
          <label for="exampleFormControlTextarea3" class=""></label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea3"
            v-model="value.data.Conflict"
            rows="3"
            :readonly="isViewMode"
          ></textarea>
        </div>
      </v-col>
      <v-col cols="12">
        <p class="mt-5 mb-0">
          Please disclose any other facts that you believe are material to the Authority 
          in considering your application.
        </p>
      </v-col>
      <v-col cols="12" sm="8">
        <div class="form-group my-custom-scrollbar">
          <label for="exampleFormControlTextarea3" class=""></label>
          <textarea
            class="form-control"
            rows="5"
            v-model="value.data.OtherFact"
            :readonly="isViewMode"
          ></textarea>
        </div>
      </v-col>
    </v-row>
    <v-btn color="info mr-3 ml-1 mt-8 mb-5" @click="onPrevClick" :loading="isLoading">
      <v-icon left>keyboard_arrow_left</v-icon>
      Previous
    </v-btn>
    <v-btn color="success mr-3 mt-8 mb-5" v-if="!isViewMode" @click="onSaveClick" :loading="isLoading">
      Save
    </v-btn>
    <v-btn color="info mt-8 mb-5" @click="onNextClick" :loading="isLoading">
      Next
      <v-icon right>keyboard_arrow_right</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "DiscloserConflict",
    props: ['value', 'isLoading', 'isViewMode'],
    data() {
      return {
        isSaved: false,
      }
    },
    methods: {
      onNextClick() {
        this.$emit('formButtonClick', 8);
      },
      onSaveClick() {
        this.isSaved = true;
        this.$emit('formButtonClick', 7);
      },
      onPrevClick() {
        this.$emit('formButtonClick', 6);
      }
    }
  }
</script>

<style lang="scss">
  .discloser-conflict {
    padding: 30px 20px 0px;
    textarea {
      width: 100%;
      border: 1px solid #d2d6de;
      border-radius: 0;
      padding: 6px 12px;
      font-size: 12px;
      margin-top: 20px !important;
    }

    .invalid-feedback {
      font-size: 11px;
      font-weight: 400;
      color: #ff3547;
      margin-bottom: 15px;
    }
  }
</style>