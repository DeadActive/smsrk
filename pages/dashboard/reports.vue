<template>
    <v-row>
        <portal to="title"> Отчеты </portal>
    </v-row>
</template>

<script>
export default {
    auth: false,
    name: "Reports",
    layout: "dashboard",
    head() {
        return {
            title: "Отчеты",
        };
    },
};
</script>
