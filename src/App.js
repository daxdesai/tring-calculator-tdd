import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
// String Calculator implementation

/**
 * Adds numbers in a string, separated by commas or newlines.
 * Returns their sum.
 * If the string is empty, returns 0.
 * Throws an error if negative numbers are present.
 * Ignores numbers greater than 1000.
 * Supports custom delimiters in the format: "//[delimiter]\n[numbers...]"
 */
export function add(numbers) {
  if (numbers === "") return 0;

  let delimiters = [",", "\n"];
  let nums = numbers;

  // Check for custom delimiter
  if (nums.startsWith("//")) {
    const delimiterSection = nums.match(/^\/\/(\[.*\]|.)\n/);
    if (delimiterSection) {
      let delimiterPart = delimiterSection[1];
      if (delimiterPart.startsWith("[") && delimiterPart.endsWith("]")) {
        // Multiple or multi-char delimiters
        const delimiterMatches = delimiterPart.match(/\[([^\]]+)\]/g);
        delimiters = delimiterMatches.map((d) => d.slice(1, -1));
      } else {
        delimiters = [delimiterPart];
      }
      nums = nums.slice(delimiterSection[0].length);
    }
  }

  // Build regex for splitting
  const splitRegex = new RegExp(
    delimiters.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
  );
  const numList = nums
    .split(splitRegex)
    .filter((s) => s.length > 0)
    .map(Number);

  const negatives = numList.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error("Negatives not allowed: " + negatives.join(","));
  }

  return numList.filter((n) => n <= 1000).reduce((sum, n) => sum + n, 0);
}
