<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Восстановление доступа</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="togleResetPasswordDialog">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <p class="subheading">Укажите адрес электронной почты, чтобы получить временный пароль</p>
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

            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    @click="onLogin"
            >Восстановить пароль
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'ResetPasswordForm',
    data () {
      return {
        email: '',
        valid: false,
        emailRules: [
          v => !!v || 'Обязательное поле',
          v => /.+@.+/.test(v) || 'E-mail некорректное значение'
        ]
      }
    },
    computed: {},
    methods: {
      togleResetPasswordDialog ({commit}, payload) {
        this.$store.dispatch('togleResetPasswordDialog')
      },
      onLogin () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email
          }
        }
      }
    }
  }
</script>
