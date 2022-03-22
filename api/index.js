import Auth from "./auth";
import Devices from "./devices";
import Constructions from "./constructions";

export default (context, inject) => {
    const factories = {
        auth: Auth(context.$axios),
        devices: Devices(context.$axios, context),
        constructions: Constructions(context.$axios, context),
    };

    inject("api", factories);
};
