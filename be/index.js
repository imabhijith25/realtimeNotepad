const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { v4: uuidv4 } = require("uuid");

const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

const clientMap = new Map();
wss.on("connection", function connection(ws) {
    console.log("connection opened");
    // const ide = uuidv4();
    // clientMap.set(ws, ide);
    ws.on("message", function message(data) {
        const msg = JSON.parse(data);
        // ws.send(JSON.stringify(msg));

        wss.clients.forEach((client) => {
            if (client != ws) {
                client.send(JSON.stringify(msg));
            }
        });
    });
});

server.listen(3001, () => {
    console.log("stared");
});
