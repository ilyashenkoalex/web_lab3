<template>
  <input :value="localValue" class="input" :placeholder="placeholder" @input="updateValue($event.target.value)" />
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: String,
    placeholder: String,
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    updateValue(newValue) {
      this.localValue = newValue;
      this.$emit('update:value', newValue);
    },
  },
};
</script>


