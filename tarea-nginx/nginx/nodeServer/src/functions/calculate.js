const calculate = (num) => {

    let randomNum;
    if (!num) {
        for (let i = 0; i < 20000000; i++) {
            randomNum = Math.floor(Math.random() * (1000 - 1) + 1000);
        }
    } else {
        for (let i = 0; i < num; i++) {
            randomNum = Math.floor(Math.random() * (1000 - 1) + 1000);
        }
    }
    return randomNum
}

process.on("message", msg => {
    const num = calculate(msg);
    process.send(num);
    process.exit();
});
