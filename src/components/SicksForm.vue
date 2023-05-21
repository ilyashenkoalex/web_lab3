<template lang="">
  <div class="p-10 w-[500px] space-y-10 m-auto">
    <div v-if="form.id" class="">
      <div class="">
        <label for="id" class="label">ID</label>
      </div>
      <input class="input" v-model="form.id" disabled id="id" placeholder="id" type="text" required/>
    </div>
    <div class="">
      <div>
        <label class="label" for="name">Название</label>
      </div>
      <input class="input" v-model="form.name" id="name" placeholder="Имя" type="text" required/>
    </div>
    <div>
      <div>
        <label class="label" for="description">Описание</label>
      </div>
      <input
        class="input"
        v-model="form.description"
        id="description"
        placeholder="description"
        type="text"
        required
      />
    </div>
    <div>
      <div>
        <label class="label" for="cost">Цена</label>
      </div>
      <input class="input" v-model="form.cost" id="cost" placeholder="Цена" type="number" required/>
    </div>
    <div>
      <div>
        <label class="label" for="doctorname">Доктор</label>
      </div>
      <select class="select" v-model="form.id_doctor" name="id_doctor" id="id_doctor">
        <option v-for="{ name, id } in doctorList" :key="id" :value="id">
          {{ name }}
        </option>
      </select>
    </div>
    <div>
      <Btn @click="onClick" :disabled="!isValidForm" :isInfo="true">Сохранить</Btn>
    </div>
  </div>
</template>
<script>
import { fetchItems, selectItemById } from '@/store/sicks/service';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, reactive, onBeforeMount, watchEffect } from 'vue';
import { selectItems as selectDoctors, fetchItems as fetchDoctors } from '@/store/doctors/service';
import Btn from './Btn.vue';
export default {
  name: 'SicksForm',
  props: {
    id: { type: String, default: '' },
  },
  components: {
    Btn,
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const doctorList = computed(() => selectDoctors(store));
    const form = reactive({
      id: '',
      name: '',
      id_doctor: '',
      description: '',
      cost: '',
    });
    onBeforeMount(() => {
      fetchItems(store);
      fetchDoctors(store);
    });
    watchEffect(() => {
      const sick = selectItemById(store, props.id);
      Object.keys(sick).forEach((key) => {
        form[key] = sick[key];
      });
    });
    return {
      doctorList,
      form,
      isValidForm: computed(() => !!(form.name && form.description && form.cost && form.id_doctor)),
      onClick: () => {
        const selectedDoctor = doctorList.value.find((b) => b.id === form.id_doctor);
        if (selectedDoctor) {
          form.id_doctor = selectedDoctor.id;
          context.emit('submit', form);
          console.log(form)
          setTimeout(() => {
            router.push({ name: 'home' });
          }, 2000);
        }
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
