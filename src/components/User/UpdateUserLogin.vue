<template>

    <div>
        <v-toolbar-side-icon
                @click="loginForm = true"
                class="primary"
        ></v-toolbar-side-icon>

        <v-dialog
                v-model="loginForm"
                max-width="500"
        >
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Изменение имени</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-text-field
                                prepend-icon="person"
                                name="login"
                                label="Новое имя"
                                type="text"
                                v-model="login"
                                :rules="loginRules"
                                required
                                @keypress.enter.prevent
                                :autofocus="autofocus"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            @click="onLogin"
                            :loading="loading"
                            :disabled="loading"
                    >Изменить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>



</template>

<script>

  export default {
    name: 'updateLoginForm',
    data () {
      return {
        autofocus: true,
        loginForm: false,
        login: '',
        valid: false,
        loginRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 3 || 'Минимум 3  символов'
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      async onLogin () {
        if (this.$refs.form.validate()) {
          const updateLogin = {
            login: this.login.trim()
          }
          this.$store.commit('setLoading', true)
          const res = await this.$store.dispatch('updateUserLogin', updateLogin)
          if (res === 1){
            this.loginForm = false
            this.$store.commit('setUserLogin', this.login.trim())
            this.login = ''
          }
          this.$store.commit('setLoading', false)

        }
      }
    }
  }
</script>
