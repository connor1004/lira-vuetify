<template>
  <div class="add-remove-button" :class="isLast ? 'add' : 'remove'">
    <v-btn icon small @click="onClick">
      <v-icon>{{ isLast ? 'add_circle' : 'clear' }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AddRemoveButton',
  props: ['isLast'],
  methods: {
    onClick() {
      if (this.isLast) {
        this.$emit('add');
      }
      else {
        this.$emit('remove');
      }
    }
  }
}
</script>

<style lang="scss">
.add-remove-button {
  margin-bottom: 20px;
  margin-left: 10px;
  &.add .v-icon {
    color: #60c5bd;
  }
  &.remove .v-icon {
    color: darkred;
  }
}
</style>