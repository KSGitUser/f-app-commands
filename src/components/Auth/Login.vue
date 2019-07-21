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
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        prepend-icon="mail"
                        name="email"
                        label="e-mail"
                        type="email"
                        v-model="email"
                        :rules="emailRules"
                        required
                ></v-text-field>
                <v-text-field
                        prepend-icon="lock"
                        name="password"
                        label="Пароль"
                        type="password"
                        v-model="password"
                        :rules="pasRules"
                        required
                ></v-text-field>
            </v-form>
        </v-card-text>

        <div class="text-xs-center">
            <v-btn flat color="primary" @click="togleResetPasswordDialog">Забыли пароль?</v-btn>
        </div>
        <div class="text-xs-center">
            <p class="subheading">Не зарегистрированы? <v-btn flat color="primary" @click="togleRegisterDialog" >Регистрация</v-btn></p>
        </div>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    @click="onLogin"
            >Войти
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
  export default {
    name: 'LoginForm',
    data () {
      return {
        email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'Обязательное поле',
          v => /.+@.+/.test(v) || 'E-mail некорректное значение'
        ],
        pasRules: [
          v => !!v || 'Обязательное поле',
          v => v.length >= 6 || 'Минимум 6  символов'
        ],
      }
    },
    computed: {},
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
            password: this.password,
          }
          //...
        }
      },
    },
  }
</script>
