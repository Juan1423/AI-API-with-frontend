const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("express-async-errors");

const authRoutes = require("./routes/auth.routes");
const childRoutes = require("./routes/child.routes");
const aiRoutes = require("./routes/ai.routes");
const ttsRoutes = require("./routes/tts.routes");
const activityRoutes = require("./routes/activity.routes");
const sessionRoutes = require("./routes/session.routes");
const progressRoutes = require("./routes/progress.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/children", childRoutes);
app.use("/api/ia", aiRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/progress", progressRoutes);

// Manejador de errores
app.use(errorHandler);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error de conexión a MongoDB", err));

module.exports = app;
