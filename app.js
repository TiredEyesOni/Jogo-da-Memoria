document.addEventListener('DOMContentLoaded', () => {

    // Hides alert system
    $('#alertSystem').hide();
    
    // Array for storing cards name chosen by the player during game, max length = 2
    let cardsChosen = [];

    // Array for storing cards id chosen by the player during game, max length = 2
    let cardsChosenId = [];

    // For storing cards matched by the player
    const cardsWon = [];

    // Target div to show points obtained in the game
    const resultDisplay = document.querySelector('#result');

    // Create array of cards data
    const cardArray = [
        {
            name: 'joji1',
            img: 'images/joji1.jpg'
        },
        {
            name: 'joji1',
            img: 'images/joji1.jpg'
        },
        {
            name: 'joji2',
            img: 'images/joji7.jpg'
        },
        {
            name: 'joji2',
            img: 'images/joji7.jpg'
        },
        {
            name: 'joji3',
            img: 'images/joji3.jpg'
        },
        {
            name: 'joji3',
            img: 'images/joji3.jpg'
        },
        {
            name: 'joji4',
            img: 'images/joji4.jpg'
        },
        {
            name: 'joji4',
            img: 'images/joji4.jpg'
        },
        {
            name: 'joji5',
            img: 'images/joji5.jpg'
        },
        {
            name: 'joji5',
            img: 'images/joji5.jpg'
        },
        {
            name: 'joji6',
            img: 'images/joji6.jpg'
        },
        {
            name: 'joji6',
            img: 'images/joji6.jpg'
        },
    ]
    
    // For randomizing card location on each new game
    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid-container');

    // For showing messages to player using alerts
    function message(message){
        document.getElementById('alertMessage').textContent = message;
        $('#alertSystem').fadeTo(1, 1).show();
        setTimeout(function() {
            $("#alertSystem").fadeTo(500, 0).slideUp(500, function(){
                $(this).hide();
            });
        }, 3000);
    }

    // Creates game board
    function createBoard() {
        let id = 0;
        cardArray.forEach(card => {
            let cardImage = document.createElement('img');
            cardImage.setAttribute('src', 'images/blank.png');
            cardImage.setAttribute('data-id', id);
            cardImage.addEventListener('click', flipcard);
            grid.appendChild(cardImage);

            id++;
        })
    }
    
    // Flips a card
    function flipcard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length == 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // Checks if card matches
    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            message('You found a match!');
            //cards[optionOneId].setAttribute('src', 'images/white.png');
            //cards[optionTwoId].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            message('Cards do not match');
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'You won the game!';
        }
    }

    

    createBoard();
})