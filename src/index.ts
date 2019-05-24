import * as http from "http";
import * as express from "express";
import * as socket from "socket.io";
import * as cors from "cors";
import * as path from "path";
import config from "./config";
import { SocketService } from './services/socket';
import { GameService } from "./services/game";

const app = express();
app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/heartbeat', (req, res) => res.send('Alive!'));

const server = http.createServer(app);
const io = socket(server);

SocketService.start(io);
GameService.start();

server.listen(config.port, () => console.log(`Server listen on port ${config.port}`));
