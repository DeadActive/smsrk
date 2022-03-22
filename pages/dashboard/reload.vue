<template>
    <v-row>
        <portal to="title"> Перезагрузка </portal>
    </v-row>
</template>

<script>
export default {
    auth: false,
    name: "Reload",
    layout: "dashboard",
    head() {
        return {
            title: "Перезагрузка",
        };
    },
};
</script>
