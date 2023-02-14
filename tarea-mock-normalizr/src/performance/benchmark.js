import autocannon from "autocannon";
import {PassThrough} from "stream";

const run = (url) => {
    const buf = [];
    const outputStream = new PassThrough();

    const cannon = autocannon({
        url,
        connections: 100,
        duration: 20
    });
    
    autocannon.track(cannon, {outputStream});

    outputStream.on("data", data => buf.push(data));

    cannon.on("done", () => {
        process.stdout.write(Buffer.concat(buf));
    })
}
run("http://localhost:8080/info/sin-comprimir")
//export default run();