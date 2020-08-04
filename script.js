const authorText = document.getElementById('author');
const quoteText = document.getElementById('quote');

async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
    } catch(error) {
        getQuote();
        console.log('could not get it ' + error)
    }
}

getQuote()