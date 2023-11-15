import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.printf((info) => {
    return `${new Date()} - ${info.level.toUpperCase()} : ${info.message}`;
  }),
  transports: [new winston.transports.Console({})],
});

export default logger;
