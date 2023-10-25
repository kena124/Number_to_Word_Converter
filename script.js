// Description: This file contains the JavaScript code for the project
function displayValue() {
  let inputNumber = document.getElementById("inputNumber").value;
  if (inputNumber === "") {
    alert("Please enter a number");
    return 
  }
  // Check if the number is negative
  if (inputNumber < 0) {
    alert("Please enter a positive number");
    return 
  }
  // Check if the number is greater than 1 trillion
  if (inputNumber > 100000000001) {
    alert("Please enter a number less than 1 trillion");
    return
  }
  if (inputNumber % 1 !== 0) {
    alert("Please enter a whole number");
    return
  }
  if (inputNumber[0] === "0") {
    alert("Please enter a number without leading zeros");
    return
  }
  let output = convertToEnglishWords(parseInt(inputNumber));
  console.log(output)
  document.getElementById("displayNumberEn").innerHTML = `English: ${output.result_eng}`;
   document.getElementById("displayNumberAm").innerHTML = `Amharic: ${output.result_amh}`;
}

function convertToEnglishWords(num) {
    // Array to store the names of digits
    const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    // Array to store the names of tens
    const tens = ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    // Array to store the names of teens
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    // Array to store the names of place values
    const placeValues = ["", "thousand", "million", "billion", "trillion"];
  // array to store the names of digits in amharic
    const digits_amh = ["ዜሮ","አንድ", "ሁለት", "ሶስት", "አራት", "አምስት", "ስድስት", "ሰባት", "ስምንት", "ዘጠኝ"];
  // array to store the names of tens in amharic
    const teens_amh = ["አስር","አስራ አንድ", "አስራ ሁለስ", "አስራ ሶስር", "አስራ አራስ", "አስራ አምስት", "አስራ ስድስ", "አስራ ሰባር", "አስራ ስምንት", "አስራ ዘጠኝ"];
//  array to store the names of teens in amharic
    const tens_amh = ["አስር", "ሃያ", "ሰላሳ", "አርብ", "ሃምሳ", "ስልሳ", "ሰባ","ሰማንያ", "ዘጠና",];
//  array to store the names of place values in amharic
    const placeValues_amh = ["", "ሺህ", "ሚሊዮን", "ቢሊዮን", "ትሪሊዮን"];
    // String to store the final output_eng
    let output_eng = "";
    let output_amh = "";
    const list_eng = []
    const list_amh = []
    // Counter to keep track of place values
    let count = 0;
    if (num === 0) {
      const result_eng = "zero";
      const result_amh = "ዜሮ";
      return {result_eng, result_amh}
    }
    // Loop to convert the number to words
    while (num > 0) {
        // Extracting the last three digits of the number
        let temp = num % 1000;
        // Checking if the number is greater than or equal to 100
        ({ temp, output_eng, output_amh } = newFunction_2(temp, output_eng, digits, output_amh, digits_amh, tens, tens_amh));
        // Checking if the number is greater than or equal to 10
        ({ temp, output_eng, output_amh } = newFunction_1(temp, count, output_eng, teens, output_amh, teens_amh));
        // Checking if the number is greater than or equal to 1
        ({ output_eng, output_amh } = newFunction(temp, output_eng, digits, output_amh, digits_amh));
        // Incrementing the place value counter
        count++;
        // Removing the last three digits from the number
        num = Math.floor(num / 1000);
        // Checking if the number is not zero
        ({ output_eng, output_amh } = newFunction_3(num, output_eng, output_amh, placeValues, count, placeValues_amh));
        list_eng.unshift(output_eng)
        list_amh.unshift(output_amh)
        output_eng = ""
        output_amh = ""
    }
    // Returning the final output_eng
  let result_eng = ''
  let result_amh = ''
  for (let i = 0; i < list_eng.length; i++) {
    result_eng += list_eng[i] + " "
  }
  for (let i = 0; i < list_amh.length; i++) {
    result_amh += list_amh[i] + " "
  }

    return {result_eng, result_amh};
}

const run = () => {
  const num = document.getElementById('num').value
  const result = numberToWords(num)
  document.getElementById('result').innerHTML = result.result_eng
  document.getElementById('result_amh').innerHTML = result.result_amh
}

function newFunction_3(num, output_eng, output_amh, placeValues, count, placeValues_amh) {
  if (num > 0) {
    let len = num.toString().length;
    if ((num / 1000) >= 1 && len >= 4) {

      output_eng = output_eng;
      output_amh = output_amh;
    } else {

      output_eng = placeValues[count] + " " + output_eng;
      output_amh = placeValues_amh[count] + " " + output_amh;
    }
  }
  return { output_eng, output_amh };
}

function newFunction_2(temp, output_eng, digits, output_amh, digits_amh, tens, tens_amh) {
  if (temp >= 100) {
    output_eng = digits[Math.floor(temp / 100)] + " hundred " + output_eng;
    output_amh = digits_amh[Math.floor(temp / 100)] + " መቶ " + output_amh;
    temp = temp % 100;
  }
  // Checking if the number is greater than or equal to 20
  if (temp >= 20) {
    output_eng = output_eng + " " + tens[Math.floor(temp / 10) - 1];
    output_amh = output_amh + " " + tens_amh[Math.floor(temp / 10) - 1];
    temp = temp % 10;

  }
  return { temp, output_eng, output_amh };
}

function newFunction_1(temp, count, output_eng, teens, output_amh, teens_amh) {
  if (temp >= 10 && temp <= 20) {
    if (count > 0) {
      output_eng = teens[temp - 10] + " " + output_eng;
      output_amh = teens_amh[temp - 10] + " " + output_amh;
      temp = 0;

    } else {
      output_eng = output_eng + " " + teens[temp - 10];
      output_amh = output_amh + " " + teens_amh[temp - 10];
      temp = 0;

    }
  }
  return { temp, output_eng, output_amh };
}

function newFunction(temp, output_eng, digits, output_amh, digits_amh) {
  if (temp >= 1) {
    output_eng = output_eng + " " + digits[temp];
    output_amh = output_amh + " " + digits_amh[temp];

  }
  return { output_eng, output_amh };
}
