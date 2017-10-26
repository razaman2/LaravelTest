export default global = {
    state: {
        dealFields: null,
        dealId: null,
        userId: null,
        companyId: '1015485695689562665',
        rules: {
            required: (v) => {
                if(v && v.match(/none/i)) {
                    return 'none is not a valid value';
                }
                return !!v || 'this field is required';
            },
            zip: (v) => {
                if (v && v.length > 0) {
                    return /^\d{5}$/.test(v) || 'zipcode is invalid';
                }
                return true;
            },
            phone: (v) => {
                if(v && v.length > 0) {
                    return /^\d{10}$/.test(v.replace(/\D/g, '')) || 'phone number is invalid';
                }
                return true;
            },
            passcode: (v) => {
                if(v && v.length > 0) {
                    return /^\d{5,10}$/.test(v) || 'passcode is invalid';
                }
                return true;
            },
            adcSerial: (v) => {
                if(v) {
                    return /^\d{15}$/.test(v) || 'invalid serial#, must be 15 digits';
                }
            },
            adcId: (v) => {
                if(v) {
                    return /^\d{5}$/.test(v) || 'customer id is invalid';
                }
            },
            validate: (form) => {
                if(form.$refs.form.validate()) {
                    let data = {};
                    let inputs = form.$refs.form.inputs;
                    for(let input in inputs) {
                        data[inputs[input].$attrs.name] = inputs[input].inputValue;
                    }
                    console.log('Form Validation', form.$refs.form, data);
                    return data;
                }
                return false;
            }
        }
    },
    getters: {
        global: state => {
            return state;
        },
        dealPicklists: state => {
            let fields = {};
            for(let field in state.dealFields) {
                if(state.dealFields[field].type === 'Pick List') {
                    fields[state.dealFields[field].label] = state.dealFields[field].options;
                }
            }
            return fields;
        }
    },
    mutations: {
        dealFields: (state, payload) => {
            state.dealFields = payload;
        },
        userId: (state, payload) => {
            state.userId = payload;
        },
        updateDealId: (state, payload) => {
            state.dealId = payload;
        },
        updateCompanyId: (state, payload) => {
            state.companyId = payload;
        }
    },
    actions: {
        userId: (context, payload) => {
            context.commit('userId', payload);
        },
        updateDealId: (context, payload) => {
            context.commit('updateDealId', payload);
        },
        updateCompanyId: (context, payload) => {
            context.commit('updateCompanyId', payload);
        }
    }
};
