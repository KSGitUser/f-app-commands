<template>
    <v-layout container>
        <v-flex>
            <h1>Профиль пользователя новый</h1>
            <v-list v-for="(user, key) in userData" :key="key">
                <p>{{ key }} : {{ user }}</p>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'UserProfile',

        data() {
            return {
                userData: {}
            };
        },

        async created() {
            /* this.$store.dispatch['users/fetchUser'];
      const result = await this.$store.dispatch['users/fetchUser']; */
            await this.$store.dispatch('fetchUser');
            console.log(this.$store);
            console.log(this.$store.getters.getUser);
            this.userData = {
                ...this.$store.getters.getUser
            };
        }
    };
</script>

<style scoped></style>
