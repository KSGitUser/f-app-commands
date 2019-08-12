<template>

    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Изменение Email</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        prepend-icon="email"
                        name="email"
                        label="Новый email"
                        type="email"
                        v-model="email"
                        :rules="emailRules"
                        required
                        @keypress.enter.prevent
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
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  export default {
    name: 'updateEmailForm',
    data () {
      return {
        email: '',
        valid: false,
        emailRules: [
          v => !!v || 'Обязательное поле',
          v => emailRegex.test(v) || 'E-mail некорректное значение'
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
          const updateEmail = {
            email: this.email,
          }
          this.$store.commit('setLoading', true)
          await this.$store.dispatch('updateUserEmail', updateEmail)
          this.$store.commit('setLoading', false)
        }
      }
    }
  }
</script>
