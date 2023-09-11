<template>
  <v-row class="disciplinaryItem">
    <v-col cols="12" sm="9">
      <p>
        <slot />
        <span class="text-danger">
          <span v-if="!checkedValue && saved" class="invalid-feedback">This field is required to select</span>
        </span>
      </p>
    </v-col>
    <v-col cols="12" sm="3" class="sel-ckh">
      <v-radio-group
        v-model="checkedValue"
        row
        class="checkbox-like"
        :rules="[v => !!v || 'Political Exposed Person is required to Select']"
        :readonly="readonly"
      >
        <v-radio label="Yes" value="Y" on-icon="check_box" off-icon="check_box_outline_blank" class="mr-8"></v-radio>
        <v-radio label="No" value="N" on-icon="check_box" off-icon="check_box_outline_blank"></v-radio>
      </v-radio-group>
      <div class="custom-file" v-if="checkedValue === 'Y'">
        <file-input
          label="Upload File"
          uploadType="pq-check-list"
          :value="value"
          class="mx-4"
          :disabled="readonly"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import FileInput from '@/components/FileInput'

  export default {
    name: "CivilDisciplinaryItem",
    components: {
      FileInput
    },
    props: {
      value: {
        type: Object,
      },
      saved: {
        type: Boolean,
        default: Boolean
      },
      readonly: {
        type: Boolean,
        default: Boolean
      }
    },
    computed: {
      checkedValue: {
        get() {
          return this.value.CheckedYN;
        },
        set(val) {
          this.value.CheckedYN = val;
          this.$emit('input', this.value);
        }
      }
    },
    methods: {
      // handleFileChange(files) {
      //   if (files.lenght > 0) {
      //     this.value.DocumentPath = files[0];
      //   }
      // }
    }
  }
</script>

<style>
  .disciplinaryItem {
    margin-top: 20px;
  }
  .disciplinaryItem p{
    font-size: 13px;
  }
  .disciplinaryItem p .text-danger{
    display: block;
    height: 15px;
    position: relative;
  }
  .disciplinaryItem p .invalid-feedback{
    top: 0
  }
  .sel-ckh .checkbox-like {
    display: flex;
    justify-content: space-around;
  }
</style>