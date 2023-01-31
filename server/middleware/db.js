import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DB_URL, {
            autoIndex: true,
            dbName: "fileUploader",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 100,
        })

        console.log(chalk.green.bold(`DB Connected Successfully!`));

    } catch (error) {
        console.error(chalk.red(error))
        process.exit(1)
    }
}

export { connectDB }