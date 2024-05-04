#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
differenceInSeconds;
console.log(chalk.bold.cyan("\n>>>>>>>>COUNTDOWN TIMER<<<<<<<<<\n"));
// create user input 
const response = await inquirer.prompt([
    {
        name: "user",
        type: "number",
        message: chalk.bold.yellow("Enter the Amount of second"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.bold.red("please enter valid number");
            }
            else if (input > 60) {
                return chalk.bold.red("seconds must be in 60");
            }
            else {
                return true;
            }
        }
    }
]);
let input = response.user;
// create function
function startTime(value) {
    const initTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(initTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiffer = differenceInSeconds(intervalTime, currentTime);
        if (timeDiffer <= 0) {
            console.log(chalk.bold.red("Timer has Expired"));
            process.exit();
        }
        const minutes = Math.floor((timeDiffer % (3600 * 24)) / 3600);
        const seconds = Math.floor(timeDiffer % 60);
        console.log(`${chalk.bold.cyan(minutes.toString().padStart(2, "0"))} : ${chalk.bold.cyan(seconds.toString().padStart(2, "0"))}`);
    }, 1000);
}
chalk.bold.yellow(startTime(input));
