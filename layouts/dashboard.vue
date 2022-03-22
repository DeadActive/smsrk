<template>
    <v-app>
        <v-navigation-drawer
            fixed
            permanent
            expand-on-hover
            disable-route-watcher
            disable-resize-watcher
            color="grey lighten-4"
        >
            <v-list>
                <v-list nav dense>
                    <v-list-item
                        link
                        active-class="primary--text"
                        to="/dashboard/alert"
                    >
                        <v-list-item-icon>
                            <v-badge
                                bottom
                                overlap
                                color="error"
                                :content="count"
                                v-if="count > 0"
                            >
                                <v-icon>mdi-alert</v-icon>
                            </v-badge>
                            <v-icon v-else>mdi-alert</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title
                            >Проблемные устройства</v-list-item-title
                        >
                    </v-list-item>
                    <v-list-item
                        link
                        active-class="primary--text"
                        to="/dashboard/devices"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-view-carousel</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Все устройства</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        link
                        to="/dashboard/constructions"
                        active-class="primary--text"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-wrench</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title
                            >Управление конструкциями</v-list-item-title
                        >
                    </v-list-item>
                    <v-list-item
                        link
                        active-class="primary--text"
                        to="/dashboard/reports"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-file</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Отчеты</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        link
                        to="/dashboard/reload"
                        active-class="primary--text"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-autorenew</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Перезагрузка</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar fixed class="ml-14" color="white">
            <h4 class="primary--text">
                <portal-target name="title" class="d-flex align-center">
                </portal-target>
            </h4>
            <v-spacer></v-spacer>
            <portal-target name="buttons" class="d-flex"> </portal-target>
        </v-app-bar>
        <v-container fluid class="mt-14 mt-md-16 pl-14">
            <v-slide-y-transition mode="out-in">
                <Nuxt></Nuxt>
            </v-slide-y-transition>
        </v-container>
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "DashboardLayout",
    methods: {
        ...mapActions("devices", ["startPolling", "stopPolling"]),
    },
    computed: {
        ...mapGetters("devices", ["count"]),
    },
    mounted() {
        this.startPolling(1, -1);
    },
};
</script>

<style></style>
