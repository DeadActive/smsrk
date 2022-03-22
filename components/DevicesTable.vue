<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            v-model="selected"
            item-key="id"
            show-select
            fixed-header
            class="fill-height"
            checkbox-color="accent"
            :items-per-page="15"
            hide-default-footer
            v-bind="attrs"
            :options.sync="options"
            :server-items-length="count"
            :loading="loading"
            :item-class="itemClass"
        >
            <template #item.elStatus="{ value }">
                <div class="d-flex align-center justify-center">
                    <v-tooltip color="error" bottom>
                        <template #activator="{ on, attrs }">
                            <v-icon
                                color="error"
                                v-if="
                                    value[0] === false &&
                                    value[1] === false &&
                                    value[2] === false
                                "
                                v-on="on"
                                v-bind="attrs"
                                >mdi-alert</v-icon
                            >
                        </template>
                        <span>Отсутствует питание на устройстве</span>
                    </v-tooltip>

                    <div
                        v-for="(status, index) in value"
                        :key="index"
                        class="el-dot mx-1"
                        :class="{ active: status }"
                    ></div>
                </div>
            </template>
            <template #item.id="{ value }">
                <nuxt-link :to="`/dashboard/devices/${value}`"
                    >{{ value }}
                </nuxt-link>
            </template>
            <template #item.computerInfo="{ value }">
                <graded-cell :value="value"></graded-cell>
            </template>
            <template #item.cameraInfo="{ value }">
                <graded-cell :value="value"></graded-cell>
            </template>
            <template #item.snifferInfo="{ value }">
                <graded-cell :value="value"></graded-cell>
            </template>
            <template #item.lastOnline="{ value }">
                {{ formatDate(value) }}
            </template>
            <template #footer="{ props, on }">
                <v-data-footer
                    :pagination="props.pagination"
                    :options="props.options"
                    v-on="on"
                    items-per-page-text="Устройств на странице:"
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
        count: {
            type: Number,
            default: 0,
        },
        loading: {
            type: Boolean,
            default: false,
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
                { text: "Город", value: "cityName", class: "accent--text" },
                {
                    text: "Тип конструкции",
                    value: "ctType",
                    class: "accent--text",
                },
                { text: "GID", value: "gid", class: "accent--text" },
                {
                    text: "Последний сеанс",
                    value: "lastOnline",
                    class: "accent--text",
                },
                {
                    text: "ПК",
                    value: "computerInfo",
                    class: "accent--text",
                    align: "center",
                    cellClass: "color-cell",
                },
                {
                    text: "Камера",
                    value: "cameraInfo",
                    class: "accent--text",
                    align: "center",
                    cellClass: "color-cell",
                },
                {
                    text: "WiFi",
                    value: "snifferInfo",
                    class: "accent--text",
                    align: "center",
                    cellClass: "color-cell",
                },
                {
                    text: "Электричество",
                    value: "elStatus",
                    align: "center",
                    class: "accent--text",
                },
            ],
            selected: [],
        };
    },
    mounted() {
        if (this.tableOptions[this.$route.name]) {
            this.options = this.tableOptions[this.$route.name];
        }
    },
    methods: {
        ...mapActions("app", ["updateTableOptions"]),
        itemClass(value) {
            return {
                "item-warning": !value.deviceStatus,
            };
        },
        formatDate(value) {
            return this.$moment(value, "YYYY-MM-DDTHH:mm:ss").fromNow();
        },
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

<style lang="scss">
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

.v-data-footer {
    position: fixed;
    background-color: #fff;
    padding-right: 64px !important;
    width: 100%;
    bottom: 0px;
}

.color-cell {
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-right: thin solid rgba(0, 0, 0, 0.12);
}

.item-warning {
    background: #ff5252;
    color: #fff;

    &:hover {
        background: #ef5350 !important;
    }
}
</style>
