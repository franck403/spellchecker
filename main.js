function main() {
  const input = document.getElementById('value').value;
  const raw = window.checkText(input); // returns string like: "text text texte|tete|jsp tex"

  const parts = raw.split('|');

  let resultHTML = '';
  for (let i = 0; i < parts.length; i++) {
    // Add normal text
    resultHTML += escapeHTML(parts[i]);

    // If not the last part, add a correction span
    if (i < parts.length - 1) {
      const correction = parts[i].split(' ').pop(); // get the last word (assume it's the corrected one)
      resultHTML += `<span class="correction" data-tip="Check: '${correction}'">${correction}</span>`;
    }
  }

  document.getElementById('result').innerHTML = resultHTML;
}

// Prevent HTML injection
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
