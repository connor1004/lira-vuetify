import AddRemoveButton from '@/components/AddRemoveButton'

const recordMixin = {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  components: {
    AddRemoveButton
  },
  methods: {
    isLast(i) {
      return i === this.value.length - 1;
    },
    deleteRow(i) {
      this.value.splice(i, 1)
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val.length === 0) {
          this.pushEmptyValue();
        }
      }
    }
  }
};

export default recordMixin;