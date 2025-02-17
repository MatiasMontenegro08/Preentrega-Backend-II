import express from "express";
import { engine } from "express-handlebars";
import { CONFIG } from "./config/config.js";
import { conectarDB } from "./conDB.js";

// imports del curso Backend II
import passport from "passport";
import indexRouter from "./routes/index.routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { initializePassport } from "./config/passport.config.js";


const app = express();

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Configuración Handlebars
app.engine("hbs", engine({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(express.static("./src/public"));

// Mongoose config
mongoose
    .connect(CONFIG.MONGO_URL)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.log(err));

// Rutas
app.use("/api", indexRouter);

// Servidor config
app.listen(CONFIG.PORT, () => {
    console.log(`Server escuchando en puerto http://localhost:${CONFIG.PORT}`);
});


conectarDB(CONFIG.MONGO_URL, CONFIG.DB_NAME);