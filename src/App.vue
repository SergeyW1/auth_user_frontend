<script setup lang="ts">
import {useUserStore} from "./stores/userStore.ts";

const userStore = useUserStore()
</script>

<template>
  <nav v-show="userStore.user" class="bg-white shadow dark:bg-gray-800">
    <div class="container flex items-center justify-end p-6 mx-auto
          text-gray-600 capitalize dark:text-gray-300">
      <router-link :to="{name: 'Login'}"
                   class="text-gray-800 dark:text-gray-200 border-blue-500 mx-1.5 sm:mx-6"
                   active-class="active-link"
                   @click.prevent="userStore.logout()"
      >
        Logout
      </router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style scoped lang="postcss">
.active-link {
  @apply border-b-2
}
</style>
