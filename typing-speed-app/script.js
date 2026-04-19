const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const actionBtn = document.getElementById('action-btn');
const wpmDisplay = document.getElementById('wpm');
const timerDisplay = document.getElementById('timer');

let timer = 0;
let interval = null;
let isRunning = false;

const quotes = [
    "The only way to do great work is to love what you do.",
    "Intelligence is the ability to adapt to change.",
    "Code is like humor. When you have to explain it, it is bad.",
    "Simplicity is the soul of efficiency.",
    "First, solve the problem. Then, write the code."
];

function startTest() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = '';
    
    // Create spans for each character
    randomQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });

    quoteInput.value = '';
    quoteInput.disabled = false;
    quoteInput.focus();
    
    timer = 0;
    isRunning = true;
    actionBtn.innerText = "Reset Test";
    
    clearInterval(interval);
    interval = setInterval(() => {
        timer++;
        timerDisplay.innerText = timer + "s";
    }, 1000);
}

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');
    let allCorrect = true;

    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index];
        if (char == null) {
            charSpan.classList.remove('correct', 'incorrect');
            allCorrect = false;
        } else if (char === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
            allCorrect = false;
        }
    });

    if (allCorrect) finishTest();
});

function finishTest() {
    clearInterval(interval);
    const wordCount = quoteDisplay.innerText.split(' ').length;
    const wpm = Math.round((wordCount / timer) * 60);
    wpmDisplay.innerText = wpm;
    quoteInput.disabled = true;
    isRunning = false;
}

actionBtn.addEventListener('click', () => {
    if (isRunning) {
        location.reload(); // Simple reset
    } else {
        startTest();
    }
});