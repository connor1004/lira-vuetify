<template>
  <div class="pq-general-info">
    <v-text-field
      v-model="value.data.FullName"
      label="Name of the Licence Holder / License Applicant"
      :readonly="isViewMode"
    />
    <v-text-field
      v-model="value.data.License"
      label="Licence(s) under which the application is being lodged"
      :readonly="isViewMode"
    />
    <v-text-field
      v-model="value.data.Position"
      label="Proposed Position within the Licence Holder / Licence Applicant"
      :readonly="isViewMode"
    />
    <v-btn color="success ml-1 mt-2 mr-3" v-if="!isViewMode" @click="onSaveClick" :loading="isLoading">
      Save
    </v-btn>
    <v-btn color="info mt-2" @click="onNextClick" :loading="isLoading">
      Next
      <v-icon right>keyboard_arrow_right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'GeneralInfo',
  props: ['value', 'isLoading', 'isViewMode'],
  methods: {
    onNextClick() {
      this.$emit('formButtonClick', 2);
    },
    onSaveClick() {
      this.$emit('formButtonClick', 1);
    }
  }
}
</script>

<style lang="scss">
  .pq-general-info {
    width: 600px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
  }
</style>