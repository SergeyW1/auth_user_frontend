<script setup lang="ts">
import {useUserStore} from "../stores/userStore.ts";
import {Form, Field} from 'vee-validate';
import * as yup from 'yup'

const userStore = useUserStore()

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
});

function onSubmit(values, {setErrors}) {

  return userStore.login(values)
      .catch(error => setErrors({apiError: error}));
}
</script>

<template>
  <section class="p-6 dark:text-gray-100 flex items-center h-screen">
    <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
        class="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow dark:bg-gray-900">
      <h2 class="w-full text-3xl font-bold lead">User authorization</h2>
      <div>
        <label>Email</label>
        <Field
            name="email"
            type="email"
            placeholder="Your email"
            :class="{'is-invalid': errors.email}"
            class="block w-full p-2 rounded focus:outline-none
                       focus:ring focus:ri focus:ri dark:bg-gray-800"
        />
        <div class="text-red-500 text-xs mt-2">{{ errors.email }}</div>
      </div>
      <div>
        <label>Password</label>
        <Field
            name="password"
            type="password"
            placeholder="Your password"
            class="block w-full p-2 rounded focus:outline-none
                       focus:ring focus:ri focus:ri dark:bg-gray-800"
            :class="{'is-invalid': errors.password}"
        />
        <div class="text-red-500 text-xs mt-2">{{ errors.password }}</div>
      </div>
      <div>
        <button :disabled="isSubmitting"
                class="w-full px-4 py-2 font-bold rounded shadow
                    focus:outline-none focus:ring hover:ring focus:ri
                    dark:bg-violet-400 focus:ri hover:ri dark:text-gray-900"
        >
          Sign in
        </button>
        <p class="mt-6 flex justify-end">No account?
          <router-link :to="{name: 'Registration'}" class="ml-2 text-blue-500 hover:text-blue-700 font-semibold">
            Sign up
          </router-link>
        </p>
        <div class="mt-5 bg-red-500 p-4 rounded-md" v-if="userStore.errors">
          <p class="text-white">{{ userStore.errors }}</p>
        </div>
      </div>
    </Form>
  </section>
</template>
