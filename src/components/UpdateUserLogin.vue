<template>

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

</template>

<script>

  export default {
    name: 'updateLoginForm',
    data () {
      return {
        autofocus: true,
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
            login: this.login
          }
          this.$store.commit('setLoading', true)
          await this.$store.dispatch('updateUserLogin', updateLogin)
          this.$store.commit('setLoading', false)
          this.$store.commit('setUserLogin', this.login)
        }
      }
    }
  }
</script>
