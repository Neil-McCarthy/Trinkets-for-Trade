const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200
}

module.exports = corsOptions;