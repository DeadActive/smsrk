<template>
    <v-row justify="center" align="center" class="ma-0">
        <v-col cols="12" xs="12" sm="8" md="5" lg="4">
            <v-card class="pa-6" elevation="20">
                <div class="d-flex justify-space-between align-start">
                    <h3 class="pb-6 primary--text">Авторизация</h3>
                </div>
                <v-row justify="center" align="center">
                    <v-col xs="12" sm="10">
                        <v-form v-model="valid" @submit.prevent="login">
                            <v-text-field
                                v-model="username"
                                :rules="rules.username"
                                type="username"
                                label="Логин"
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
                            <div class="d-flex justify-space-between pb-8">
                                <nuxt-link to="/reset"
                                    >Забыли пароль?</nuxt-link
                                >
                                <nuxt-link to="/register"
                                    >Регистрация</nuxt-link
                                >
                            </div>
                            <v-btn
                                type="submit"
                                block
                                color="primary"
                                :disabled="!valid"
                                :loading="loading"
                            >
                                Войти
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
            username: "",
            password: "",
            showPassword: false,
            authError: "",
            rules: {
                username: [
                    (v) => !!v || "Поля обязательно для заполнения",
                    (v) =>
                        v.length > 3 ||
                        "Имя пользователя должно быть длинее 3 символов",
                ],
                password: [
                    (v) => !!v || "Поля обязательно для заполнения",
                    (v) =>
                        v.length >= 6 || "Пароль должен быть длинее 6 символов",
                ],
            },
        };
    },
    methods: {
        async login() {
            this.loading = true;
            try {
                await this.$auth.loginWith("local", {
                    data: {
                        username: this.username,
                        password: this.password,
                    },
                });

                this.$router.push("/dashboard/active");
            } catch (e) {
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
