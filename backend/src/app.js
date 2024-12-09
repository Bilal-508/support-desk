import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import and use routes here
import userRouter from "./routes/user.routes.js";
import ticketsRouter from "./routes/ticket.routes.js";
import notesRoutes from "./routes/note.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketsRouter);
app.use("/api/v1", notesRoutes);

export { app };
