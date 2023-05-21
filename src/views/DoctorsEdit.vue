<template lang="">
  <div>
    <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
      <DoctorsForm @save="onSubmit" :id="id" />
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue';
import DoctorsForm from '@/components/DoctorsForm.vue';
import { useStore } from 'vuex';
import { addItem, updateItem } from '@/store/doctors/service';
export default {
  name: 'DoctorsEdit',
  props: {
    id: String,
  },
  components: {
    Layout,
    DoctorsForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: ({ id, name }) => {
        
        if (!name) {
          alert('Поле "Имя" не может быть пустым!');
          return;
        }
        const doctor = {
          id: id,
          name: name,
        };
        return id ? updateItem(store, doctor) : addItem(store, doctor);
      },
    };
  },
};
</script>
<style lang=""></style>
