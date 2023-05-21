<template lang="">
  <div class="space-y-10">
    <router-link :to="{ name: 'SicksEdit' }">
      <Btn :isInfo="true" class="w-[200px]">Добавить</Btn>
    </router-link>

    <Table
      :onClickEdit="onClickEdit"
      :onClickRemove="onClickRemove"
      :tableHeaders="tableHeaders"
      :items="items"
    />
  </div>
</template>
<script>
import Table from './Table.vue';
import Btn from './Btn.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchItems, selectItems, removeItem } from '@/store/sicks/service';
export default {
  name: 'SicksList',
  components: {
    Table,
    Btn,
  },
  methods: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      fetchItems(store);
    });
    return {
      items: computed(() => selectItems(store)),
      tableHeaders: [
        { value: 'id', text: 'ID' },
        { value: 'name', text: 'Название' },
        { value: 'doctorname', text: 'Доктор' },
        { value: 'description', text: 'Описание' },
        { value: 'cost', text: 'Цена' },
      ],
      onClickRemove: (id) => {
        const isConfirmRemove = confirm('Вы действительно хотите удалить запись?');
        if (isConfirmRemove) {
          removeItem(store, id);
        }
      },
      onClickEdit: (id) => {
        router.push({ name: 'SicksEdit', params: { id } });
      },
    };
  },
};
</script>
<style lang=""></style>
