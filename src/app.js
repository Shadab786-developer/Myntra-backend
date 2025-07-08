import express from "express";
import cors from "cors";
import coockieParser from "cookie-parser";

const app = express();

app.use(cors());

//Common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(coockieParser());

// Import routes

import productRouter from "./routes/productList.routes.js";
import userRouter from "./routes/user.routes.js";
import filterRouter from "./routes/filter.routes.js";

// Routes

app.use("/api/v1/products", productRouter);
app.use("/api/v1/userAuth", userRouter);
app.use("/api/v1/filter", filterRouter);

export { app };
