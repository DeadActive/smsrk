<template>
    <v-row justify="center" align="center" class="ma-0">
        <v-col cols="12" xs="12" sm="8" md="5" lg="4">
            <v-card class="pa-6" elevation="20">
                <div class="d-flex justify-space-between align-start">
                    <h3 class="pb-6 primary--text">Сбросить пароль</h3>
                    <v-icon color="black" @click="$router.go(-1)">
                        mdi-arrow-left
                    </v-icon>
                </div>
                <v-row justify="center" align="center">
                    <v-col xs="12" sm="10">
                        <v-form v-model="valid" @submit.prevent="restore">
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                type="email"
                                label="Электронная почта"
                                outlined
                                dense
                                required
                            >
                            </v-text-field>
                            <v-btn
                                type="submit"
                                block
                                color="primary"
                                :disabled="!valid"
                                :loading="loading"
                            >
                                Восстановить пароль
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default {
    auth: false,
    head() {
        return {
            title: "Восстановление пароля",
        };
    },
    data() {
        return {
            valid: false,
            loading: false,
            email: "",
            emailRules: [
                (v) => !!v || "Укажите адрес электронной почты",
                (v) =>
                    emailRegex.test(v) ||
                    "Укажите действительный адрес электронной почты",
            ],
        };
    },
    methods: {
        back() {
            history.go(-1);
        },
        restore() {},
    },
};
</script>

<style></style>
