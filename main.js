let quote = document.getElementById("quote");
let showQuote = document.getElementById("startQuiz");
let ca = document.getElementById("character-author");
let totalContainer = document.getElementById("total-container")
let next = document.getElementById('next-question')
let scoreBoard = document.getElementById("score-board")

// showQuote.addEventListener('click',() => {
//   cacheApi()
//   showQuote.setAttribute("hidden", "true")
//   next.removeAttribute("style")
// })

window.onload= cacheApi()



let animediv = document.getElementById("quote");

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

let count = 0
let score = 0

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
    return splicedArray
    // console.log(shuffleArray(splicedArray))
}



async function displayData () {
    splicedArray.forEach((x, index) => {
      console.log(splicedArray)
    const { author, quote } = x;
    displayQuote.push(quote);
    displayAuthor.push(author);
    // let test = shuffleArray(displayAuthor)
    // console.log(test)
    // console.log(quote)
    let div = document.createElement("div");
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
      score++
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
 
next.addEventListener("click", () => {
  let cQ = document.querySelectorAll(".characterQuote")
  let newList = splicedData()
  cQ.forEach((q, index) => {
    q.setAttribute("style", "background-color: white")
    q.removeAttribute('disabled')
    q.innerHTML = `${newList[index].quote}`
  })
  
  let auth = document.querySelectorAll(".author")
  auth.forEach((a, index) => {
    a.setAttribute("style", "background-color: white")
    a.removeAttribute('disabled')
    a.innerHTML = `${newList[index].author}`
  })
  count++
  if (count === 9) {
    // `<button><a href="./project.html">click here</a></button>`
    let displayScore = document.createElement('h1')
    displayScore.innerHTML = `You got a total of ${score} right! If youd like to retake the quiz go to the Home page up above to start again!`
    scoreBoard.appendChild(displayScore)
    next.setAttribute('hidden', "true")
    totalContainer.remove()
  }
})



//* add suffle array into the combined data 
//* append everthing at once 
//*get it so that only 5 quotes and authors appear on each round 
//*add in the checking functionality
// next button functional anbd brings next set of questions 
//track how many are right 


//*add score 
//*add feedback
//*style make buttons bigger make text bigger 
//*make responsive 
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


//*on click erase whats in dom 
//*append the next set of 5 top the dom
//


// *a score to be displayed
//*once the count reaches 9 disable next button 
//*display the score 

// screen laod thats sumamary/instructions
// add btn link to the project html
// have to have one named index.html