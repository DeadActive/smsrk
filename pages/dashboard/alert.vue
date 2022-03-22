<template>
    <v-layout child-flex>
        <portal to="title"> Проблемные устройства </portal>
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
            :count="count"
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
import { mapGetters, mapActions } from "vuex";

export default {
    auth: false,
    name: "AlertDevices",
    layout: "dashboard",
    head() {
        return {
            title: "Проблемные устройства",
        };
    },
    components: {
        DevicesTable,
        Filters,
    },
    data() {
        return {
            selected: [],
            options: {},
            interval: null,
            loading: false,
            error: null,
        };
    },
    computed: {
        ...mapGetters("devices", ["devices", "count"]),
    },
    methods: {
        onChange(payload) {
            this.selected = payload;
        },
        onOptionsChange(payload) {
            this.options = payload;
        },
    },
};
</script>
