<template lang="">
  <div class="space-y-10">
    <router-link :to="{ name: 'DoctorsEdit' }">
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
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import { fetchItems, removeItem, selectItems } from '@/store/doctors/service';
import { mapActions } from 'vuex';
import { on } from 'events';

export default {
  name: 'DoctorsList',
  components: {
    Table,
    Btn,
  },
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
        { value: 'name', text: 'Доктора' },
      ],
      onClickRemove: (id) => {
        const isConfirmRemove = confirm('Вы действительно хотите удалить запись?');
        if (isConfirmRemove) {
          removeItem(store, id);
        }
      },
      onClickEdit: (id) => {
        router.push({ name: 'DoctorsEdit', params: { id } });
      },
    };
  },
};
</script>
<style lang=""></style>
