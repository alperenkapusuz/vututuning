import { APIConfig } from "@/config/api";

const VUTUTUNING_AUTH_CONTROLLER = APIConfig.baseURL + "/auth";
const VUTUTUNING_CAR_CONTROLLER = APIConfig.baseURL + "/car";
const VUTUTUNING_MEDIA_CONTROLLER = APIConfig.baseURL + "/media";

export const END_POINTS = {
    AUTH: {
        LOGIN: `${VUTUTUNING_AUTH_CONTROLLER}/login`,
        REGISTER: `${VUTUTUNING_AUTH_CONTROLLER}/register`,
        LOGOUT: `${VUTUTUNING_AUTH_CONTROLLER}/logout`,
    },
    CAR: {
        CREATE: `${VUTUTUNING_CAR_CONTROLLER}/create`,
        GET_ALL: `${VUTUTUNING_CAR_CONTROLLER}/getAll`,
        DELETE: `${VUTUTUNING_CAR_CONTROLLER}/delete`,
    },
    MEDIA: {
        UPLOAD_CAR_MEDIA: `${VUTUTUNING_MEDIA_CONTROLLER}/uploadCarMedia`,
    }
};