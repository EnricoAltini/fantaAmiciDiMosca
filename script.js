let currentValue = 0;
let countdown = 30;
let lastBidder = "Nessuno";

function placeBid() {
  if (countdown > 0) {
    const participantName = document.getElementById("participantName").value;
    if (participantName) {
      currentValue += 5;
      lastBidder = participantName;
      document.getElementById("currentValue").textContent = currentValue;
      document.getElementById("lastBidder").textContent = participantName;
    }
  }
}

function updateCountdown() {
  const timeElement = document.getElementById("time");
  if (countdown > 0) {
    countdown--;
    timeElement.textContent = countdown;
    setTimeout(updateCountdown, 1000);
  } else {
    timeElement.textContent = "Tempo scaduto";
    document.getElementById("bidButton").disabled = true;
  }
}

updateCountdown();
