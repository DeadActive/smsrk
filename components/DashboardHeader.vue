<template>
    <v-app-bar>
        <v-tabs>
            <v-tab to="/dashboard/index"> Активные устройства </v-tab>
            <v-tab to="/dashboard/devices"> Все устройства </v-tab>
            <v-tab> Перезагрузка </v-tab>
        </v-tabs>
        <v-tabs-items>
            <v-tab-item>
                <Nuxt></Nuxt>
            </v-tab-item>
        </v-tabs-items>
    </v-app-bar>
</template>

<script>
export default {
    name: "Tabs",
};
</script>
