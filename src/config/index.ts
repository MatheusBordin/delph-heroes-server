import development from "./development";
import production from "./production";

const env = process.env.NODE_ENV;
let config = development;

if (env === "production") {
    config = production;
}

export default config;