<template>
    <div>
        <v-parallax
                height="300"
                src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        >
            <v-layout
                    align-center
                    column
                    justify-center
            >
                <h1 class="display-2 font-weight-thin mb-3">Твоя вторая память</h1>
            </v-layout>
        </v-parallax>

        <v-container v-for="(n, index) in 3" :key="index">
            <v-layout row>
                <v-flex xs12 sm8 md8>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium assumenda
                        culpa debitis error expedita facilis ipsum molestiae neque nobis numquam, quam sed, velit?
                        Culpa cupiditate eos illo libero quibusdam!
                    </v-card-text>
                </v-flex>
                <v-flex xs12 sm4 md4>
                    <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    />
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12 sm4 md4>
                    <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 9}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 9}`"
                    />
                </v-flex>
                <v-flex xs12 sm8 md8>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium assumenda
                        culpa debitis error expedita facilis ipsum molestiae neque nobis numquam, quam sed, velit?
                        Culpa cupiditate eos illo libero quibusdam!
                    </v-card-text>
                </v-flex>
            </v-layout>

        </v-container>
    </div>

</template>

<script>

</script>

<style scoped>


</style>
