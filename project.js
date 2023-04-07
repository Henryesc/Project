let quote = document.getElementById("quote");
let showQuote = document.getElementById("startQuiz");
let ca = document.getElementById("character-author");

// ('https://api.gameofthronesquotes.xyz/v1/random/5')
// ("https://api.breakingbadquotes.xyz/v1/quotes/5")

showQuote.addEventListener('click', cacheApi)
// showQuote.addEventListener('click', caniDisplayQuotes)

// window.onload = cacheApi();

let breakingbad = [];
let displayQuote = [];
let displayAuthor = [];
let showArray = [];
let selectedID = []
let author = []
let authorsArray = []
let quoteIndex = []
let authorIndex = []
let score = 0
let characterQuotesArray = []
let breakingBadFetch = []
console.log(breakingBadFetch)

async function cacheApi() {
  const anime = await getAnimeQuotes();
  const show = await getShowQuotes();
}

/**
 * It fetches the data from the API, then creates a button for each quote, and adds an event listener
 * to each button.
 */
async function getAnimeQuotes() {
  const request = await fetch("https://api.breakingbadquotes.xyz/v1/quotes/25");
  const quotes = await request.json();
  console.log(quotes)
  breakingBadFetch.push(quotes)
  /* Looping through an array of quotes and for each quote, it is destructuring the `author` and
  `quote` properties from the current element `x` and assigning them to variables `author` and
  `quote`. It also uses the `index` parameter to create a unique name for each button element. */
  quotes.forEach((x, index) => {
      const { author, quote } = x;
      displayQuote.push(quote);
      displayAuthor.push(author);
      let div = document.createElement("div");
      let animediv = document.getElementById("quote");
      div.innerHTML = `<button class = "characterQuote" id=${author} name = "quote-${index}">${quote}</button>`;
      animediv.appendChild(div);
      let div1 = document.createElement("div");
      let authorlen = author.length
      if (x.author !== "" && authorlen < 25) {
          div1.innerHTML = `<button class = "author" id = ${author} name = "author-${index}">${x.author}</button>`;
          ca.appendChild(div1);
        }
      });

      characterQuotesArray = document.querySelectorAll(".characterQuote")
      characterQuotesArray.forEach(characterQuoteBtn => {
        characterQuoteBtn.addEventListener('click', () => {
          selectedID = characterQuoteBtn.id
          quoteIndex = characterQuoteBtn.name
          let isCorrect = checkAnswer()
          updateDisplay(isCorrect)
        })
        
  })

  authorsArray = document.querySelectorAll(".author")
  authorsArray.forEach(authorBtn => {
    authorBtn.addEventListener('click', () => {
      author = authorBtn.id
      authorIndex = authorBtn.name
      let isCorrect = checkAnswer()
      updateDisplay(isCorrect)
    })
  })
}

async function getShowQuotes() {
  const request = await fetch(
    "https://api.gameofthronesquotes.xyz/v1/random/25"
    );
    const response = await request.json();
  response.forEach((x, index) => {
    // const { quote, author, series } = x;
    // console.log(sentence)
    // console.log(character)
    // const {sentence} = x;
    // const {name, slug, house} = character
    // const {name, slug, house} = x.character
    // displayQuote.push(quote.quote);
    // displayAuthor.push(author.author);
    let quote = x.sentence
    let author = x.character.name
    displayQuote.push(quote);
    displayAuthor.push(author);
    let div = document.createElement("div");
    let animediv = document.getElementById("quote");
    div.innerHTML = `<button class = "characterQuote" id=${author} name = "quote-${index}">${quote}</button>`;
    animediv.appendChild(div);
    let div1 = document.createElement("div");
    let authorlen = author.length
    if (author !== "" && authorlen < 25) {
      div1.innerHTML = `<button class = "author" id = ${author} name = "author-${index}">${author}</button>`;
      ca.appendChild(div1);
    }
  });
  characterQuotesArray = document.querySelectorAll(".characterQuote")
  characterQuotesArray.forEach(characterQuoteBtn => {
    characterQuoteBtn.addEventListener('click', () => {
    selectedID = characterQuoteBtn.id
    quoteIndex = characterQuoteBtn.name
    let isCorrect = checkAnswer()
    updateDisplay(isCorrect)
   })
   
  })
  authorsArray = document.querySelectorAll(".author")
  authorsArray.forEach(authorBtn => {
    authorBtn.addEventListener('click', () => {
      author = authorBtn.id
      authorIndex = authorBtn.name
      let isCorrect = checkAnswer()
      updateDisplay(isCorrect)
    })
  })
}



// function caniDisplayQuotes() {
//   breakingBadFetch.forEach((x, index) => {
//     // const { author, quote } = x;
//     let author = x.author
//     let quote = x.quote
//     displayQuote.push(quote);
//     displayAuthor.push(author);
//     let div = document.createElement("div");
//     let animediv = document.getElementById("quote");
//     div.innerHTML = `<button class = "characterQuote" id=${author} name = "quote-${index}">${quote}</button>`;
//     animediv.appendChild(div);
//     let div1 = document.createElement("div");
//     // let authorlen = x.author.length
//     // if (x.author !== "" && authorlen < 25) {
//       div1.innerHTML = `<button class = "author" id = ${author} name = "author-${index}">${author}</button>`;
//       ca.appendChild(div1);
//     }
//   );
// }

function checkAnswer() {
  if (selectedID.length !== 0 && author.length !== 0) {
    if ( selectedID == author){
      selectedID = []
      author = []
      return true
    } else {
      selectedID = []
      author = []
      return false
    }
  }
} 


function updateDisplay(isCorrect) {
  let selectedQuote = document.getElementsByName(`${quoteIndex}`)
  let authorBtn = document.getElementsByName(`${authorIndex}`)
  if (isCorrect === true){
    selectedQuote[0].style.backgroundColor = 'green'
    authorBtn[0].style.backgroundColor = 'green'
    authorBtn[0].disabled = true
    selectedQuote[0].disabled = true
    quoteIndex = []
    authorIndex = []
    
  }

  else if (isCorrect === false){
    selectedQuote[0].style.backgroundColor = 'crimson'
    authorBtn[0].style.backgroundColor = 'crimson'
    authorBtn[0].disabled = true
    selectedQuote[0].disabled = true
    quoteIndex = []
    authorIndex = []
  }
}
