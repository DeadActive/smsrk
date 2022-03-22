export default (axios, vue) => ({
    getConstructions: (page, limit, sortBy = undefined, filter = undefined) => {
        return axios.get("constructions", {
            params: {
                page,
                limit,
                sortBy,
                filter,
            },
        });
    },
    getConstruction: (id) => {
        return axios.get(`constructions/${id}`);
    },
    getConstructionCount: () => {
        return axios.get("constructions/count");
    },
});
