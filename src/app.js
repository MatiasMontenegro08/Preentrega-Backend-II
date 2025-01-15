import express from "express";
import { engine } from "express-handlebars";
import { router as productosRouter } from "./routes/productosRouter.js";
import { router as carritoRouter } from "./routes/carritoRouter.js";
import { router as vistasRouter } from "./routes/vistasRouter.js";
import { config } from "./config/config.js";
import { conectarDB } from "./conDB.js";

// imports del curso Backend II
import passport from "passport";
import indexRouter from "./routes/index.routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import viewsRouter from "./routes/views.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { initializePassport } from "./config/passport.config.js";


const PORT = config.PORT;
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
    .connect(config.MONGO_URL)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.log(err));

// Rutas
app.use("/", vistasRouter);
app.use("/api/products", productosRouter);
app.use("/api/carts", carritoRouter);
app.use("/api/index", indexRouter);
app.use("/api/views", viewsRouter);

// Rutas del curso Backend II
app.use("/api/auth", authRouter);
app.use("/api/users", passport.authenticate("jwt", { session: false }), userRouter);

// Servidor config
app.listen(PORT, () => {
    console.log(`Server escuchando en puerto http://localhost:${PORT}`);
});


conectarDB(config.MONGO_URL, config.DB_NAME);