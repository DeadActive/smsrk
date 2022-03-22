<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            v-model="selected"
            item-key="id"
            fixed-header
            class="fill-height"
            checkbox-color="accent"
            :items-per-page="15"
            hide-default-footer
            v-bind="attrs"
            :options.sync="options"
            :loading="loading"
            :server-items-length="count"
        >
            <template #item.id="{ value }">
                <nuxt-link :to="`/dashboard/constructions/${value}`"
                    >{{ value }}
                </nuxt-link>
            </template>
            <template #footer="{ props, on }">
                <v-data-footer
                    :pagination="props.pagination"
                    :options="props.options"
                    v-on="on"
                    items-per-page-text="Конструкций на странице:"
                />
            </template>
        </v-data-table>
    </div>
</template>

<script>
import GradedCell from "./GradedCell.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        attrs: {
            type: Object,
            default: () => {
                return {};
            },
        },
        loading: {
            type: Boolean,
            default: false,
        },
        count: {
            type: Number,
            default: 0,
        },
    },
    components: {
        GradedCell,
    },
    data() {
        return {
            options: {},
            headers: [
                { text: "ID", value: "id", class: "accent--text" },
                { text: "Город", value: "geo_city", class: "accent--text" },
                {
                    text: "Тип конструкции",
                    value: "ctType",
                    class: "accent--text",
                },
                {
                    text: "Владелец",
                    value: "owner",
                    class: "accent--text",
                },
            ],
            selected: [],
        };
    },
    mounted() {
        if (!this.tableOptions[this.$route.name]) {
            this.updateTableOptions({
                id: this.$route.name,
                options: this.options,
            });
        }

        this.options = this.tableOptions[this.$route.name];
    },
    methods: {
        ...mapActions("app", ["updateTableOptions"]),
    },
    computed: {
        ...mapGetters("app", ["tableOptions"]),
    },
    watch: {
        selected() {
            this.$emit("change", this.selected);
        },
        options() {
            this.updateTableOptions({
                id: this.$route.name,
                options: this.options,
            });

            this.$emit("options", this.options);
        },
    },
};
</script>

<style>
.el-dot {
    display: block;
    width: 16px;
    height: 16px;
    background-color: #eb5757;
    border-radius: 50%;
}

.el-dot.active {
    background-color: #219653;
}

.v-data-table__wrapper {
    padding-bottom: 60px;
}
</style>
