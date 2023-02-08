import yargsParse from "yargs/yargs";

const parsedArgs = yargsParse(process.argv.slice(2))
.default({
    debug: false
})
.alias({
        p: "puerto",
})
.boolean("debug").argv;

export const port = parsedArgs.p;

