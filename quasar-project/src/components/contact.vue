<template>
    <q-card class="contact-container">
        <q-toolbar>
            <q-btn flat round small>
                <q-icon name="people" />
            </q-btn>
            <q-toolbar-title>Contact List</q-toolbar-title>
            <q-btn flat round small>
                <q-icon name="keyboard_arrow_down" />
            </q-btn>
        </q-toolbar>
        <div v-if="contacts.length > 0" class="contacts-header">
            <small class="first-name-title">FIRSTNAME</small>
            <small class="last-name-title">LASTNAME</small>
            <small class="relationship-title">RELATIONSHIP</small>
            <small class="phone-title">PHONE</small>
        </div>
        <template v-for="(contact, index) in contacts">
            <div class="contact-list" :key="index">
                <div class="contact-header">
                    <strong class="first-name-title">Firstname</strong>
                    <strong class="last-name-title">Lastname</strong>
                    <strong class="relationship-title">Relationship</strong>
                    <strong class="phone-title">Phone</strong>
                </div>
                <q-icon class="edit text-orange" style="cursor: pointer" name="edit" size="1.8em" @click="modify(index)" />
                <p class="first-name">{{ contact.first_name }}</p>
                <p class="last-name">{{ contact.last_name }}</p>
                <p class="relationship">{{ contact.relationship }}</p>
                <p class="phone">{{ contact.phone }}</p>
                <q-icon class="delete text-red" style="cursor: pointer" name="delete" size="1.8em" @click="destroy(index)" />
            </div>
        </template>
        <q-card v-if="showForm" class="contact-inputs">
            <div class="contact-form-header bg-primary">
                <q-icon name="person" />
            </div>
            <div class="contact-form-fields">
                <q-input class="form-first-name" float-label="First Name" v-model="contact.first_name"></q-input>
                <q-input class="form-last-name" float-label="Last Name" v-model="contact.last_name"></q-input>
                <q-input class="form-phone" float-label="Phone" v-model="contact.phone"></q-input>
                <q-input class="form-passcode" float-label="Passcode" v-model="contact.passcode"></q-input>
                <q-input class="form-call-order" type="number" float-label="Call Order" v-model="contact.call_order"></q-input>
                <q-select class="form-contact-type" float-label="Contact Type" v-model="contact.contact_type" :options="selects.ctactype"></q-select>
                <q-select class="form-relationship" float-label="Relationship" v-model="contact.relationship" :options="selects.relation"></q-select>
                <q-select class="form-phone-type" float-label="Phone Type" v-model="contact.phone_type" :options="selects.phonetype"></q-select>
                <q-select class="form-authority-level" float-label="Authority Level" v-model="contact.authority_level" :options="selects.auth"></q-select>
                <p class="form-enhanced-title">Enhanced</p>
                <q-checkbox class="form-enhanced" v-model="contact.enhanced"></q-checkbox>
                <p class="form-has-key-title">Has Key</p>
                <q-checkbox class="form-has-key" v-model="contact.has_key"></q-checkbox>
                <p class="form-signer-title">Signer</p>
                <q-checkbox class="form-signer" v-model="contact.signer"></q-checkbox>
            </div>
            <q-card-separator></q-card-separator>
            <q-card-actions class="contact-actions">
                <q-btn class="text-blue" flat small @click="showForm = false">Close</q-btn>
                <q-btn class="text-green" flat small @click="save">Save</q-btn>
            </q-card-actions>
        </q-card>
        <q-card-separator></q-card-separator>
        <q-card-actions class="contact-container-actions">
            <q-btn class="text-green" flat @click="add">{{ showForm ? 'Clear' : 'Add Contact' }}</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
	export default {
		data () {
			return{
				contact: {
					first_name: null,
					last_name: null,
					phone: null,
					passcode: null,
					call_order: null,
					contact_type: null,
					phone_type: null,
					relationship: null,
					authority_level: null,
					enhanced: false,
					has_key: false,
					signer: false,
				}
			}
		},
		created () {
			this.$store.dispatch('getContacts');
			this.$store.dispatch('getSelects');
		},
		computed: {
			contacts () {
				return this.$store.state.contact.contacts;
			},
			selects () {
				return this.$store.state.contact.selects;
			},
			showForm: {
				get () {
					return this.$store.state.contact.showForm;
				},
				set (value) {
					this.$store.commit('showForm', value);
				}
			}
		},
		methods: {
			save () {
				this.$store.dispatch('saveContact', {contact: this.contact}).then(status => {
					this.resetContact();
				}).catch(error => {
					console.log(new Error(error));
				});
			},
			modify (index) {
				let contact = this.contacts[index];
				for (let key in contact) {
					this.contact[key] = contact[key];
				}
				this.showForm = true;
			},
			destroy (index) {
				this.$store.dispatch('deleteContact', {index, contact: this.contacts[index]});
			},
			add () {
				this.resetContact();
				this.showForm = true;
			},
			resetContact () {
				for (let key in this.contact) {
					if (key === 'enhanced' || key === 'has_key' || key === 'signer') {
						this.contact[key] = false;
					} else {
						this.contact[key] = null;
					}
				}
			}
		}
	}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .contact-container{
        display: grid;
        margin: 10px;
    }
    .contact-inputs{
        display: grid;
        margin: 5px;
    }

    .contact-header{
        display: none;
        grid-area: contact-header;
    }
    .contacts-header{
        display: grid;
        grid-template-columns: repeat(4, 1fr) repeat(2, 100px);
        margin: 3px 15px;
        grid-template-areas:
        "first-name-title last-name-title relationship-title phone-title .";
    }
    .contact-list{
        display: grid;
        grid-template-columns: repeat(4, 1fr) repeat(2, 100px);
        background-color: lightblue;
        border: 1px solid lightgrey;
        margin: 5px;
        padding: 10px;
        grid-template-areas:
        "first-name last-name relationship phone edit delete";
    }
    .first-name-title{
        grid-area: first-name-title;
    }
    .first-name{
        grid-area: first-name;
    }
    .last-name-title{
        grid-area: last-name-title;
    }
    .last-name{
        grid-area: last-name;
    }
    .relationship-title{
        grid-area: relationship-title;
    }
    .relationship{
        grid-area: relationship;
    }
    .phone-title{
        grid-area: phone-title;
    }
    .phone{
        grid-area: phone;
    }
    .edit{
        grid-area: edit;
    }
    .delete{
        grid-area: delete;
    }
    @media (max-width: 768px) {
        .contact-list{
            display: grid;
            grid-template-columns: 90px 1fr 40px;
            grid-column-gap: 10px;
            grid-template-areas:
            "contact-header first-name edit"
            "contact-header last-name edit"
            "contact-header relationship delete"
            "contact-header phone delete";
        }
        .contact-header{
            display: grid;
            color: white;
            justify-items: end;
            grid-area: contact-header;
            grid-template-areas:
            "first-name-title"
            "last-name-title"
            "relationship-title"
            "phone-title";
        }
        .contacts-header{
            display: none;
        }
        .contact-container-actions{
            justify-self: center;
        }
    }

    .contact-form-header{
        color: white;
        padding: 5px;
    }
    .contact-form-fields{
        display: grid;
        padding: 0 5px 5px 5px;
        grid-column-gap: 20px;
        grid-template-areas:
        "form-first-name form-last-name"
        "form-phone form-phone-type"
        "form-contact-type form-authority-level"
        "form-passcode form-relationship"
        "form-enhanced-title form-has-key-title"
        "form-enhanced form-has-key"
        "form-call-order form-signer-title"
        "form-call-order form-signer";
    }
    .contact-form-fields *{
        padding: 0 5px;
    }
    .contact-actions{
        justify-self: end;
    }
    .contact-container-actions{
        justify-self: end;
    }
    .form-first-name{
        grid-area: form-first-name;
    }
    .form-last-name{
        grid-area: form-last-name;
    }
    .form-phone{
        grid-area: form-phone;
    }
    .form-passcode{
        grid-area: form-passcode;
    }
    .form-call-order{
        grid-area: form-call-order;
    }
    .form-contact-type{
        grid-area: form-contact-type;
    }
    .form-relationship{
        grid-area: form-relationship;
    }
    .form-phone-type{
        grid-area: form-phone-type;
    }
    .form-authority-level{
        grid-area: form-authority-level;
    }
    .form-enhanced-title{
        grid-area: form-enhanced-title;
    }
    .form-enhanced{
        grid-area: form-enhanced;
    }
    .form-has-key-title{
        grid-area: form-has-key-title;
    }
    .form-has-key{
        grid-area: form-has-key;
    }
    .form-signer-title{
        grid-area: form-signer-title;
    }
    .form-signer{
        grid-area: form-signer;
    }
    /*.contact-separator{*/
        /*grid-area: contact-separator;*/
        /*margin: 2px 10px;*/
    /*}*/
    /*.contact-actions{*/
        /*grid-area: contact-actions;*/
        /*justify-self: end;*/
    /*}*/
</style>