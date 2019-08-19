<template>
    <div>
        <v-toolbar-side-icon
                @click="emailForm = true"
                class="primary"
        ></v-toolbar-side-icon>

        <v-dialog
                v-model="emailForm"
                max-width="500"
        >
            <v-card>
                <v-card

                        class="elevation-12"
                >
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
                                    :autofocus="true"
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
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  export default {
    name: 'updateEmailForm',
    data () {
      return {
        emailForm: false,
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
          const res = await this.$store.dispatch('updateUserEmail', updateEmail)
          if(res === 1){
            this.emailForm = false
            this.email = ''
          }
          this.$store.commit('setLoading', false)
        }
      }
    }
  }
</script>
