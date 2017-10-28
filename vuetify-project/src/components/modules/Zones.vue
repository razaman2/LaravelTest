<template>
    <module>
        <v-icon slot="module-icon">devices_other</v-icon>

        <v-toolbar-title slot="module-title">Zones</v-toolbar-title>

        <v-container slot="module-content">
            <v-layout class="wrap justify-space-between">
                <v-card hover>
                    <v-container>
                        <v-layout>
                            <v-flex>
                                <v-text-field prepend-icon="check" label="Zone Number"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field label="Zone Name" :mask="'###-##-####'" :color="'pink'"
                                              v-model="phone" box clearable></v-text-field>
                                {{ phoneMask }}
                            </v-flex>
                            <v-flex>
                                <v-select label="Event Type"></v-select>
                            </v-flex>
                            <v-flex>
                                <v-select label="Device Type"></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-layout>
        </v-container>

        <v-spacer slot="module-spacer"></v-spacer>

        <v-btn slot="module-action" class="green--text btn--large btn--flat">Add</v-btn>
    </module>
</template>

<script>
    import module from '../partials/module.vue';

    export default {
        components: {
            module: module
        },
        computed: {
            phoneMask () {
                return this.$store.state.zones.phoneMask;
            },
            phone: {
                get: function () {
                    return this.$store.state.zones.phone;
                },
                set: function (value) {
                    this.$store.commit('phone', value);
                }
            }
        }
    }
</script>