<template>

    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Форма регистрации</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="togleRegisterDialog">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        prepend-icon="person"
                        name="email"
                        label="Логин"
                        type="text"
                        v-model="name"
                        :rules="nameRules"
                        required
                        @keyup.enter="onLogin"
                        :autofocus="true"
                ></v-text-field>
                <v-text-field
                        prepend-icon="mail"
                        name="email"
                        label="e-mail"
                        type="email"
                        v-model="email"
                        :rules="emailRules"
                        required
                        @keyup.enter="onLogin"
                ></v-text-field>
                <v-text-field
                        prepend-icon="lock"
                        name="password"
                        label="Пароль"
                        type="password"
                        v-model="password"
                        :rules="pasRules"
                        required
                        @keyup.enter="onLogin"
                ></v-text-field>
                <v-text-field
                        prepend-icon="lock"
                        name="confirmPassword"
                        label="Повторите пароль"
                        type="password"
                        v-model="confirmPassword"
                        :rules="confirmPasRules"
                        required
                        @keyup.enter="onLogin"
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
            >Зарегистрироваться
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  export default {
    name: 'RegistrForm',
    data () {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        valid: false,
        emailRules: [
          v => !!v || 'Обязательное поле',
          v => emailRegex.test(v) || 'E-mail некорректное значение'
        ],
        pasRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 6 || 'Минимум 6  символов'
        ],
        nameRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 3 || 'Минимум 3  символов'
        ],
        confirmPasRules: [
          v => !!v || 'Обязательное поле',
          v => v === this.password || 'Должно совпадать с первым паролем'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      togleRegisterDialog ({commit}, payload) {
        this.$store.dispatch('togleRegisterDialog')
      },
      async onLogin () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password,
            login: this.name,
          }
          const res = await this.$store.dispatch('registerUser', user)
          if (res === 1) {
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            this.name = ''
            this.$store.dispatch('togleRegisterDialog')
          }
        }
      }
    }
  }
</script>
