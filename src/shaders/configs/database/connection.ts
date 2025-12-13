import mongoose from "mongoose";
import { Logs } from "../../utils/logs";
import { Separator } from "../../utils/separator";
import { ShowError } from "../errors/errorContainer";
import { Env } from "../envs/env";

export const connectToDatabase = async () => {
    try {

        await mongoose.connect(Env.get("MONGODB_URI"));

        Logs.green(Separator.horizontalRule());
        Logs.green("Connected to MongoDB");
        Logs.green(Separator.horizontalRule());


    } catch (error: any) {
        ShowError.showErrorDb(error)
    }
};