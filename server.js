import * as dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js"
import morgan from "morgan";
import passport from "passport";
import passportFile from "./config/passport.js";
import session from "express-session";
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js"
import chalk from "chalk";

// Load config
dotenv.config({ path: './config/config.env' });

// passport config
passportFile(passport)

// DB Connection
connectDB()

const app = express();

// Logging
if (process.env.ENVIRONMENT === 'development') {
    app.use(morgan('dev'))
}

// Session
app.use(session({
    secret: 'Demo by Jenish',
    resave: false,
    saveUninitialized: false,
    // store
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)

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
