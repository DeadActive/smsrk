export const state = () => ({
    devices: [],
    count: 0,
    pollingInterval: null,
    options: null,
});

export const getters = {
    devices: (state) => state.devices,
    count: (state) => state.count,
    options: (state) => state.options,
};

export const mutations = {
    SET_DEVICES: (state, payload) => (state.devices = payload),
    SET_POLLING_INTERVAL: (state, payload) => (state.pollingInterval = payload),
    SET_COUNT: (state, payload) => (state.count = payload),
    SET_OPTIONS: (state, payload) => (state.options = payload),
};

export const actions = {
    updateDevices({ commit }, payload) {
        commit("SET_DEVICES", payload);
    },
    async loadDevices({ commit, state }, { page, limit, sortBy, filter }) {
        const count = (await this.$api.devices.getDevicesAlertsCount()).data;
        const { data } = await this.$api.devices.getDevicesAlerts(
            page,
            limit,
            sortBy,
            filter
        );

        commit("SET_COUNT", count);
        commit("SET_DEVICES", data);
    },
    startPolling(
        { commit, state, dispatch },
        { page, limit, sortBy, filter, timeout = 10000 }
    ) {
        if (state.pollingInterval) {
            clearInterval(state.pollingInterval);
        }

        dispatch("loadDevices", { page, limit, sortBy, filter });
        const interval = setInterval(() => {
            dispatch("loadDevices", { page, limit, sortBy, filter });
        }, timeout);

        commit("SET_POLLING_INTERVAL", interval);
    },
    stopPolling({ commit, state }) {
        if (state.pollingInterval) {
            clearInterval(state.pollingInterval);
        }

        commit("SET_POLLING_INTERVAL", null);
    },
    updateOptions({ commit }, payload) {
        commit("SET_OPTIONS", payload);
    },
};
