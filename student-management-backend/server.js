const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5700;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
