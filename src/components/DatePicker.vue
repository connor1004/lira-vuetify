<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    nudge-left="0"
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="computedDateFormatted"
        :label="label"
        readonly
        :rules="rules"
        :required="required"
        :single-line="singleLine"
        class="datepicker-text"
      >
        <template v-slot:append>
          <img v-on="readonly ? null : on" width="24" height="22" :src="calendarIcon" alt="">
        </template>
      </v-text-field>
    </template>
    <v-date-picker v-model="dateValue" no-title @input="dateMenu = false"></v-date-picker>
  </v-menu>
</template>

<script>
import calendarIcon from '@/assets/images/calendar.png'

export default {
  name: 'DatePicker',
  props: ['value', 'rules', 'required', 'label', 'singleLine', 'readonly'],
  data() {
    return {
      dateMenu: false,
      calendarIcon,
    }
  },
  computed: {
    dateValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    computedDateFormatted () {
      return this.formatDate(this.dateValue)
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
  }
}
</script>

<style lang="scss">

</style>