<template>
  <div class="space-y-10">
    <router-link :to="{ name: 'SicksEdit' }">
      <Btn :isInfo="true" class="w-[200px]">Добавить</Btn>
    </router-link>
    <div class="flex items-center">
      <Input v-model="filterName" placeholder="Название" />
      <Input v-model="filterDoctor" placeholder="Имя доктора" />
      <Input v-model="filterDescription" placeholder="Описание" />
      <Input v-model="filterMinPrice" placeholder="Минимальная цена" />
      <Input v-model="filterCost" placeholder="Максимальная цена" />

    </div>
    <!-- <Btn :isInfo="true" class="w-[200px]" @click="filterItems">Отфильтровать</Btn> -->

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
    const filterMinPrice = ref('');
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

    watch([items, filterName, filterDoctor, filterDescription, filterCost, filterMinPrice], ([itemsValue, filterNameValue, filterDoctorValue, filterDescriptionValue, filterCostValue, filterMinPriceValue]) => {
      filteredItems.value = itemsValue.filter((item) => {
        const nameMatch = !filterNameValue || item.name.includes(filterNameValue);
        const doctorMatch = !filterDoctorValue || item.doctorname.includes(filterDoctorValue);
        const descriptionMatch = !filterDescriptionValue || item.description.includes(filterDescriptionValue);
        const costMatch = !filterCost.value || item.cost <= parseInt(filterCost.value);
        const minPriceMatch = !filterMinPriceValue || item.cost >= parseInt(filterMinPriceValue);
        return nameMatch && doctorMatch && descriptionMatch && costMatch && minPriceMatch;
      });
    }, { deep: true });

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
      
    };

    return {
      items,
      filteredItems,
      filterName,
      filterDoctor,
      filterDescription,
      filterCost,
      filterMinPrice,
      tableHeaders,
      onClickRemove,
      onClickEdit,
      filterItems,
    };
  },
};
</script>
