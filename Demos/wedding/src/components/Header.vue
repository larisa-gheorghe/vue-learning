<template>
    <!-- Header -->
    <header id="header" class="bg-transparent">
      <nav class="flex items-center justify-between flex-wrap p-2">
        <div class="flex items-center flex-shrink-0 text-teal-200 mr-6">
          <span class="uppercase text-xl tracking-tight">L&A</span>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0
              text-teal-200 hover:text-white mr-4">
              Wedding Day Info
            </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0
              text-teal-200 hover:text-white mr-4">
              Seating Arrangements
            </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0
              text-teal-200 hover:text-white">
              Guest List
            </a>
          </div>
          <ul>
            <li v-if="!userLoggedIn">
              <a  href="#" class="inline-block text-sm px-4 py-2 leading-none text-teal-200
                hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                @click.prevent="toggleAuthModal">
                Login
              </a>
            </li>
            <template v-else>
              <li>
                <a href="#" class="inline-block text-sm px-4 py-2 leading-none text-teal-200
                  hover:bg-white mt-4 lg:mt-0">
                  Manage
                </a>
                <a href="#" class="inline-block text-sm px-4 py-2 leading-none text-teal-200
                  hover:bg-white mt-4 lg:mt-0" @click.prevent="signout">
                  Logout
                </a>
              </li>
            </template>

          </ul>
        </div>
      </nav>
    </header>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    ...mapActions(['signout']),
  },
};
</script>
