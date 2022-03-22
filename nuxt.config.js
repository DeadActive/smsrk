import colors from "vuetify/es5/util/colors";
import ru from "vuetify/src/locale/ru";

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    axios: {
        baseURL: process.env.BASE_URL,
    },

    auth: {
        strategies: {
            local: {
                token: {
                    property: "access",
                    global: true,
                    type: "Token",
                },
                user: {
                    autoFetch: false,
                },
                endpoints: {
                    login: {
                        url: "auth/login/",
                        method: "post",
                    },
                    user: {
                        url: "auth/user/",
                        method: "get",
                    },
                },
            },
        },
    },

    router: {
        middleware: ["auth"],
    },

    // Target: https://go.nuxtjs.dev/config-target
    target: "static",

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: "%s - СМРК",
        title: "СМРК",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [{ src: "@/assets/classes.css" }],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: "@/api/index.js" }, { src: "@/plugins/v-mask.js" }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
        "@nuxtjs/moment",
    ],

    moment: {
        defaultLocale: "ru",
        locales: ["ru"],
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ["@nuxtjs/axios", "@nuxtjs/auth", "portal-vue/nuxt"],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ["~/assets/variables.scss"],
        theme: {
            dark: false,
            lang: {
                locales: [ru],
                current: "ru",
            },
            themes: {
                light: {
                    primary: "#4C1DBB",
                    accent: "#4C1DBB",
                },
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
