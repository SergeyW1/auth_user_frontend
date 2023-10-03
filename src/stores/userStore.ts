import {defineStore} from "pinia";
import axios from "axios";
import jwtDecode from "jwt-decode";
import router from "../router";
import {useCookies} from "vue3-cookies";
import {UserAuthInterface} from "../interfaces/user-auth.interface.ts";
import {MyErrorInterface} from "../interfaces/my-error.interface.ts";
import {UsersResponseInterface} from "../interfaces/users-response.interface.ts";
import {UserRegistrationInterface} from "../interfaces/user-registration.interface.ts";


const {cookies} = useCookies()
export const useUserStore = defineStore('userStore', {
  state: () => ({
    apiUrl: `${import.meta.env.VITE_APP_URL}`,
    user: cookies.isKey('tokenUser') ? jwtDecode(cookies.get('tokenUser')) : null,
    users: null,
    errors: null,
    avatarPath: null
  }),
  actions: {
    async login(user: UserAuthInterface): Promise<string | MyErrorInterface> {
      try {
        const response = await axios.post(`${this.apiUrl}/v2/auth/login`, user)
        cookies.set('tokenUser', response.data.token)
        this.user = jwtDecode(cookies.get('tokenUser'))
        this.avatarPath = this.user.avatar_path
        this.errors = null
        await router.push({name: 'Dashboard'})
      } catch (err) {
        await this.checkMessage(err)
      }
    },

    async userPhotoUrl(email: string): Promise<string> {
      try {
        const response = await axios.get(`${this.apiUrl}/v3/users/${email}/photo`, {
          responseType: 'arraybuffer'
        })
        const contentType = response.headers['content-type'];
        const imageType = /image\/png|image\/jpeg/.test(contentType) ?? contentType;

        const imageBlob = new Blob([response.data], {type: imageType});

        return URL.createObjectURL(imageBlob);
      } catch (error) {
        console.error('Error fetching user photo:', error)
        return 'default-photo-url.png'
      }
    },

    async registration(user: UserRegistrationInterface): Promise<string | MyErrorInterface> {
      try {
        const response = await axios.post(`${this.apiUrl}/v2/auth/registration`, user, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        cookies.set('tokenUser', response.data.token)
        this.user = jwtDecode(cookies.get('tokenUser'))
        this.avatarPath = jwtDecode(cookies.get('tokenUser')).avatar_path
        this.errors = null
        await router.push({name: 'Dashboard'})
      } catch (err) {
        await this.checkMessage(err)
      }
    },

    async checkMessage(err): Promise<MyErrorInterface> {
      if (Array.isArray(err.response.data.message)) {
        this.errors = err.response.data.message.join(' ')
      } else {
        this.errors = err.response.data.message
      }
      setTimeout(() => {
        this.errors = null
      }, 5000)
    },

    async getAllUser(): Promise<UsersResponseInterface | MyErrorInterface> {
      return await axios.get(`${this.apiUrl}/v3/users`, {
        headers: {
          Authorization: `Bearer ${cookies.get('tokenUser')}`
        }
      })
        .then((res) => this.users = res.data)
        .catch((err) => {
          this.errors = err.response.data
          setTimeout(() => {
            this.errors = null
          }, 5000)
        })
    },

    logout(): void {
      this.errors = null
      this.users = null
      this.user = null
      this.avatarPath = null
      cookies.remove('tokenUser')
    },

    formatDate(date: string): string {
      const options = {year: 'numeric', month: 'long', day: 'numeric'}
      return new Date(date).toLocaleDateString('ru-RU', options)
    }
  }
})