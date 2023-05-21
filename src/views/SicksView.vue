<template>
  <Layout v-bind:title="'Болезни'">
    <SicksList />
  </Layout>
</template>

<script>
// @ is an alias to /src
import Layout from '../components/Layout.vue';
import SicksList from '@/components/SicksList.vue';
export default {
  name: 'SicksView',
  components: {
    Layout,
    SicksList,
  },
};
</script>
