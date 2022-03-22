<template>
    <v-layout
        class="fill-height align-center justify-center white--text"
        :class="gradeColor"
    >
        <v-tooltip color="red" bottom>
            <template #activator="{ on, attrs }">
                <v-icon
                    color="white"
                    v-if="_value > 200"
                    v-bind="attrs"
                    v-on="on"
                >
                    mdi-alert
                </v-icon>
            </template>
            Значение задержки больше допустимого значения
        </v-tooltip>
        {{ _value.toFixed(1) }} {{ unit }}
    </v-layout>
</template>

<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: 0,
        },
        unit: {
            type: String,
            default: "мс",
        },
    },
    computed: {
        _value() {
            return parseFloat(this.value);
        },
        gradeColor() {
            let color = "success";
            color = this.value > 100 ? "warning" : color;
            color = this.value > 200 ? "error" : color;
            color = this.value <= 0 ? "error" : color;

            return [color];
        },
    },
};
</script>

<style></style>
