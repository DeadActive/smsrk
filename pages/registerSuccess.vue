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
                        <p>
                            Регистрация прошла успешно, теперь вы можете войти в
                            систему.
                        </p>
                        <v-btn
                            @click="$router.push('/login')"
                            block
                            color="primary"
                        >
                            Войти
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    auth: false,
};
</script>

<style></style>
