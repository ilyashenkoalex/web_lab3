<template lang="">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th
          class="px-6 py-3"
          v-for="{ value, text } of tableHeaders"
          :key="value"
        >
          {{ text }}
        </th>
        <th v-if="items.length > 0" class="px-6 py-3">
          Edit
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class ="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="(item, i) of items" :key="i">
        <td
          v-for="(key, i) of colKeys"
          :key="i"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ item[key['value']] }}
        </td>
        <td class="px-6 py-4">
          <Btn v-bind:isInfo="true" @click="onClickEdit(item.id)">Edit </Btn>
          <Btn v-bind:isDanger="true" @click="onClickRemove(item.id)">Delete</Btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import Btn from './Btn.vue';
export default {
  name: 'Table',
  props: {
  items: {
    type: Array,
    default: () => [],
  },
  tableHeaders: Array,
  onClickEdit: Function,
  onClickRemove: Function,
},

  computed: {
    colKeys() {
      return this.tableHeaders.map((key) => key);
    },
  },
  components: {
    Btn,
  },
};
</script>
<style lang=""></style>
