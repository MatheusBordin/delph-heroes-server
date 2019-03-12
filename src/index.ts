import * as http from "http";
import * as socket from "socket.io";
import config from "./config";

const server = http.createServer();
const io = socket(server);

server.listen(config.port, () => console.log(`Server listen on port ${config.port}`));
