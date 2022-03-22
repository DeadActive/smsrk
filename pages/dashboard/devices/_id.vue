<template>
    <v-container fluid>
        <portal to="title">
            <v-btn icon @click="$router.go(-1)">
                <v-icon color="black"> mdi-chevron-left </v-icon>
            </v-btn>
            <div>ID {{ this.$route.params.id }}</div>
        </portal>
        <v-row>
            <v-col cols="6">
                <v-skeleton-loader
                    type="card"
                    v-if="loading"
                ></v-skeleton-loader>
                <v-card v-else-if="!loading && !error">
                    <v-list dense>
                        <v-list-item
                            v-for="[key, value] in Object.entries(propsNames)"
                            :key="key"
                        >
                            <v-list-item-content>
                                <b> {{ value.name }}: </b>
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                                <div class="d-flex" v-if="key === 'elStatus'">
                                    <div
                                        v-for="(
                                            status, index
                                        ) in formatedDevice[key]"
                                        :key="index"
                                        class="el-dot mr-2"
                                        :class="{ active: status }"
                                    ></div>
                                </div>
                                <div v-else-if="key === 'gid'">
                                    <nuxt-link
                                        :to="`/dashboard/constructions/${formatedDevice[key]}`"
                                    >
                                        {{ formatedDevice[key] }}
                                    </nuxt-link>
                                </div>
                                <div v-else>
                                    <div v-if="value.type === 'link'">
                                        <a
                                            :href="`http://${formatedDevice[key]}`"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            >{{ formatedDevice[key] }}</a
                                        >
                                    </div>
                                    <div v-else>
                                        {{ formatedDevice[key] }}
                                        {{ value.unit }}
                                    </div>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
                <v-subheader class="error--text" v-else>
                    {{ error }}
                </v-subheader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    auth: false,
    name: "DeviceDetails",
    layout: "dashboard",
    data() {
        return {
            device: {},
            propsNames: {
                id: { name: "ID" },
                ip: { name: "IP адрес платы", type: "link" },
                cityName: { name: "Город" },
                ctType: { name: "Тип конструкции" },
                gid: { name: "GID" },
                lastOnline: { name: "Последни сеанс" },
                pk: { name: "ПК", unit: "мс" },
                cam: { name: "Камера", unit: "мс" },
                wifi: { name: "WiFi", unit: "мс" },
                elStatus: { name: "Электричество" },
                firmware: { name: "Версия прошивки" },
                camera_ip: { name: "IP адрес камеры", type: "link" },
                player_ip: { name: "IP адрес плеера", type: "link" },
                sniffer_ip: { name: "IP адрес сниффера", type: "link" },
            },
            loading: false,
            error: null,
        };
    },
    async fetch() {
        this.loading = true;
        try {
            this.device = (
                await this.$api.devices.getDevice(this.$route.params.id)
            ).data;
            this.error = null;
        } catch (e) {
            this.error = "Отсутствует подключение к серверу";
        } finally {
            this.loading = false;
        }
    },
    computed: {
        formatedDevice() {
            const result = { ...this.device };

            result.pk = result?.computerInfo;
            result.cam = result?.cameraInfo;
            result.wifi = result?.snifferInfo;
            result.lastOnline =
                this.$moment(
                    result?.lastOnline,
                    "YYYY-MM-DDThh:mm:ss"
                ).fromNow() +
                ` (${this.$moment(result?.lastOnline).format(
                    "YYYY.MM.DD hh:mm:ss"
                )})`;

            return result;
        },
    },
    head() {
        return {
            title: `ID ${this.$route.params.id}`,
        };
    },
};
</script>

<style></style>
