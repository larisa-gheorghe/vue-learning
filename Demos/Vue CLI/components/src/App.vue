<template>
<h3>Hey!</h3>

<greeting :age="age"></greeting>
<user :age="age" @age-change="updateAge" :ageChangeFn="updateAgeCB"></user> 
</template>

<script>
import Greeting from './components/Greeting.vue';
import User from './components/User.vue';

export default {
  name: "App",
  components: {
    Greeting,
    User,
  },
  data() {
    return {
      age: 20
    }
  },
  methods: {
    updateAge(num) {
      let newAge = this.age + num
      if (newAge < 130) {
        this.age = newAge
      } else {
        this.age = 129
      }
      console.log(newAge)
    },
    updateAgeCB(num) {
      this.age += num
    },
  }
};
</script>