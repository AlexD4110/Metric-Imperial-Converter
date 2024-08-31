
function numberStringSplitter(input) { // Split the number and the unit using reges
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string]; //retruns an array with the number and the unit as string
}
function checkDiv(possibleFraction) { // Check if the number is a fraction 
  let nums = possibleFraction.split("/"); //ensures that the number is not a double fraction with more then 1 division symbol
  if (nums.length > 2) {
    return false;
  }
  return nums; //returns the number
}
function ConvertHandler() { //Handles conversion
  this.getNum = function (input) { //takes input as parameter
    let result = numberStringSplitter(input)[0]; //Use string splitting function to split the number and the unit
    let nums = checkDiv(result); //Uses helper function to check if the number is a fraction
    if (!nums) { //if the number is not a fraction
      return undefined; //return undefined
    }
    let num1 = nums[0]; //set num1 to first number in array
    let num2 = nums[1] || "1"; //set num2 to second number in array or default to 1
    result = parseFloat(num1) / parseFloat(num2); //divide num1 by num2 ensuring that they can be decimal numbers
    if (isNaN(num1) || isNaN(num2)) { //if num1 or num2 is not a number
      return undefined; //return undefined
    }
    return result; 
  };

  this.getUnit = function (input) { //Use string splitting function to split the number and the unit
    let result = numberStringSplitter(input)[1].toLowerCase(); //set result to unit
    switch (result) { //switch statement to return the unit
      case "km": //kilometers
        return "km"; 
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) { //switch statement to return the unit
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) { //switch statement to return the unit
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "don't know";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // let preciseInitNum = parseFloat(initNum.toFixed(5));
    // let preciseReturnNum = parseFloat(returnNum.toFixed(5));

    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;