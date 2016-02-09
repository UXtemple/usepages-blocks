let clipboardText = null;

document.addEventListener('copy', ev => {
  if (clipboardText) {
    ev.preventDefault();
    ev.clipboardData.setData('text/plain', clipboardText);
    clipboardText = null;
  }
});

export default function copyToClipboard(text) {
  clipboardText = text;
  document.execCommand('copy');
}
