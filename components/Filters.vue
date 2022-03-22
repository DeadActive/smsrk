<template>
    <v-dialog v-model="dialog" max-width="500">
        <template #activator="{ on, attrs }">
            <v-btn
                color="primary"
                elevation="0"
                class="no-uppercase mx-2"
                v-on="on"
                v-bind="attrs"
            >
                Фильтры
            </v-btn>
        </template>
        <v-card class="pa-6" elevation="20">
            <div class="d-flex justify-space-between align-start">
                <h3 class="pb-6 primary--text">Фильтры</h3>
                <v-icon color="black" @click="dialog = false">
                    mdi-close
                </v-icon>
            </div>
            <v-row justify="center" align="center">
                <v-col xs="12" sm="10" class="pa-0">
                    <v-list>
                        <v-list-item class="pb-4">
                            <v-select
                                outlined
                                hide-details
                                dense
                                label="Город"
                            ></v-select>
                        </v-list-item>
                        <v-list-item class="pb-4">
                            <v-select
                                outlined
                                hide-details
                                dense
                                label="Конструкция"
                            ></v-select>
                        </v-list-item>
                        <v-list-item class="pb-4">
                            <v-text-field
                                outlined
                                hide-details
                                dense
                                label="ID"
                            >
                            </v-text-field>
                        </v-list-item>
                        <v-list-item class="pb-4">
                            <v-menu
                                v-model="dateMenu"
                                :close-on-content-click="false"
                                offset-y
                                transition="scale-transition"
                                min-width="auto"
                            >
                                <template #activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateString"
                                        label="Дата"
                                        dense
                                        hide-details
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    range
                                    locale="ru"
                                    first-day-of-week="1"
                                ></v-date-picker>
                            </v-menu>
                        </v-list-item>
                        <v-list-item class="pb-4">
                            <v-select
                                outlined
                                hide-details
                                label="Статус"
                                :items="statuses"
                                v-model="selectedStatus"
                                return-object
                                multiple
                                chips
                                dense
                            >
                                <template
                                    #selection="{ attrs, item, selected }"
                                >
                                    <v-chip
                                        v-bind="attrs"
                                        :input-value="selected"
                                        close
                                        small
                                        @click:close="remove(item)"
                                    >
                                        <span>{{ item.text }}</span>
                                    </v-chip>
                                </template>
                            </v-select>
                        </v-list-item>
                        <v-list-item
                            v-for="(status, index) in selectedStatus"
                            :key="status.value"
                        >
                            <filter-field
                                :field="status"
                                v-model="fields[index]"
                            ></filter-field>
                        </v-list-item>
                        <v-list-item class="my-4">
                            <v-select
                                outlined
                                hide-details
                                dense
                                label="Электричество"
                                v-model="electricityField"
                                :items="electricity"
                            ></v-select>
                        </v-list-item>
                        <v-list-item>
                            <v-row>
                                <v-col>
                                    <v-btn
                                        color="primary"
                                        elevation="0"
                                        class="no-uppercase"
                                        @click="dialog = false"
                                        block
                                    >
                                        Применить
                                    </v-btn></v-col
                                >
                                <v-col
                                    ><v-btn
                                        text
                                        elevation="0"
                                        class="no-uppercase"
                                        @click="dialog = false"
                                        block
                                    >
                                        Отменить
                                    </v-btn></v-col
                                >
                            </v-row>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import FilterField from "./FilterField.vue";

export default {
    components: {
        FilterField,
    },
    data() {
        return {
            dialog: false,
            dateMenu: false,
            statuses: [
                {
                    text: "ПК",
                    value: "pk",
                },
                {
                    text: "Камера",
                    value: "cam",
                },
                {
                    text: "WiFi",
                    value: "wifi",
                },
            ],
            electricity: [
                {
                    text: "Все фазы исправны",
                    value: 0,
                },
                {
                    text: "Не все фазы исправны",
                    value: 1,
                },
                {
                    text: "Все фазы неисправны",
                    value: 2,
                },
                {
                    text: "Не выбрано",
                    value: -1,
                },
            ],
            selectedStatus: null,
            fields: [],
            date: [],
            electricityField: -1,
        };
    },
    computed: {
        dateString() {
            return this.date
                .map((date) => {
                    const [y, m, d] = date.split("-");
                    return [d, m, y].join(".");
                })
                .join(" ~ ");
        },
    },
    methods: {
        remove(item) {
            this.selectedStatus.splice(this.selectedStatus.indexOf(item), 1);
            this.fields.splice(
                this.fields.findIndex((v) => v.field === item.value),
                1
            );
            this.selectedStatus = [...this.selectedStatus];
            this.fields = [...this.fields];
        },
    },
};
</script>
