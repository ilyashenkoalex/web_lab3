<template lang="">
  <div class="p-10 w-[500px] space-y-10 m-auto">
    <div v-if="form.id" class="">
      <div class="">
        <label for="id" class="label">ID</label>
      </div>
      <input class="input" v-model="form.id" disabled id="id" placeholder="id" type="text" required />
      <!-- <p v-if="errors.length">
        <b>Пожалуйста исправьте указанные ошибки:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p> -->
    </div>
    <div class="">
      <div>
        <label class="label" for="name">Доктор</label>
      </div>
      <input class="input" v-model="form.name" id="name" placeholder="Имя" type="text" required/>
    </div>
    <Btn @click="onClick" :disabled="!isValidForm" :isInfo="true">Сохранить</Btn>
  </div>
</template>
<script>
import { fetchItems, selectItemById, selectItems, addItem } from '@/store/doctors/service';
import { computed, reactive, onBeforeMount, watchEffect, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Btn from './Btn.vue';
export default {
  name: 'DoctorForm',
  components: {
    Btn,
  },
  props: {
    id: { type: String, default: '' },
  },

  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const doctorList = computed(() => selectItems(store));
    const form = reactive({
      id: '',
      name: '',
    });
    onBeforeMount(() => {
      fetchItems(store);
    });
    watchEffect(() => {
      const doctor = selectItemById(store, props.id);
      Object.keys(doctor).forEach((key) => {
        form[key] = doctor[key];
      });
    });
    return {
      doctorList,
      form,
      isValidForm: computed(() => !!form.name),
      onClick: () => {
        context.emit('save', form);
        setTimeout(() => {
          router.push({ name: 'Doctors' });
        }, 2000);

      },
    };
  },
};
</script>
<style>
.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
.label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
.select {
  @apply block w-4/5 m-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight;
}
</style>
