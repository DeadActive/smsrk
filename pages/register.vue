<template>
    <v-row justify="center" align="center" class="ma-0">
        <v-col cols="12" xs="12" sm="8" md="5" lg="4">
            <v-card class="pa-6" elevation="20">
                <div class="d-flex justify-space-between align-start">
                    <h3 class="pb-6 primary--text">Регистрация</h3>
                    <v-icon color="black" @click="$router.go(-1)">
                        mdi-arrow-left
                    </v-icon>
                </div>
                <v-row justify="center" align="center">
                    <v-col xs="12" sm="10">
                        <v-form v-model="valid" @submit.prevent="login">
                            <v-text-field
                                v-model="email"
                                :rules="rules.email"
                                type="email"
                                label="Электронная почта"
                                outlined
                                dense
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="password"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="rules.password"
                                label="Пароль"
                                outlined
                                dense
                                required
                            >
                                <template #append>
                                    <v-icon
                                        color="primary"
                                        @click="showPassword = !showPassword"
                                    >
                                        {{
                                            showPassword
                                                ? "mdi-eye-off"
                                                : "mdi-eye"
                                        }}
                                    </v-icon>
                                </template>
                            </v-text-field>
                            <v-text-field
                                v-model="passwordConfirm"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="rules.passwordConfirm"
                                label="Повторите пароль"
                                outlined
                                dense
                                required
                            >
                            </v-text-field>
                            <div class="d-flex justify-space-between pb-8">
                                <nuxt-link to="/reset"
                                    >Забыли пароль?</nuxt-link
                                >
                                <nuxt-link to="/login">Войти</nuxt-link>
                            </div>
                            <v-btn
                                type="submit"
                                block
                                color="primary"
                                :disabled="!valid"
                                :loading="loading"
                            >
                                Зарегистрироваться
                            </v-btn>
                            <p
                                class="error--text pt-4 ma-0"
                                v-if="authError.length > 0"
                            >
                                {{ authError }}
                            </p>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from "vuex";

const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default {
    auth: false,
    head() {
        return {
            title: "Авторизация",
        };
    },
    data() {
        return {
            valid: false,
            loading: false,
            email: "",
            password: "",
            passwordConfirm: "",
            showPassword: false,
            authError: "",
            rules: {
                email: [
                    (v) => !!v || "Укажите адрес электронной почты",
                    (v) =>
                        emailRegex.test(v) ||
                        "Укажите действительный адрес электронной почты",
                ],
                password: [
                    (v) => !!v || "Поля обязательно для заполнения",
                    (v) =>
                        v.length >= 6 || "Пароль должен быть длинее 6 символов",
                ],
                passwordConfirm: [
                    (v) => !!v || "Повторите пароль",
                    (v) => v === this.password || "Пароли не совпадают",
                ],
            },
        };
    },
    methods: {
        ...mapActions("Auth", ["register"]),
        async login() {
            this.loading = true;
            try {
                console.log(this);
                await this.$api.register({
                    email: this.email,
                    password: this.password,
                });

                this.$router.push("/registerSuccess");
            } catch (e) {
                console.error(e);
                this.authError =
                    e.response?.data?.message ||
                    "Отсутствует подключение к серверу";
            }
            this.loading = false;
        },
    },
};
</script>

<style></style>
