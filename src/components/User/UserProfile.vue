<template>
    <v-container>
        <v-layout v-bind="binding">
            <v-flex md3 lg4>
                <v-card>
                    <v-list dense>
                        <v-list-tile
                            v-for="item in userMenuItems"
                            :key="item.title"
                            avatar
                            @click="tabToShow(item.action)"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title
                                    v-text="item.title"
                                ></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>

            <!-- <v-flex v-if="!loading" sm8 offset-sm1>
                <v-card>
                    <h1>Профиль пользователя новый</h1>

                    <v-list v-for="(user, key) in userData" :key="key">
                        <p>{{ key }} : {{ user }}</p>
                    </v-list>
                </v-card>
            </v-flex> -->
            <v-flex v-if="tabName==='userProfile'" md9 lg8 offset-md1>
                <v-card-text>
                    <h1>Данные пользователя</h1>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        method="post"
                    >
                        <v-text-field
                            prepend-icon="person"
                            name="email"
                            label="Имя"
                            type="text"
                            v-model="userData.name"
                            :rules="nameRules"
                            required
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="mail"
                            name="email"
                            label="e-mail"
                            type="email"
                            v-model="userData.email"
                            :rules="emailRules"
                            required
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="lock"
                            name="password"
                            label="Пароль"
                            type="password"
                            v-model="userData.password"
                            :rules="pasRules"
                            min="6"
                            required
                        ></v-text-field>
                        <!-- <v-text-field
                            prepend-icon="lock"
                            name="confirmPassword"
                            label="Повторите пароль"
                            type="password"
                            v-model="confirmPassword"
                            :rules="confirmPasRules"
                            required
                        ></v-text-field> -->
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="onLogin"
                        :loading="loading"
                        :disabled="loading"
                        >Изменить даныне
                    </v-btn>
                </v-card-actions>
            </v-flex>
            <v-flex v-else-if="tabName==='userBorders'" md9 offset-md1>
                <board></board>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import RegistrationForm from '../Auth/Registration';
    import Board from '../Board.vue';

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    export default {
        name: 'UserProfile',
        components: {
            'registration-form': RegistrationForm,
            board: Board
        },

        data() {
            return {
                loading: false,
                userData: {},
                tabName: 'userProfile',
                valid: false,
                emailRules: [
                    v => !!v || 'Обязательное поле',
                    v => emailRegex.test(v) || 'E-mail некорректное значение'
                ],
                pasRules: [v => v.length >= 6 || 'Минимум 6  символов'],
                nameRules: [
                    v => !!v || 'Обязательное поле',
                    v => v.length >= 3 || 'Минимум 3  символов'
                ],
                userMenuItems: [
                    {
                        icon: false,
                        iconName: 'star',
                        title: 'Информация о пользователе',
                        action: 'userProfile'
                    },
                    {
                        icon: false,
                        iconName: 'star',
                        title: 'Доски пользователя',
                        action: 'userBorders'
                    }
                ]
            };
        },
        methods: {
            tabToShow: function(nameOfTab) {
                this.tabName = nameOfTab;
                console.log(' tabName =>', this.tabName);
            },
            onLogin() {
                console.log(
                    ' this.$refs.form.validate() =>',
                    this.$refs.form.validate()
                );
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    };

                    this.$store
                        .dispatch('registerUser', user)
                        .then(() => {
                            this.$store.dispatch(
                                'setSnackbarMsg',
                                'Успешная регистрация'
                            );
                            this.$store.dispatch('setSnackbarType', 'success');
                        })
                        .catch(error => {
                            console.log(error);
                            this.$store.dispatch(
                                'setSnackbarMsg',
                                error.message
                            );
                            this.$store.dispatch('setSnackbarType', 'error');
                        });
                } else {
                    console.log('Не все данные введены');
                }
            }
        },

        computed: {
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.mdAndUp) {
                    binding.row = true;
                } else {
                    binding.column = true;
                }
                console.log(this.$vuetify.breakpoint.mdAndUp);
                return binding;
            }
        },

        async created() {
            /* this.$store.dispatch['users/fetchUser'];
            const result = await this.$store.dispatch['users/fetchUser']; */
            this.loading = true;
            await this.$store.dispatch('fetchUser');
            console.log('The store =>', this.$store);
            console.log(
                'this.$store.getters.getUser =>',
                this.$store.getters.getUser
            );
            this.userData = {
                ...this.$store.getters.getUser
            };
            this.loading = false;
        }
    };
</script>

<style scoped>
    .demo {
        padding: 0;
        margin: 0;
        position: inherit;
        top: auto;
        left: auto;
        right: auto;
        bottom: auto;
        display: flex;
        flex-direction: column;
    }
</style>
