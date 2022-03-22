<template>
    <v-container fluid>
        <h1>Home</h1>
    </v-container>
</template>

<script>
export default {
    auth: false,
    mounted() {
        this.$router.push("/dashboard/devices");
    },
};
</script>
