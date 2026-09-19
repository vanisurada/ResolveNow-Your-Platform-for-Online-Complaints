require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/complaints");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/resolvenow";

// server.js (Express example)
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // handle signup logic
  res.status(201).json({ message: "User created!" });
});

connectDB(MONGO_URI);

app.get("/", (req, res) => res.send("ResolveNow API running"));
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.on("joinRoom", ({ complaintId }) => {
    socket.join(complaintId);
  });

  socket.on("message", ({ complaintId, message }) => {
    io.to(complaintId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
