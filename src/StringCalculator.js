class StringCalculator {
  add(numbers) {
    if (numbers === "") {
      return 0;
    }

    let delimiters = [",", "\n"];
    let numString = numbers;

    // Handle custom delimiters
    if (numbers.startsWith("//")) {
      const delimiterSection = numbers.match(/^\/\/(.*)\n/)[1];
      numString = numbers.split("\n")[1];
      if (delimiterSection.startsWith("[")) {
        // Multiple or long delimiters
        const delimiterMatches = delimiterSection.match(/\[(.*?)\]/g);
        delimiters = delimiterMatches.map((d) => d.slice(1, -1));
      } else {
        // Single character delimiter
        delimiters.push(delimiterSection);
      }
    }

    // Build regex for split
    const splitRegex = new RegExp(
      delimiters.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
    );
    const nums = numString
      .split(splitRegex)
      .filter((x) => x.length > 0)
      .map(Number);

    // Throw for negatives
    const negatives = nums.filter((n) => n < 0);
    if (negatives.length > 0) {
      throw new Error(`negatives not allowed: ${negatives.join(",")}`);
    }

    // Ignore > 1000
    return nums.filter((n) => n <= 1000).reduce((sum, n) => sum + n, 0);
  }
}

module.exports = StringCalculator;
