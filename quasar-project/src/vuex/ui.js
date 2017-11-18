export default global = {
	state: {
		sides: {
			left: false,
			right: false,
		}
	},
	mutations: {
		sides: (state, payload) => {
			state.sides = payload;
		}
	}
};