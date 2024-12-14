import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
}


const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        if (!userSocketMap[userId]) {
            userSocketMap[userId] = [];
        }
        userSocketMap[userId].push(socket.id);
        socket.data.userId = userId;
        console.log(`User connected with ID: ${userId}, Socket ID: ${socket.id}`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        const userIdToRemove = socket.data.userId;
        if (userIdToRemove) {
            userSocketMap[userIdToRemove] = userSocketMap[userIdToRemove].filter(
                (id) => id !== socket.id
            );
            if (userSocketMap[userIdToRemove].length === 0) {
                delete userSocketMap[userIdToRemove];
            }
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
