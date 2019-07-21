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
                        label="Имя"
                        type="text"
                        v-model="name"
                        :rules="nameRules"
                        required
                ></v-text-field>
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
                <v-text-field
                        prepend-icon="lock"
                        name="confirmPassword"
                        label="Повторите пароль"
                        type="password"
                        v-model="confirmPassword"
                        :rules="confirmPasRules"
                        required
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    @click="onLogin"
            >Зарегистрироваться
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
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
          v => /.+@.+/.test(v) || 'E-mail некорректное значение'
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
        ],
      }
    },
    computed: {},
    methods: {
      togleRegisterDialog ({commit}, payload) {
        this.$store.dispatch('togleRegisterDialog');
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
