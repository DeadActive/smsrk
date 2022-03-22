export const state = () => ({
    tableOptions: {},
});

export const getters = {
    tableOptions: (state) => {
        return state.tableOptions;
    },
};

export const mutations = {
    SET_TABLE_OPTIONS: (state, payload) => {
        state.tableOptions = payload;
    },
    UPDATE_TABLE_OPTIONS: (state, { id, options }) => {
        state.tableOptions[id] = options;
        state.tableOptions = { ...state.tableOptions };
    },
};

export const actions = {
    updateTableOptions({ commit }, { id, options }) {
        commit("UPDATE_TABLE_OPTIONS", { id, options });
    },
};
