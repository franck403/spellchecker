function main() {
    const input = document.getElementById('value').value;
    const html = window.checkText(input); // already returns HTML
    document.getElementById('result').innerHTML = html;
}
