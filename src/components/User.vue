<template>
    <v-layout row>
        <v-flex
                sm10
                offset-sm1
                lg6
                offset-lg3
                xs12>
            <h1 class="text--secondary mb-3">Профиль пользователя</h1>
            <div
                    v-if="loading"
                    class="text-xs-center align-center"
            >
                <v-progress-circular
                        :size="100"
                        :width="3"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </div>

            <div v-else>

                <v-list
                        subheader
                        two-line
                >
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-sub-title>email</v-list-tile-sub-title>
                            <v-list-tile-title>{{email}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-toolbar-side-icon
                                    @click="emailForm = true"
                                    class="primary"
                            ></v-toolbar-side-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-sub-title>login</v-list-tile-sub-title>
                            <v-list-tile-title>{{login}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-toolbar-side-icon
                                    @click="loginForm = true"
                                    class="primary"
                            ></v-toolbar-side-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-sub-title>password</v-list-tile-sub-title>
                            <v-list-tile-title>{{password}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-toolbar-side-icon
                                    @click="passwordForm = true"
                                    class="primary"
                            ></v-toolbar-side-icon>
                        </v-list-tile-action>
                    </v-list-tile>

                </v-list>

            </div>

            <v-dialog
                    v-model="passwordForm"
                    max-width="500"
            >
                <v-card>
                    <update-password-form></update-password-form>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="loginForm"
                    max-width="500"
            >
                <v-card>
                    <update-login-form></update-login-form>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="emailForm"
                    max-width="500"
            >
                <v-card>
                    <update-email-form></update-email-form>
                </v-card>
            </v-dialog>

        </v-flex>
    </v-layout>

</template>

<script>
  import UpdatePasswordForm from './UpdateUserPassword'
  import UpdateEmailForm from './UpdateUserEmail'
  import UpdateLoginForm from './UpdateUserLogin'

  export default {
    name: 'User',
    data () {
      return {
        passwordForm: false,
        emailForm: false,
        loginForm: false,
      }
    },
    components: {
      UpdateEmailForm,
      UpdatePasswordForm,
      UpdateLoginForm
    },
    mounted: function () {
      this.$nextTick(async () => {
        const {commit, dispatch} = this.$store
        await dispatch('profileUser')
      })
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      email () {
        return this.$store.getters.email
      },
      login () {
        return this.$store.getters.login
      },
      password () {
        return this.$store.getters.password
      },
    },
  }
</script>

<style scoped>

</style>
