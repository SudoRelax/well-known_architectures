import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Logs } from "./shaders/utils/logs";
import { Separator } from "./shaders/utils/separator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(morgan("dev"));


app.listen(3000, () => {
    Logs.green(Separator.horizontalRule());
    Logs.green("Server running on port 3000");
    Logs.green("Server started at: http://localhost:3000");
    Logs.green(Separator.horizontalRule());
});
