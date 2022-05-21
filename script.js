// Initial Data
const quoteContainer = document.getElementById('quote-container');
const quoteField = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];

// Functions
function showQuoteInDom(randomQuote) {
    quoteField.innerText = randomQuote.text;
    
    randomQuote.author === null ? quoteAuthor.innerText = 'Unknown' : quoteAuthor.innerText = randomQuote.author;
}

function tweetQuote() {
    twitterUrl = `https://twitter.com/intent/tweet?text=${quoteField.innerText} - ${quoteAuthor.innerText}`;

    window.open(twitterUrl);
}

function loadingScreen() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function screenLoaded() {
    quoteContainer.hidden = false;;
    loader.hidden = true;
}

// Fetch API
async function getQuotesFromAPI() {
    loadingScreen();
    try {
        const response = await fetch('https://type.fit/api/quotes')
        const quotes = await response.json();
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        showQuoteInDom(randomQuote);


    } catch (error) {
        showQuoteInDom();
    }
    screenLoaded();
}

// Event Listeners
newQuoteBtn.addEventListener('click', () => {
    getQuotesFromAPI();
});

twitterBtn.addEventListener('click', (e) => {
    tweetQuote();
});

getQuotesFromAPI();
setInterval(getQuotesFromAPI, 10000);