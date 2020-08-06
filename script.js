//get elements
const authorText = document.getElementById('author');
const quoteText = document.getElementById('quote');
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container')

//functions for loader
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//function to fetch quotes
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'    
        } else {
        authorText.innerText = data.quoteAuthor;
          }

        if(data.quoteText.length > 50) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
        //throw new Error('err')
    } catch(error) {
        getQuote();
        let count = 0;
        if(error) {
            return function() {
            count ++;
            return count;
            }
        }
        console.log('could not get it ' + error + count)
    }
}
//add event listener to button
newQuoteBtn.addEventListener('click', getQuote)

getQuote()