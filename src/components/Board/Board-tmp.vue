<template>
    <div class="demo">

        <v-layout grey lighten-3 row>
            <h3>id: {{id}}</h3>
            <v-spacer></v-spacer>
            <v-menu
                    :close-on-content-click="false"
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            v-on="on"
                            fab
                    >
                        <v-icon>insert_photo</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <form class="pa-3">
                        <v-select v-model="bf"
                                  :items="bfOptions"
                                  label="выберите фон"
                        ></v-select>
                    </form>
                </v-card>
            </v-menu>
            <v-btn
                    icon
                    @click="addList"
                    fab
            >
                <v-icon>add_circle</v-icon>
            </v-btn>
        </v-layout>

        <div class="root-box pre style-1"
             @contextmenu="show"
             :style="{'background': `url('${bf}')`}"
        >

            <v-menu
                    v-model="showMenu"
                    :position-x="x"
                    :position-y="y"
                    absolute
                    offset-y
            >
                <v-list>
                    <v-list-tile
                            v-for="(item, index) in showMenuItems"
                            :key="index"
                            @click="item.action"
                    >
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

            <div
                    class="scrollbar-box mt-5 mb-5 mr-2 ml-2"
                    v-for="(list, idx) in lists" :key="idx"
            >
                <div class="bg pa-3">
                    <h2><b>{{list.title}}</b></h2>
                    <hr>
                </div>

                <div class="scrollbar style-1 bg pa-1">

                    <draggable
                            id="first"
                            data-source="juju"
                            :list="list.items"
                            draggable=".item"
                            group="a"
                    >
                        <div
                                class=" item"
                                v-for="element in list.items"
                                :key="element.id"
                                @click="demo"
                        >
                            {{ element.name }} | {{ element.id }}
                        </div>

                    </draggable>
                    <pre> {{ list.items }} </pre>
                </div>

                <v-card-actions class="bg pa-3">
                    <v-btn flat small @click="add(idx)">+ добавить карточку</v-btn>
                </v-card-actions>

            </div>


            <div class="text-xs-center">
                <v-dialog
                        v-model="dialog"
                        width="700"
                >
                    <v-card>
                        <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                        >
                            Карточка задачи
                        </v-card-title>

                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem, exercitationem hic
                            odio quaerat temporibus tenetur. Asperiores cupiditate delectus dolorum esse, labore quam
                            quas quo suscipit. Architecto atque aut blanditiis distinctio dolor ea error ipsum,
                            laudantium minus mollitia officiis quae. Accusantium amet aperiam asperiores atque
                            blanditiis consequatur delectus deleniti dolorum est eum, excepturi facere harum id incidunt
                            ipsa ipsam maiores natus, nisi non officia officiis omnis possimus quaerat reiciendis
                            reprehenderit tempore ut voluptatum. A ab accusantium aliquam aperiam asperiores blanditiis
                            consequuntur culpa cum debitis dicta dolore earum eligendi esse excepturi exercitationem
                            fugiat id illo illum impedit iste laudantium minus non nostrum officiis possimus quam quia
                            quibusdam quidem quisquam quo reiciendis rem reprehenderit repudiandae sed suscipit, velit
                            voluptate? Ab accusamus modi nesciunt nisi praesentium repellendus repudiandae similique
                            suscipit tenetur velit. A, accusamus, ea esse et eum facere harum ipsum iusto nesciunt
                            numquam officiis quaerat recusandae rerum sapiente sit? Atque magni odio quae qui! Aliquam
                            aspernatur doloremque ducimus eius enim ipsam labore pariatur repudiandae tenetur velit. Ab,
                            aperiam assumenda atque commodi consectetur deleniti ducimus error eum expedita harum illum
                            incidunt libero magnam minima mollitia nihil porro quam quas quasi quidem, ratione
                            reiciendis rem repellendus rerum suscipit temporibus ullam ut vel veritatis voluptatem?
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    flat
                                    @click="dialog = false"
                            >
                                закрыть
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

        </div>

    </div>


</template>

<script>
  import draggable from 'vuedraggable'

  let id = 1
  export default {
    props: ['id'],
    name: 'Board',
    order: 14,
    components: {
      draggable
    },
    data () {
      return {
        dialog: false,
        showMenu: false,
        x: 0,
        y: 0,
        showMenuItems: [
          {title: 'Добавить список', action: this.addList}
        ],
        bf: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg',
        bfOptions: [
          {
            text: 'img.jpg',
            value: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg'
          }, {
            text: 'img0.jpg',
            value: 'https://ns328286.ip-37-187-113.eu/ew/wallpapers/800x480/02715_800x480.jpg'
          }
        ],
        lists: [
          {
            title: `name | ${id}`,
            items: [
              {name: 'Jonny', id: id++},
              {name: 'Jonny', id: id++},
              {name: 'Jonny', id: id++}
            ]
          },
          {
            title: `name | ${id}`,
            items: [
              {name: 'Jonny', id: id++},
              {name: 'Jonny', id: id++}
            ]
          }
        ]
      }
    },
    methods: {
      add: function (idx) {
        this.lists[idx].items.push({name: 'Juan ' + id, id: id++})
      },
      addList: function () {
        this.lists.push({title: `title ${id}`, items: [{name: 'Juan ' + id, id: id++}]})
      },
      demo: function () {
        this.dialog = !this.dialog
      },
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

    .list-group {
        background: #f0f0f0;
        padding: 15px;
        border-radius: 5px;
    }

    .item {
        border: 1px solid #707070;
        border-radius: 3px;
        background: #9a9a9a;
        color: #fff;
        padding: 5px;
        margin: 5px;
        transition: background-color .3s;

        cursor: pointer;

        &:hover {
            background: #d6d6d6;
        }
    }

    .pre {
        max-height: 100%;
        display: flex;
        position: relative;
        overflow-y: hidden;
        overflow-x: auto;

        & pre {
            margin: 10px;
            padding: 10px;
        }
    }

    pre {
        font-size: .8rem;
    }

    .scrollbar {
        overflow-y: auto;
        overflow-x: hidden;
        z-index: 1;
        min-height: 0;
    }

    .scrollbar-box {
        display: flex;
        flex-direction: column;
        border-radius: 3px;
        margin: 10px;
        padding: 10px;
        min-width: 270px;
        max-width: 270px;
    }

    .style-1::-webkit-scrollbar {
        width: 10px;
        height: 15px;
        background-color: #F5F5F5;
        transition: .5s;
    }

    .style-1::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, .3);
        background-color: #555;
        transition: .5s;

        &:hover {
            background-color: #79a2e4;
        }
    }

    .root-box {
        transition: background .3s;
        background-size: cover !important;
        height: 100%;
    }

    .demo {
        padding: 0;
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }

    .bg {
        background: #eeeeee;
    }

    .column {
        padding: 10px;
    }

    .top-menu-board {
        position: fixed;
        left: 0;
        right: 0;
    }
</style>
