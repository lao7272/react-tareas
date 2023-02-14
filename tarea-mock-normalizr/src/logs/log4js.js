import log4js from "log4js";

log4js.configure({
    appenders: {
        loggerConsole:{type: 'console'},

        loggerInfoConsole: {type: "console"},

        loggerErrorFile: {type: "file", filename: "./src/logs/error.log"},

        loggerWarnFile: {type: "file", filename: "./src/logs/warn.log"},
        
        loggerInfo: {
            appender: "loggerInfoConsole",
            type: "logLevelFilter",
            level: "info"
        },

        loggerError: {
            appender: "loggerErrorFile",
            type: "logLevelFilter",
            level: "error"
        },
        loggerWarn: {
            appender: "loggerWarnFile",
            type: "logLevelFilter",
            level: "warn"
        }

    },
    categories: {
        default: {
            appenders: ["loggerConsole", "loggerWarn", "loggerError", "loggerInfo"],
            level: "trace"
        },
        prod: {
            appenders: ['loggerError', "loggerWarn"],
            level: "all"
        },
        db: {
            appenders: ["loggerConsole"],
            level: "info"
        }
    }
});

export const logger = log4js.getLogger();
// export const prodLogger = log4js.getLogger("prod");
// export const dbLogger = log4js.getLogger("db");

