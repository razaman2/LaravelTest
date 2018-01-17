<template>
    <q-layout v-model="sides">
        <div slot="left"><p>hello world</p></div>
        <q-toolbar slot="header" color="primary">
            <q-btn flat round small @click="sides.left = !sides.left">
                <q-icon name="menu"></q-icon>
            </q-btn>
            <q-toolbar-title>DEMO APP</q-toolbar-title>
        </q-toolbar>
        <q-card class="column">
            <q-toolbar color="grey">
                <q-btn flat round small @click="getZones">
                    <q-icon name="refresh" />
                </q-btn>
                <q-toolbar-title>Zonelist</q-toolbar-title>
            </q-toolbar>
            <template v-for="(zone, index) in zones">
                <q-card :key="index" square>
                    <div class="zone-info">
                        <!--<small class="new-existing text-green">{{ zone.existing ? 'Existing' : 'New' }}</small>-->
                        <small class="created-at text-blue" v-if="zone.created_at">Created: {{ zone.created_at }}</small>
                    </div>
                    <div class="zone">
                        <q-checkbox class="existing" v-model="zone.existing">
                            <q-tooltip>new or existing device</q-tooltip>
                        </q-checkbox>
                        <q-input class="zone-number" v-model="zone.zone_number" type="number" float-label="Zone Number"></q-input>
                        <q-input class="zone-name" v-model="zone.zone_name" float-label="Zone Name"></q-input>
                        <q-select class="event-type" v-model="zone.event_type" :options="eventType" float-label="Event Type"></q-select>
                        <q-select class="device-type" v-model="zone.device_type" :options="deviceType" float-label="Device Type"></q-select>
                        <q-icon :class="zone.tested ? 'text-green tested' : 'text-red tested'" name="check_circle" size="20px">
                            <q-tooltip>tested with central station</q-tooltip>
                        </q-icon>
                    </div>
                    <q-card-separator class="zone-separator"></q-card-separator>
                    <q-card-actions class="zone-actions">
                        <small class="updated-at text-orange" v-if="zone.updated_at">Updated: {{ zone.updated_at }}</small>
                        <div v-if="!zone.edit && zone.id">
                            <q-btn class="text-blue q-btn-flat" @click="edit(index)">edit</q-btn>
                            <q-btn class="text-red q-btn-flat" @click="destroy(index)">delete</q-btn>
                        </div>
                        <q-btn class="save text-green q-btn-flat" v-else @click="save(index)">save</q-btn>
                    </q-card-actions>
                </q-card>
            </template>
            <q-card-actions class="create">
                <q-btn class="text-green q-btn-flat" @click="create">create</q-btn>
            </q-card-actions>
        </q-card>
    </q-layout>
</template>

<script>
	export default {
		created () {
			this.getZones();
		},
      data () {
	      return{
			      zone: {
				      existing: false,
                      tested: false,
				      zone_number: null,
				      zone_name: null,
				      event_type: null,
				      device_type: null,
			      }
          }
      },
		computed: {
			sides: {
				get () {
					return this.$store.state.ui.sides;
                },
              set (value) {
					this.$store.commit('sides', value);
              }
            },
			zones () {
				return this.$store.state.zone.zones;
			},
			eventType () {
				return this.$store.state.zone.event_type;
			},
			deviceType () {
				return this.$store.state.zone.device_type;
			}
		},
		methods: {
			save (index) {
				this.$store.dispatch('saveZone', {index, zone: this.zones[index]})
			},
			edit (index) {
				this.$store.commit('editZone', {index, zone: this.zones[index]})
			},
			destroy (index) {
				this.$store.dispatch('deleteZone', {index, zone: this.zones[index]})
			},
			create () {
				this.$store.commit('addZone', {zone: this.zone});
				this.resetZone();
			},
			getZones () {
				this.$store.dispatch('getZones');
			},
			resetZone () {
				for(let key in this.zone) {
					if(key === 'existing' || key === 'tested') {
						this.zone[key] = false;
					} else {
						this.zone[key] = null;
					}
				}
            }
		}
	}
</script>

<style scoped>
    .zone-info{
        display: grid;
        grid-auto-columns: auto;
        grid-template-areas:
                "created-at";
        margin: 2px 10px;
    }
    .created-at{
        grid-area: created-at;
        justify-self: end;
    }
    .new-existing{
        grid-area: new-existing;
    }
    .zone-number, .zone-name, .event-type, .device-type{
        margin: 2px;
    }
    .zone{
        display: grid;
        grid-column-gap: 15px;
        grid-template-columns: auto 1fr 1fr;
        grid-template-areas:
                "existing zone-number zone-name"
                "tested event-type device-type";
        padding: 0 10px;
    }
    .zone-separator{
        margin: 0 10px;
    }
    .existing{
        grid-area: existing;
        align-self: end;
    }
    .zone-number{
        grid-area: zone-number;
    }
    .zone-name{
        grid-area: zone-name;
    }
    .tested{
        grid-area: tested;
        align-self: end;
    }
    .event-type{
        grid-area: event-type;
    }
    .device-type{
        grid-area: device-type;
    }
    .create{
        display: grid;
        grid-template-columns: 1fr;
        justify-items: end;
    }
    .zone-actions{
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        padding: 0 10px;
    }
    .save{
        justify-self: end;
    }
</style>