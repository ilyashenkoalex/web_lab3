<template lang="">
  <Layout v-bind:title="'Доктора'">
    <DoctorsList />
  </Layout>
</template>
<script>
import Layout from '../components/Layout.vue';
import DoctorsList from '@/components/DoctorsList.vue';
export default {
  name: 'DoctorsView',
  components: {
    Layout,
    DoctorsList,
  },
};
</script>
<style lang=""></style>
