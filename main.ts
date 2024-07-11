import inquirer from "inquirer";

import { differenceInSeconds } from "date-fns";

async function main() {
    const res = await inquirer.prompt({
        type: 'input',
        name: "userInput",
        message: "Please enter the amount of seconds",
        validate: (input: any) => {
            const num = Number(input);
            if (isNaN(num)) {
                return "Please enter a valid number";
            } else if (num > 60) {
                return "Seconds must be within 60";
            } else {
                return true;
            }
        }
    });

    let input = Number(res.userInput);

    if (typeof input === 'number' && !isNaN(input)) {
        startTime(input);
    } else {
        console.error("Invalid input, unable to start timer");
    }
}

function startTime(val: number) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000); 
}

main();
