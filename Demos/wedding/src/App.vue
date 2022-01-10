<template>
  <div>
    <app-header />
    <h1 id="names" class="text-center text-9xl m-8">Larisa & Alexandru</h1>
    <h2 class="text-center text-7xl m-8">02.06.2022</h2>
    <h2 class="text-center text-7xl m-8"><i class="far fa-heart"></i></h2>
    <button></button>
  </div>

  <auth-modal />

</template>

<script>
import AppHeader from './components/Header.vue';
import AuthModal from './components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
