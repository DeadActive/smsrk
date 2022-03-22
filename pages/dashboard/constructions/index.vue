<template>
    <v-layout child-flex>
        <portal to="title"> Управление конструкциями </portal>
        <construction-table
            :items="items"
            :loading="loading"
            :count="count"
            @options="onOptionsChange"
            v-if="!error"
        ></construction-table>
        <v-subheader class="error--text" v-else>
            {{ error }}
        </v-subheader>
    </v-layout>
</template>

<script>
import ConstructionTable from "@/components/ConstructionTable";
import { mapGetters } from "vuex";

export default {
    auth: false,
    name: "Constructions",
    layout: "dashboard",
    head() {
        return {
            title: "Управление конструкциями",
        };
    },
    data() {
        return {
            items: [],
            loading: false,
            error: null,
            options: {},
            count: 0,
        };
    },
    methods: {
        async loadConstructions(page, limit) {
            const { data } = await this.$api.constructions.getConstructions(
                page,
                limit
            );
            this.items = data;
        },
        async loadConstructionsCount() {
            const { data } =
                await this.$api.constructions.getConstructionCount();
            this.count = data;
        },
        async onOptionsChange(payload) {
            this.options = payload;

            this.loading = true;
            const { page, itemsPerPage: limit } = this.options;
            try {
                await this.loadConstructionsCount();
                await this.loadConstructions(page, limit);
            } catch (e) {
                this.error = "Отсутствует подключение к серверу";
            } finally {
                this.loading = false;
            }
        },
    },
    components: {
        ConstructionTable,
    },
};
</script>
