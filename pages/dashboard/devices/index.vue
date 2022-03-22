<template>
    <v-layout child-flex>
        <portal to="title">
            <div>Все устройства</div>
            <add-device></add-device>
        </portal>
        <portal to="buttons">
            <filters></filters>
            <v-btn
                color="primary"
                elevation="0"
                class="no-uppercase mx-2"
                :disabled="selected.length <= 0"
            >
                Перезагрузить
            </v-btn>
        </portal>
        <devices-table
            :items="devices"
            @change="onChange"
            @options="onOptionsChange"
            :count="deviceCount"
            :loading="loading"
            v-if="!error"
        ></devices-table>
        <v-subheader class="error--text" v-else>
            {{ error }}
        </v-subheader>
    </v-layout>
</template>

<script>
import DevicesTable from "@/components/DevicesTable.vue";
import Filters from "@/components/Filters.vue";
import AddDevice from "@/components/AddDevice.vue";
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
    auth: false,
    name: "Devices",
    layout: "dashboard",
    head() {
        return {
            title: "Все устройства",
        };
    },
    components: {
        DevicesTable,
        Filters,
        AddDevice,
    },
    data() {
        return {
            devices: [],
            selected: [],
            options: {},
            interval: null,
            deviceCount: 0,
            loading: false,
            error: null,
        };
    },
    mounted() {},
    methods: {
        onChange(payload) {
            this.selected = payload;
        },
        onOptionsChange(payload) {
            this.options = payload;
            this.pollDevices();
        },
        async loadDevices(
            page,
            limit,
            sortBy = undefined,
            filterBy = undefined
        ) {
            this.loading = true;
            try {
                this.deviceCount = (
                    await this.$api.devices.getDeviceCount()
                ).data;

                console.log(this.deviceCount);

                const { data } = await this.$api.devices.getDevices(
                    page,
                    limit,
                    sortBy,
                    filterBy
                );
                this.devices = data;
                this.error = null;
            } catch (e) {
                this.error = "Отсутствует подключение к серверу";
            } finally {
                this.loading = false;
            }
        },
        pollDevices() {
            if (this.interval) {
                clearInterval(this.interval);
            }

            const { page, itemsPerPage: limit } = this.options;

            this.loadDevices(page, limit);

            this.interval = setInterval(() => {
                this.loadDevices(page, limit);
            }, 10000);
        },
    },
    beforeDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    },
};
</script>
