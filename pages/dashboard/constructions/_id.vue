<template>
    <v-container fluid>
        <portal to="title">
            <v-btn icon @click="$router.go(-1)">
                <v-icon color="black"> mdi-chevron-left </v-icon>
            </v-btn>
            <div>Конструкция {{ this.$route.params.id }}</div>
        </portal>
        <v-row>
            <v-col cols="12">
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
                                <div v-if="value.type === 'link'">
                                    <a
                                        :href="
                                            encodeUri(
                                                `https://yandex.ru/search/?text=${construction[key]}`
                                            )
                                        "
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        v-if="key === 'geo_address'"
                                    >
                                        {{ construction[key] }}
                                    </a>
                                    <a
                                        :href="
                                            encodeUri(
                                                `http://${construction[key]}`
                                            )
                                        "
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        v-if="
                                            key === 'player_ip' ||
                                            key === 'sniffer_ip'
                                        "
                                    >
                                        {{ construction[key] }}
                                    </a>
                                    <nuxt-link
                                        v-if="key === 'device_id'"
                                        :to="`/dashboard/devices/${construction[key]}`"
                                    >
                                        {{ construction[key] }}
                                    </nuxt-link>
                                </div>
                                <div v-else>
                                    {{ construction[key] }}
                                    {{ value.unit }}
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
            construction: {},
            propsNames: {
                id: { name: "ID" },
                geo_city: { name: "Город" },
                geo_address: { name: "Адрес конструкции", type: "link" },
                device_id: { name: "ID платы", type: "link" },
                player_ip: { name: "IP плеера", type: "link" },
                sniffer_ip: { name: "IP сниффера", type: "link" },
            },
            loading: false,
            error: null,
        };
    },
    head() {
        return {
            title: `Конструкция ${this.$route.params.id}`,
        };
    },
    mounted() {
        this.loadConstruction();
    },
    methods: {
        async loadConstruction() {
            this.loading = true;
            try {
                const { data } = await this.$api.constructions.getConstruction(
                    this.$route.params.id
                );
                this.construction = data;
            } catch (e) {
                this.error = "Отсутствует подключение к серверу";
            } finally {
                this.loading = false;
            }
        },
        encodeUri(uri) {
            return encodeURI(uri);
        },
    },
};
</script>

<style></style>
