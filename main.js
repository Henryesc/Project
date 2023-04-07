let quote = document.getElementById("quote");
let showQuote = document.getElementById("startQuiz");
let ca = document.getElementById("character-author");

showQuote.addEventListener('click', cacheApi)

// const _breakingBadArray = await getBreakingBad;
// const _gameOfThronesArray = await getGameOfThrones;

let displayQuote = [];
let displayAuthor = [];
let selectedID = []
let author = []
let quoteIndex = []
let authorIndex = []

let breakingBadArray;
let gameOfThronesArray; 
let GoTFormatted;
let shuffledArray;
let splicedArray;


//slicing is non mutating while splicing is mutating 
//splicing cut off section of an array 

async function cacheApi() {
    await getBreakingBad();
    await formatGameOfThrones();
    await splicedData();
    await displayData();
}


async function getBreakingBad() {
    const request = await fetch("https://api.breakingbadquotes.xyz/v1/quotes/80");
    const response = await request.json();
    breakingBadArray = response;
}


async function getGameOfThrones() {
    const request = await fetch("https://api.gameofthronesquotes.xyz/v1/random/80");
    const response = await request.json();
    return response
}

async function formatGameOfThrones () {
    gameOfThronesArray = await getGameOfThrones ()
    GoTFormatted = gameOfThronesArray.map(QuoteAuthor => {
        return {
            author: QuoteAuthor.character.name,
            quote: QuoteAuthor.sentence,
        }
    })
}


function combineData () {
    const combinedArray = breakingBadArray.concat(GoTFormatted);
    shuffledArray = shuffleArray([...combinedArray])
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function splicedData () {
    combineData()
    shuffledArray.forEach(() => {
    rounds =  shuffledArray.splice(Math.floor(Math.random()*shuffledArray.length),5);
    splicedArray = rounds
    });
    console.log(shuffleArray(splicedArray))
}


async function displayData () {
    splicedArray.forEach((x, index) => {
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
  

//* add suffle array into the combined data 
//* append everthing at once 
//*get it so that only 5 quotes and authors appear on each round 
//*add in the checking functionality
// next button functional anbd brings next set of questions 
//track how many are right 


//add score 
//add feedback
//style make buttons bigger make text bigger 
//make responsive 
//put the buttons above the container 
//add instructions 
//get rid of the black line 
// add images of chatcers 


//later on 
//nav bar 
//add about page
// shuffling buttons 
//add footer 
//