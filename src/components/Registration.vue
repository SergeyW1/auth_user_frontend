<script setup lang="ts">
import {Field, Form} from "vee-validate";
import * as yup from 'yup'
import {useUserStore} from "../stores/userStore.ts";


const userStore = useUserStore()

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  email: yup.string().required('Email is required'),
  role: yup.string().nullable(),
  avatar_path: yup.mixed().nullable(),
});

function onSubmit(values, {setErrors}) {

  return userStore.registration(values)
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
      <h2 class="w-full text-3xl font-bold lead">User sign up</h2>
      <div>
        <label>Username</label>
        <Field
            name="username"
            type="text"
            placeholder="Your name"
            :class="{'is-invalid': errors.username}"
            class="block w-full p-2 rounded focus:outline-none
                       focus:ring focus:ri focus:ri dark:bg-gray-800"
        />
        <div class="text-red-500 text-xs mt-2">{{ errors.username }}</div>
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
        <label>Email</label>
        <Field
            name="email"
            type="email"
            placeholder="Your email"
            class="block w-full p-2 rounded focus:outline-none
                       focus:ring focus:ri focus:ri dark:bg-gray-800"
            :class="{'is-invalid': errors.email}"
        />
        <div class="text-red-500 text-xs mt-2">{{ errors.email }}</div>
      </div>
      <div>
        <label>
          Select an role
        </label>
        <Field name="role"
               as="select"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500 m-0"
        >
          <option value="User" selected>User</option>
          <option value="Admin">Admin</option>
        </Field>
      </div>
      <div>
        <label>Photo upload</label>
        <Field
            name="avatar_path"
            type="file"
            placeholder="Your password"
            class="block w-full p-2 rounded focus:outline-none
                             focus:ring focus:ri focus:ri dark:bg-gray-800"
            :class="{'is-invalid': errors.avatar_path}"
        />
        <div class="text-red-500 text-xs mt-2">{{ errors.avatar_path }}</div>
      </div>
      <div>
        <button :disabled="isSubmitting"
                class="w-full px-4 py-2 font-bold rounded shadow
                    focus:outline-none focus:ring hover:ring focus:ri
                    dark:bg-violet-400 focus:ri hover:ri dark:text-gray-900"
        >
          Sign up
        </button>
        <p class="mt-6 flex justify-end">Do you already have an account?
          <router-link :to="{name: 'Login'}" class="ml-2 text-blue-500 hover:text-blue-700 font-semibold">
            Sign in
          </router-link>
        </p>
        <div class="mt-5 bg-red-500 p-4 rounded-md" v-if="userStore.errors">
          <p class="text-white">{{ userStore.errors }}</p>
        </div>
      </div>
    </Form>
  </section>
</template>
