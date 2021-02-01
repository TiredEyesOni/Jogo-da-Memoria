const cardArray = [];  
const cardsWon = [];     
let cardsChosen = [];  
let cardsChosenId = []; 
let resultsArray = [];

const resultDisplay = document.querySelector("#result");  
const leaderboard = document.querySelector('#list');          
const grid = document.querySelector(".grid-container");   

for (let i = 0; i < 3; i++) {             
  cardArray.push(                        
    {                                     
      name: "bootstrap",
      img: "images/bootstrap.jpg",
    },
    {
      name: "css",
      img: "images/css.jpg",
    },
    {
      name: "html",
      img: "images/html.png",
    },
    {
      name: "javascript",
      img: "images/javascript.jpg",
    },
    {
      name: "python",
      img: "images/python.png",
    },
    {
      name: "visual_studio",
      img: "images/visual_studio.png",
    }
  );
}

cardArray.sort(() => 0.5 - Math.random());  


function createBoard() {
  let id = 0;                                                
  cardArray.forEach((card) => {                              
    let cardImage = document.createElement("img");           
    cardImage.setAttribute("src", "images/background.jpg");  
    cardImage.setAttribute("id", id);                        
    cardImage.addEventListener("click", flipCard);           
    grid.appendChild(cardImage);                             
    id++;                                                    
  });
}

function flipCard() {
  const cardId = this.getAttribute("id");                    
  cardsChosen.push(cardArray[cardId].name);                  
  cardsChosenId.push(cardId);                                 
  this.setAttribute("src", cardArray[cardId].img);                   
  if (cardsChosen.length == 3) {                             
    setTimeout(checkForMatch, 400);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");         
  const optionOneId = cardsChosenId[0];                      
  const optionTwoId = cardsChosenId[1];
  const optionThreeId = cardsChosenId[2];
  if (                                                      
    cardsChosen[0] === cardsChosen[1] &&
    cardsChosen[0] === cardsChosen[2] &&
    cardsChosen[1] === cardsChosen[2]
  ) {
    cardsWon.push(cardsChosen);
  } else {                                                   
    cards[optionOneId].setAttribute("src", "images/background.jpg");
    cards[optionTwoId].setAttribute("src", "images/background.jpg");
    cards[optionThreeId].setAttribute("src", "images/background.jpg");
  }

  cardsChosen = [];                                          
  cardsChosenId = [];
  resultDisplay.textContent = `Score: ${cardsWon.length}`;     
  if (cardsWon.length === cardArray.length / 3) {           
    resultDisplay.textContent = "You won the game!";          
    scoreLeaderboard();
  }
}

function scoreLeaderboard() {
  let player = prompt('What is your name?');
  resultsArray.push(player);
  localStorage.setItem('name', resultsArray);
  localStorage.setItem('score', cardsWon.length);
  addToLeaderboard();
}

function addToLeaderboard() {
  leaderboard.innerHTML = `<li>${localStorage.getItem('name')} - ${localStorage.getItem('score')}`
  console.log(localStorage);
}

function resetGame() {
  location.reload();
  scoreLeaderboard();
}

createBoard();
