<template>
    <v-app>
        <v-navigation-drawer app temporary v-model="drawer">
            <v-list>
                <v-list-tile
                        v-for="link of links"
                        :key="link.title"
                        :to="link.url"
                >
                    <v-list-tile-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title
                            v-text="link.title"
                        ></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list>
                    <v-list-tile
                            @click="togleLoginDialog"
                            v-if="!isUserLoggedIn"
                    >
                        <v-list-tile-title>
                            <v-icon left>lock</v-icon>
                            Войти
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
                <v-list>
                    <v-list-tile
                            @click="togleRegisterDialog"
                            v-if="!isUserLoggedIn"
                    >
                        <v-list-tile-title>
                            <v-icon left>face</v-icon>
                            Регистрация
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
                <v-list>
                    <v-list-tile
                            v-if="isUserLoggedIn"
                            @click="onLogout"
                    >
                        <v-list-tile-title>
                            <v-icon left>exit_to_app</v-icon>
                            Выйти
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>


            </v-list>
        </v-navigation-drawer>

        <v-toolbar app dark color="primary">
            <v-toolbar-side-icon
                @click="drawer =! drawer"
                class="hidden-md-and-up"
            >
            </v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" class="pointer">
                    app-commands
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                        v-for="link of links"
                        :key="link.title"
                        :to="link.url"
                        flat
                >
                    <v-icon left>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>
                <v-btn
                        v-if="!isUserLoggedIn"
                        @click="togleLoginDialog"
                        flat
                >
                    <v-icon left>lock</v-icon>
                    Войти
                </v-btn>
                <v-btn
                        v-if="!isUserLoggedIn"
                        @click="togleRegisterDialog"
                        flat
                >
                    <v-icon left>face</v-icon>
                    Регистрация
                </v-btn>
                <v-btn
                        v-if="isUserLoggedIn"
                        @click="onLogout"
                        flat
                >
                    <v-icon left>exit_to_app</v-icon>
                    Выйти
                </v-btn>


                <v-menu bottom left v-if="isUserLoggedIn">
                    <template v-slot:activator="{ on }">
                        <v-btn dark icon v-on="on">
                            <v-icon>account_circle </v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-tile
                                v-for="link of links"
                                :key="link.title"
                                :to="link.url"
                                @click=""
                        >
                            <v-list-tile-title>
                                <v-icon left>{{link.icon}}</v-icon>
                                {{ link.title }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>

                    <v-list>
                        <v-list-tile
                                v-if="!isUserLoggedIn"
                                @click="togleLoginDialog"
                        >
                            <v-list-tile-title>
                                <v-icon left>lock</v-icon>
                                Войти
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                    <v-list>
                        <v-list-tile
                                v-if="!isUserLoggedIn"
                                @click="togleRegisterDialog"
                        >
                            <v-list-tile-title>
                                <v-icon left>face</v-icon>
                                Регистрация
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>

        <v-content>
            <router-view></router-view>

            <template v-if="snackbarMsg">
                <v-snackbar
                    :multi-line="true"
                    :timeout="7000"
                    :color="snackbarType"
                    @input="closeSnackbar"
                    right
                    :value="true"
                >
                    {{ snackbarMsg }}
                    <v-btn dark flat icon @click.native="closeSnackbar">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-snackbar>
            </template>

            <v-dialog persistent v-model="loginDialog" max-width="500">
                <login-form></login-form>
            </v-dialog>

            <v-dialog persistent v-model="registerDialog" max-width="500">
                <v-card>
                    <registr-form></registr-form>
                </v-card>
            </v-dialog>

            <v-dialog persistent v-model="resetPasswordDialog" max-width="500">
                <v-card>
                    <reset-password-form></reset-password-form>
                </v-card>
            </v-dialog>
        </v-content>
    </v-app>
</template>

<script>
    import LoginForm from './components/Auth/Login';
    import RegistrForm from './components/Auth/Registration';
    import ResetPasswordForm from './components/Auth/ResetPassword';

  export default {
    components: {
      ResetPasswordForm,
      RegistrForm,
      LoginForm,
    },
    data () {
      return {
        drawer: false,
      }
    },
    methods: {
      togleLoginDialog () {
        this.$store.dispatch('togleLoginDialog')
      },
      togleRegisterDialog () {
        this.$store.dispatch('togleRegisterDialog')
      },
      togleResetPasswordDialog () {
        this.$store.dispatch('togleResetPasswordDialog')
      },
      onLogout () {
        this.$store.dispatch('logoutUser')
        this.$router.push('/')
      },
      closeSnackbar () {
        this.$store.dispatch('clearSnackbar')
      },
    },
    computed: {
      loginDialog () {
        return this.$store.getters.loginDialog
      },
      registerDialog () {
        return this.$store.getters.registerDialog
      },
      resetPasswordDialog () {
        return this.$store.getters.resetPasswordDialog
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
      links () {
        if (this.isUserLoggedIn) {
          return [
            {title: 'Главная', icon: 'home', url: '/'},
            {title: 'Доски', icon: 'bookmark_border', url: '/boards'},
            {title: 'Профиль', icon: 'account_circle', url: '/user'},
          ]
        }
      },
      snackbarType () {
        return this.$store.getters.snackbarType
      },
      snackbarMsg () {
        return this.$store.getters.snackbarMsg
      },
    },
  }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
