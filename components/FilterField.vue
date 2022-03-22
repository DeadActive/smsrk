<template>
    <v-row class="align-center">
        <v-col cols="5"
            ><v-chip class="flex-grow-1">{{ field.text }}</v-chip></v-col
        >
        <v-col cols="2" class="px-0"
            ><v-btn icon color="primary" @click="changeAction">
                <v-icon>{{ actions[action] }}</v-icon>
            </v-btn></v-col
        >
        <v-col cols="5"
            ><v-text-field
                hide-details
                dense
                full-width
                suffix="мс"
                v-model="fieldValue"
                type="number"
            ></v-text-field
        ></v-col>
    </v-row>
</template>

<script>
export default {
    props: ["field", "value"],
    data() {
        return {
            action: 0,
            actions: ["mdi-equal", "mdi-greater-than", "mdi-less-than"],
            fieldValue: 0,
        };
    },
    mounted() {
        this.$emit("input", this.filter);
    },
    methods: {
        changeAction() {
            this.action++;
            if (this.action > 2) {
                this.action = 0;
            }
        },
    },
    computed: {
        filter() {
            return {
                field: this.field.value,
                action: this.action,
                value: this.fieldValue,
            };
        },
    },
    watch: {
        filter() {
            this.$emit("input", this.filter);
        },
    },
};
</script>

<style></style>
