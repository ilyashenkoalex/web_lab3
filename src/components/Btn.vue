<template lang="">
  <button class="btn" v-bind:class="{ 'btn-info': isInfo, 'btn-danger': isDanger }">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'Btn',
  props: {
    isInfo: Boolean,
    isDanger: Boolean,
  },
};
</script>
<style>
.btn {
  @apply text-white  text-sm px-2 py-2 text-center mr-2 mb-2 rounded-full;
}
.btn-info {
  @apply  bg-gradient-to-br from-green-400 to-blue-600 text-white;
}
.btn-info:hover {
  @apply hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium ;
}
.btn-danger {
  @apply bg-red-500 text-white;
}
.btn-danger:hover {
  @apply bg-red-700;
}
</style>


