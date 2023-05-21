<template lang="">
  <div>
    <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
      <SicksForm @submit="onSubmit" :id="id" />
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue';
import SicksForm from '@/components/SicksForm.vue';
import { useStore } from 'vuex';
import { addItem, updateItem } from '@/store/sicks/service';
export default {
  name: 'SicksEdit',
  props: {
    id: String,
  },
  components: {
    Layout,
    SicksForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: ({ id, name, id_doctor, cost, description }) => {
        const sick = {
          id: id,
          name: name,
          id_doctor: id_doctor,
          cost: cost,
          description: description
        };

        return id ? updateItem(store, sick) : addItem(store, sick);
      },
    };
  },
};
</script>
<style></style>
