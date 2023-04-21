// auto adjuste height of textarea
textarea = document.querySelector("#prompt");
textarea.addEventListener('input', autoResize, false);
    
function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

// make return in textarea to submit form
textarea.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    event.target.form.submit();
  }
});

// autoscroll to the end of page on load
window.onload = function() {
  window.scrollTo(0, document.body.scrollHeight);
}

const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', () => {
        fetch('/clear', {
            method: 'POST'
        })
        .then(chat => chat.text())
        .catch(error => console.error(error));
    });

const downloadLog = document.querySelector('#download');
downloadLog.addEventListener('click', () => {
        fetch('/download', {
            method: 'POST'
        })
        .then(chat => chat.text())
        .catch(error => console.error(error));
    });





  
