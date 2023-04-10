import * as mod from "https://deno.land/std@0.100.0/fmt/colors.ts";
const text: string = Deno.args[0];
const color: string = Deno.args[1];


switch(color){
    case "red": 
        console.log(mod.bgBlack(mod.red(text)));
    break
    case "blue": 
        console.log(mod.bgBlack(mod.blue(text)));
    break
    case "cyan": 
        console.log(mod.bgBlack(mod.cyan(text)));
    break
    case "yellow": 
        console.log(mod.bgBlack(mod.yellow(text)));
    break
    default:
        console.log(mod.bgBlack(text));


}