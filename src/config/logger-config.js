const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, timestamp, error }) => {
    console.log(error);
    return `${timestamp} : ${level}: ${message} : ${error}`
})

const logger = createLogger({
    // level: 'info',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/combined.log' })
    ]
})

module.exports = logger