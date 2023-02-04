import * as dotenv from "dotenv";
// Load config
dotenv.config()
import express from "express";
import { connectDB } from "./middleware/db.js"
import morgan from "morgan";
import passport from "passport";
import passportFile from "./middleware/passport.js";
import session from "express-session";
import { default as MongoStore } from "connect-mongo";
import uploadRouter from "./routes/upload.js";
import authRouter from "./routes/auth.js"
import chalk from "chalk";
import cors from "cors"


// passport config
passportFile(passport)

const app = express();

// Session
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    secret: 'DemobyJenish',
    resave: false,                                                 // setting to False means dont save a session, if nothing is modified.
    saveUninitialized: false,                                      // Will not create a session until something is stored 
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


// parsing body req
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json())


// DB Connection
connectDB()

// Logging
app.use(morgan('dev'))

// Routes
app.use('/auth', authRouter)
app.use('/', uploadRouter)

const PORT = process.env.PORT || 9000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(chalk.red("Cannot run!"));
    } else {
        console.log(chalk.green.bold(`Server is listening on port: ${PORT} with Env: ${process.env.ENVIRONMENT} 🦄`
        )
        );
    }
});
