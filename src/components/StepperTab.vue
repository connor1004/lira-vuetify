<template>
  <div class="stepper-tab">
    <div class="stepper-tab-header">
      <div
        class="stepper-tab-step"
        v-for="(item, index) in steps"
        v-bind:key="index"
        :class="activeStep == (index + 1) ? 'active' : ''"
      >
        <v-btn fab @click="() => onTabbuttonClick(index + 1)">{{index + 1}}</v-btn>
        <div class="step-title">{{item}}</div>
      </div>
    </div>

    <div class="stepper-tab-items">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepperTab',
  props: {
    steps: { type: Array, default: () => [] },
    activeStep: { type: Number, default: 1 },
  },
  methods: {
    onTabbuttonClick(tabNum) {
      this.$emit('tabClick', tabNum);
    }
  }
}
</script>

<style lang="scss">
  .stepper-tab {
    width: 100%;
    .stepper-tab-header {
      min-width: 100%;
      width: fit-content;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;

      &::before {
        content: ' ';
        display: block;
        position: absolute;
        height: 1px;
        background-color: #ccc;
        left: 0;
        right: 0;
        top: 15px;
      }

      .stepper-tab-step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        &::before {
          content: ' ';
          display: block;
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: #ccc;
          left: 0;
          top: 15px;
        }

        &:first-child::before {
          width: 50%;
          background-color: #fff;
        }

        &:last-child::before {
          content: ' ';
          display: block;
          position: absolute;
          width: 50%;
          height: 1px;
          background-color: #fff;
          left: 50%;
          right: 0;
          top: 15px;
        }

        .v-btn {
          background-color: #fff;
          color: #000;
          font-size: 12px;
          box-shadow: none;
          width: 30px;
          height: 30px;
          border: 1px solid #ddd;

          &:hover {
            background-color: #fff;
            box-shadow: 0 5px 11px 0 rgba(0,0,0,.18),
                        0 4px 15px 0 rgba(0,0,0,.15);
            &::before {
              opacity: 0;
            }
          }
        }

        &.active {
          .v-btn {
            background-color: #4285f4;
            color: #fff;
            border-color: #367fa9;
          }
        }

        .step-title {
          margin-top: 5px;
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: 400;
          color: #333;
        }
      }
    }
  }
</style>