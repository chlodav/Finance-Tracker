// Sample transactions data keyed by date (YYYY-MM-DD)
const transactionsData = {
  "2025-05-01": [
    { amount: -100.0, category: "Groceries" },
    { amount: -2.9, category: "TFL" },
    { amount: -10.0, category: "Post Office" },
  ],
  "2025-05-02": [],
  "2025-05-03": [],
  // Add more dates and data as needed
};

const transactionsContainer = document.getElementById("transactions-container");
const spentTitle = document.getElementById("spent-title");
const dateInput = document.getElementById("dateInput");
const pieElement = document.querySelector(".pieID.pie");
const legendElement = document.querySelector(".pieID.legend");

// Helper: calculate slice size (degrees)
function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}

// Add one slice to pie
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
  const slice = document.createElement("div");
  slice.className = `slice ${sliceID}`;
  slice.style.transform = `rotate(${offset - 1}deg) translate3d(0,0,0)`;

  const span = document.createElement("span");
  span.style.transform = `rotate(${sliceSize - 179}deg) translate3d(0,0,0)`;
  span.style.backgroundColor = color;

  slice.appendChild(span);
  pieElement.appendChild(slice);
}

// Recursively split slice if > 179 degrees (CSS clip limitation)
function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCoun
