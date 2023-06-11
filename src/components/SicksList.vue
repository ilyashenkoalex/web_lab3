<template>
  <div class="space-y-10">
    <router-link :to="{ name: 'SicksEdit' }">
      <Btn :isInfo="true" class="w-[200px]">Добавить</Btn>
    </router-link>
    <div class="flex items-center">
      <Input v-model="filterName" placeholder="Введите название для фильтрации" />
      <Input v-model="filterDoctor" placeholder="Введите имя доктора для фильтрации" />
      <Input v-model="filterDescription" placeholder="Введите описание для фильтрации" />
      <Input v-model="filterCost" placeholder="Введите цену для фильтрации" />
    </div>
    <Btn :isInfo="true" class="w-[200px]" @click="filterItems">Отфильтровать</Btn>

    <Table :onClickEdit="onClickEdit" :onClickRemove="onClickRemove" :tableHeaders="tableHeaders" :items="filteredItems" />
  </div>
</template>

<script>
import Table from './Table.vue';
import { watch } from 'vue';

import Btn from './Btn.vue';
import Input from './Input.vue';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchItems, selectItems, removeItem } from '@/store/sicks/service';

export default {
  name: 'SicksList',
  components: {
    Table,
    Btn,
    Input,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const filterName = ref('');
    const filterDoctor = ref('');
    const filterDescription = ref('');
    const filterCost = ref('');

    onMounted(() => {
      fetchItems(store);
    });

    const items = computed(() => selectItems(store));
    const tableHeaders = [
      { value: 'id', text: 'ID' },
      { value: 'name', text: 'Название' },
      { value: 'doctorname', text: 'Доктор' },
      { value: 'description', text: 'Описание' },
      { value: 'cost', text: 'Цена' },
    ];

    const filteredItems = ref([]);

    watch(filteredItems, (newFilteredItems) => {
      console.log('Отфильтрованные данные:', newFilteredItems);
    }, { deep: true, immediate: true });

    const onClickRemove = (id) => {
      const isConfirmRemove = confirm('Вы действительно хотите удалить запись?');
      if (isConfirmRemove) {
        removeItem(store, id);
      }
    };

    const onClickEdit = (id) => {
      router.push({ name: 'SicksEdit', params: { id } });
    };

    const filterItems = () => {
  filteredItems.value = items.value.filter((item) => {
    const nameMatch = !filterName.value || item.name.includes(filterName.value);
    const doctorMatch = !filterDoctor.value || item.doctorname.includes(filterDoctor.value);
    const descriptionMatch = !filterDescription.value || item.description.includes(filterDescription.value);
    const costMatch = !filterCost.value || item.cost < parseInt(filterCost.value);
    return nameMatch && doctorMatch && descriptionMatch && costMatch;
  });
};

    return {
      items,
      filteredItems,
      filterName,
      filterDoctor,
      filterDescription,
      filterCost,
      tableHeaders,
      onClickRemove,
      onClickEdit,
      filterItems,
    };
  },
};
</script>
