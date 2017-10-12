<template>
    <div></div>
</template>

<script>
    export default {
        methods: {
//            deleteZone () {
//                swal({
//                    title: 'Are you sure you want to delete ' + this.zone.zone_name + '?',
//                    text: "You won't be able to revert this!",
//                    type: 'warning',
//                    showCancelButton: true,
//                    confirmButtonColor: '#3085d6',
//                    cancelButtonColor: '#d33',
//                    confirmButtonText: 'Yes, delete it!'
//                }).then(() => {
//                    this.$http.delete('api/zones/' + this.zone.id).then(response => {
//                        console.log(response);
//                        if(response.body === 1)
//                        {
//                            swal(
//                                'Deleted!',
//                                this.zone.zone_name + ', has been deleted.',
//                                'success'
//                            );
//                        }
//                        else
//                            swal(
//                                'Not Deleted!',
//                                this.zone.zone_name + ', was not deleted.',
//                                'error'
//                            );
//                    }).then(() => {
//                        this.$router.push('/dashboard');
//                    });
//                });
//            },
            createZone (zone) {
                console.log(zone);
                this.$http.post('api/zones/', zone).then(response => {
                    this.$emit('zoneCreated', response);
                });
            },
            deleteZone (zone) {
                this.$http.delete('api/zones/' + zone.id).then(response => {
                    this.$emit('zoneDeleted', response);
                });
            },
            updateZone (zone) {
                this.$http.put('api/zones/' + zone.id, zone).then(response => {
                    this.$emit('zoneUpdated', response);
                });
            },
            getAll () {
                this.$http.get('api/zones/').then(response => {
                    this.$emit('zonesReceived', response);
                });
            },
            getZone (zone) {
                this.$http.get('api/zones/' + zone.id).then(response => {
                    this.$emit('zoneReceived', response);
                });
            }
        }
    }
</script>