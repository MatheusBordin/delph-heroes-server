import { IConfiguration } from "../types/configuration";

export default <IConfiguration> {
    port: process.env.PORT || 8080,
};
