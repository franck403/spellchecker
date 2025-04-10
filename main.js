function main() {
  const input = document.getElementById('value').value;
  const raw = window.checkText(input); // returns "text text texte|tete|jsp tex"

  const segments = raw.split('|');
  let resultHTML = '';

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];

    if (i === 0) {
      // First segment, no correction before it
      resultHTML += escapeHTML(seg);
    } else {
      // Extract the first word in this segment = corrected word
      const match = seg.match(/^(\S+)(.*)$/); // first word and the rest
      if (match) {
        const [_, word, rest] = match;
        resultHTML += `<span class="correction" data-tip="Check: '${word}'">${escapeHTML(word)}</span>`;
        resultHTML += escapeHTML(rest);
      } else {
        // fallback
        resultHTML += `<span class="correction" data-tip="Check: '?'>${escapeHTML(seg)}</span>`;
      }
    }
  }

  document.getElementById('result').innerHTML = resultHTML;
}

// Escape HTML to prevent injection
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
