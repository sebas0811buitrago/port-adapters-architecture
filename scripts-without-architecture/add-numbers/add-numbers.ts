// const API_URL_1 = "https://www.googleapis.com/books/v1/volumes?q=";

// const API_URL_2 = "https://openlibrary.org/search.json?q=";

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main(): Promise<void> {
  try {
    console.log("Welcome to the Number Calculator!");

    const firstInput = await askQuestion("Enter the first number: ");
    const secondInput = await askQuestion("Enter the second number: ");

    const firstNumber = parseFloat(firstInput);
    const secondNumber = parseFloat(secondInput);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      console.log("Error: Please enter valid numbers.");
      rl.close();
      return;
    }

    const sum = firstNumber + secondNumber;
    console.log(`The sum of ${firstNumber} and ${secondNumber} is: ${sum}`);

    rl.close();
  } catch (error) {
    console.error("An error occurred:", error);
    rl.close();
  }
}

main();
