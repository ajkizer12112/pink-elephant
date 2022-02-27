const express = require("express");

const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./middleware/error");
const { connectDB, close } = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// Body Parser
app.use(express.json());

//security
app.use(mongoSanitize());

//set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());


// rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000,
});



app.use(limiter);

app.use(hpp());

//enable CORS
app.use(cors());


//dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(errorHandler);



//MOUNT ROUTERS
// ex: app.use("/api/v1/tasklists", taskList);
app.use("/api/v1/words", require("./routes/word"));
app.use("/api/v1/phrases", require("./routes/phrase"));
app.use("/api/v1/decks", require("./routes/deck"));

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//handle unhandled promise rejections

process.on("unHandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);

    server.close(() => process.exit(1));
});


module.exports = server