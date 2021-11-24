<template>
  <div id="app">
    <hello-world v-slot="{ user,favorites }">
      <p>{{ user.name }} likes {{ favorites[0] }}</p>
    </hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
