<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>
                Вход в личный кабинет
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="togleLoginDialog">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                        prepend-icon="person"
                        name="login"
                        label="Логин"
                        type="text"
                        v-model="login"
                        :rules="loginRules"
                        required
                        @keyup.enter="onLogin"
                        :autofocus="true"
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
            </v-form>
        </v-card-text>

        <div class="text-xs-center">
            <v-btn flat color="primary" @click="togleResetPasswordDialog"
                >Забыли пароль?</v-btn
            >
        </div>
        <div class="text-xs-center">
            <p class="subheading">
                Не зарегистрированы?
                <v-btn flat color="primary" @click="togleRegisterDialog"
                    >Регистрация</v-btn
                >
            </p>
        </div>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="onLogin"
                :loading="loading"
                :disabled="loading"
                >Войти
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  export default {
    name: 'LoginForm',
    data () {
      return {
        email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'Обязательное поле',
          v => emailRegex.test(v) || 'E-mail некорректное значение'
        ],
        pasRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 6 || 'Минимум 6  символов'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      togleLoginDialog () {
        this.$store.dispatch('togleLoginDialog')
      },
      togleRegisterDialog () {
        this.togleLoginDialog()
        this.$store.dispatch('togleRegisterDialog')
      },
      togleResetPasswordDialog () {
        this.togleLoginDialog()
        this.$store.dispatch('togleResetPasswordDialog')
      },
      onLogin () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }

          this.$store.dispatch('loginUser', user)
            .then(() => {
              this.$store.dispatch('togleLoginDialog', false)
              this.$store.dispatch('setSnackbarMsg', 'Успешная авторизация')
              this.$store.dispatch('setSnackbarType', 'success')
            })
            .catch(
              error => {
                console.log(error)
                this.$store.dispatch('setSnackbarMsg', error.message)
                this.$store.dispatch('setSnackbarType', 'error')
              }
            )
        }
      }
    }
  }
</script>
