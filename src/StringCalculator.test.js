const StringCalculator = require("./StringCalculator");

describe("StringCalculator", () => {
  let calculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  describe("add method", () => {
    // Step 1: The simplest thing - empty string returns 0
    test("should return 0 for empty string", () => {
      expect(calculator.add("")).toBe(0);
    });

    // Step 2: Single number
    test("should return the number for single number", () => {
      expect(calculator.add("1")).toBe(1);
      expect(calculator.add("2")).toBe(2);
    });

    // Step 3: Two numbers separated by comma
    test("should return sum of two numbers separated by comma", () => {
      expect(calculator.add("1,2")).toBe(3);
      expect(calculator.add("5,3")).toBe(8);
    });

    // Step 4: Multiple numbers
    test("should return sum of multiple numbers", () => {
      expect(calculator.add("1,2,3")).toBe(6);
      expect(calculator.add("1,2,3,4,5")).toBe(15);
    });

    // Step 5: Handle new lines between numbers
    test("should handle new lines between numbers", () => {
      expect(calculator.add("1\n2,3")).toBe(6);
      expect(calculator.add("1\n2\n3")).toBe(6);
    });

    // Step 6: Support different delimiters
    test("should support different delimiters", () => {
      expect(calculator.add("//;\n1;2")).toBe(3);
      expect(calculator.add("//|\n1|2|3")).toBe(6);
    });

    // Step 7: Throw exception for negative numbers
    test("should throw exception for negative numbers", () => {
      expect(() => calculator.add("-1,2")).toThrow("negatives not allowed: -1");
      expect(() => calculator.add("2,-4,3,-5")).toThrow(
        "negatives not allowed: -4,-5"
      );
    });

    // Step 8: Ignore numbers bigger than 1000
    test("should ignore numbers bigger than 1000", () => {
      expect(calculator.add("2,1001")).toBe(2);
      expect(calculator.add("1,2,1000,3,2000")).toBe(1006);
    });

    // Step 9: Support delimiters of any length
    test("should support delimiters of any length", () => {
      expect(calculator.add("//[***]\n1***2***3")).toBe(6);
      expect(calculator.add("//[delimiter]\n1delimiter2delimiter3")).toBe(6);
    });

    // Step 10: Support multiple delimiters
    test("should support multiple delimiters", () => {
      expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
      expect(calculator.add("//[***][%%%]\n1***2%%%3")).toBe(6);
    });
  });
});
