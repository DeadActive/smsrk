<template>
    <v-dialog v-model="dialog" max-width="420">
        <template #activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs" small class="ml-2">
                <v-icon color="primary"> mdi-plus </v-icon>
            </v-btn>
        </template>
        <v-card class="pa-6" elevation="20">
            <div class="d-flex justify-space-between align-start">
                <h3 class="pb-6 primary--text">Новая плата</h3>
                <v-icon color="black" @click="dialog = false">
                    mdi-close
                </v-icon>
            </div>
            <v-row justify="center" align="center">
                <v-col xs="12" sm="10" class="pa-0">
                    <v-form v-model="valid" @submit.prevent="">
                        <v-text-field
                            v-model="device.id"
                            :rules="rules.id"
                            type="text"
                            label="ID"
                            outlined
                            dense
                            required
                        ></v-text-field>
                        <v-autocomplete
                            v-model="device.ct"
                            outlined
                            dense
                            required
                            label="Конструкция"
                            :rules="rules.ct"
                        >
                        </v-autocomplete>
                        <v-text-field
                            v-model="device.ip"
                            type="text"
                            :rules="rules.ip"
                            label="IP адрес платы"
                            outlined
                            dense
                            required
                        ></v-text-field>
                        <v-btn block color="primary" class="mb-4"
                            >Загрузить из справочника</v-btn
                        >
                        <v-row class="pb-2">
                            <v-col>
                                <v-btn block color="primary" :disabled="!valid">
                                    Проверить
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn block text @click="dialog = false"
                                    >Отменить</v-btn
                                >
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            valid: false,
            rules: {
                id: [(v) => !!v || "Заполните поле"],
                ip: [
                    (v) => !!v || "Заполните поле",
                    (v) =>
                        /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(
                            v
                        ) || "Недействительный IP адрес",
                ],
                ct: [(v) => !!v || "Выберите конструкцию"],
            },
            device: {
                id: "",
                ct: "",
                ip: "",
            },
        };
    },
};
</script>

<style></style>
