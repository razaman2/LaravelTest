<template>
    <v-app id="app" toolbar footer>
        <v-navigation-drawer temporary absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ user }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.native.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" @click="">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed class="secondary" dark>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer">SableCRM+</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat v-for="item in items" :key="item.title" :to="item.location">
                    <v-icon left>{{ item.icon }}</v-icon>{{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <router-view></router-view>
        </main>
        <v-footer></v-footer>
    </v-app>
</template>

<script>
    export default {
        data () {
            return {
                user: 'Ainsley Clarke',
                drawer: false,
                items: [
                    { title: 'Account Online', icon: 'build', location: '/account' },
                    { title: 'Sales Portal', icon: 'assignment', location: '/sales' },
                    { title: 'Leaderboard', icon: 'rowing', location: '/leaderboard' }
                ],
                mini: false,
                right: null
            }
        }
    }
</script>
