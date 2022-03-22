<template>
    <v-app id="default">
        <v-slide-y-transition mode="out-in">
            <Nuxt></Nuxt>
        </v-slide-y-transition>
    </v-app>
</template>

<script>
export default {
    name: "DefaultLayout",
};
</script>

<style>
#default {
    background-image: url("~assets/img/bg.svg") !important;
}
</style>
