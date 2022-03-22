export default (axios) => ({
    register: (payload) => {
        axios.post("auth/register/", payload);
    },
});
