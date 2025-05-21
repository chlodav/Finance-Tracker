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
const chartText = document.getElementById("chart-text");
const chartSegment = document.querySelector(".donut-segment");
const chartSegment2 = document.querySelector(".donut-segment2");

function renderTransactions(dateStr) {
  transactionsContainer.innerHTML = ""; // clear old

  const date = new Date(dateStr);
  const options = { year: "numeric", month: "long", day: "numeric" };
  spentTitle.textContent = `Spent on ${date.toLocaleDateString(undefined, options)}`;

  const transactions = transactionsData[dateStr] || [];

  if (transactions.length === 0) {
    transactionsContainer.innerHTML = `<div class="transaction"><em>No transactions</em></div>`;
    updateChart(0);
    return;
  }

  // Show each transaction
  transactions.forEach(({ amount, category }) => {
    const div = document.createElement("div");
    div.className = "transaction";
    div.innerHTML = `<span>${amount.toFixed(2)}</span><span>${category}</span>`;
    transactionsContainer.appendChild(div);
  });

  // Sum spent (negative amounts)
  const spentSum = transactions.reduce((sum, t) => sum + (t.amount < 0 ? -t.amount : 0), 0);
  updateChart(spentSum);
}

// Update donut chart based on spent amount out of a budget (say 200)
function updateChart(spent) {
  const budget = 200;
  let percent = Math.min((spent / budget) * 100, 100);

  chartText.textContent = `${percent.toFixed(0)}% Spent`;

  const dash1 = (percent / 100) * 100;
  const dash2 = 100 - dash1;

  chartSegment.setAttribute("stroke-dasharray", `${dash1} ${dash2}`);
  chartSegment2.setAttribute("stroke-dashoffset", dash1);
}

// Set initial date to default May 1, 2025
dateInput.value = "2025-05-01";
renderTransactions(dateInput.value);

dateInput.addEventListener("change", (e) => {
  renderTransactions(e.target.value);
});

document.getElementById("walletBtn").addEventListener("click", () => {
  alert("Opening your wallet... (well, not really, but soon!)");
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const searchTerm = prompt("Search transactions (try 'Groceries'):");
  if (!searchTerm) return;

  const results = [];
  for (const [date, transactions] of Object.entries(transactionsData)) {
    transactions.forEach(({ amount, category }) => {
      if (category.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({ date, amount, category });
      }
    });
  }

  if (results.length === 0) {
    alert(`No transactions found for "${searchTerm}". Try again!`);
  } else {
    alert(
      `Found ${results.length} result(s):\n` +
        results
          .map(
            (r) =>
              `${new Date(r.date).toLocaleDateString()}: ${r.category} (${r.amount.toFixed(2)})`
          )
          .join("\n")
    );
  }
});

// Fun click on chart to reset budget spent to 0
document.getElementById("chart").addEventListener("click", () => {
  alert("Resetting spent amount to 0 for fun!");
  updateChart(0);
});
