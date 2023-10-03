<script setup lang="ts">
import {useUserStore} from "../stores/userStore.ts";
import {onMounted, ref} from "vue";

const userStore = useUserStore()
const userPhoto = ref(null)

onMounted(async () => {
  userPhoto.value = await userStore.userPhotoUrl(userStore.user.email)
})

</script>

<template>
  <div class="mt-24 mx-5 place-content-center">
    <div
        v-if="userStore.user"
        class="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl text-white p-8 text-center h-72 max-w-sm mx-auto">
      <h1 class="text-3xl mb-3">Привет {{ userStore.user.username }}</h1>
      <p class="text-lg">Твоя роль: {{ userStore.user.role }}</p>
    </div>
    <div
        class="bg-white py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
      <template v-if="userStore.user">
        <img class="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
             :src="userPhoto"
             :alt="userStore.user.username"

        >
      </template>
      <span class="flex items-center border rounded-full w-24 pr-2 justify-center mx-auto mt-2 mb-12"><div
          class="bg-green-400 rounded-full w-2.5 h-2.5 block mr-2"></div>Active</span>
      <button
          @click.prevent="userStore.getAllUser()"
          class="text-xs rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-white pt-3 pb-4 px-8 inline"
      >
        Получить всех пользователей
      </button>
      <div class="mt-2 bg-red-500 p-4 rounded-md" v-if="userStore.errors">
        <p class="text-white">{{ userStore.errors.message }}</p>
      </div>
    </div>
    <template v-if="userStore.users">
      <div class="text-gray-900 bg-gray-200 max-w-3xl mx-auto">
        <div class="p-4 flex">
          <h1 class="text-3xl">
            Users
          </h1>
        </div>
        <div class="px-3 py-4 flex justify-center">
          <table class="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
            <tr class="border-b">
              <th class="text-left p-3 px-5">Name</th>
              <th class="text-left p-3 px-5">Email</th>
              <th class="text-left p-3 px-5">Date of registration</th>
              <th></th>
            </tr>
            <tr class="border-b hover:bg-orange-100" v-for="user in userStore.users" :key="user.id">
              <td class="p-3 px-5">{{ user.username }}</td>
              <td class="p-3 px-5">{{ user.email }}</td>
              <td class="p-3 px-5">{{ userStore.formatDate(user['createdAt']) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
