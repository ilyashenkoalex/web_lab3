<template>
  <div class="space-y-10">
    <router-link :to="{ name: 'DoctorsEdit' }">
      <Btn :isInfo="true" class="w-[200px]">Добавить</Btn>
      <!-- <Btn :isInfo="true" class="w-[200px]" @click="filterItems">Отфильтровать</Btn> -->
    </router-link>
<div class="flex items-center">
  <Input v-model="filterName" placeholder="Имя доктора" />
</div>

<Table
  :onClickEdit="onClickEdit"
  :onClickRemove="onClickRemove"
  :tableHeaders="tableHeaders"
  :items="filteredItems"
/>
  </div>
</template>
<script>
import Table from './Table.vue';
import Btn from './Btn.vue';
import Input from './Input.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { fetchItems, removeItem, selectItems } from '@/store/doctors/service';

export default {
  name: 'DoctorsList',
  components: {
    Table,
    Btn,
    Input,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const filterName = ref('');

    onMounted(() => {
      fetchItems(store);
    });

    const items = computed(() => selectItems(store));
    const tableHeaders = [
      { value: 'id', text: 'ID' },
      { value: 'name', text: 'Доктора' },
    ];

    const filteredItems = computed(() => {
      if (filterName.value) {
        return items.value.filter(item => item.name.includes(filterName.value));
      }
      return items.value;
    });

    const onClickRemove = (id) => {
      const isConfirmRemove = confirm('Вы действительно хотите удалить запись?');
      if (isConfirmRemove) {
        removeItem(store, id);
      }
    };

    const onClickEdit = (id) => {
      router.push({ name: 'DoctorsEdit', params: { id } });
    };

    const filterItems = () => {
      
    };

    return {
      filterName,
      items,
      tableHeaders,
      filteredItems,
      onClickRemove,
      onClickEdit,
      filterItems,
    };
  },
};
</script>