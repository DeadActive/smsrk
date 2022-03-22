import moment from "moment";

function randomDate() {
    const now = new Date();

    now.setMinutes(now.getMinutes() - Math.floor(Math.random() * 10));
    now.setHours(now.getHours());

    return moment(now).format("YYYY-MM-DDTHH:mm:ss");
}

export default (axios, vue) => ({
    getDevices: (page, limit, sortBy = undefined, filter = undefined) => {
        // return new Promise((resolve) => {
        //     const devices = [
        //         ...Array.from({ length: limit }, (v) => {
        //             const gid = Math.floor(Math.random() * 9999);
        //             return {
        //                 id: `MOS${gid}_device`,
        //                 deviceStatus: Math.random() < 0.9,
        //                 ip: "127.0.0.1",
        //                 gid: `MOS${gid}`,
        //                 lastOnline: randomDate(),
        //                 cameraInfo: Math.floor(Math.random() * 50),
        //                 snifferInfo: Math.floor(Math.random() * 50),
        //                 computerInfo: Math.floor(Math.random() * 150),
        //                 camera_ip: "10.178.0.2",
        //                 player_ip: "10.178.0.3",
        //                 sniffer_ip: "10.178.0.1",
        //                 elStatus: [
        //                     {
        //                         1: true,
        //                     },
        //                 ],
        //                 cityName: "Москва",
        //             };
        //         }),
        //     ];

        //     resolve({ data: devices });
        // });

        return axios.get("device", {
            params: {
                page,
                limit,
                sortBy,
                filter,
            },
        });
    },
    getDevice: (id) => {
        return axios.get(`device/${id}`);
    },
    getDeviceCount: () => {
        return axios.get("device/count");
    },
    getDevicesAlerts: (page, limit, sortBy = undefined, filter = undefined) => {
        return axios.get("device/alerts", {
            params: {
                page,
                limit,
                sortBy,
                filter,
            },
        });
    },
    getDevicesAlertsCount: () => {
        return axios.get("device/alerts/count");
    },
});
