import express from "express";
import userRoutes from "./router/user.js";
import contactRoutes from "./router/contact.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/contact", contactRoutes);

app.listen(8800);