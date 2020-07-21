(function () {
    var dealButton = document.getElementById('deal');
    var hitButton = document.getElementById('hit');
    var standButton = document.getElementById('stand');
    var playAgainButton = document.getElementById('playAgain');
    var playerCards = document.getElementById('playerCards');
    var dealerCards = document.getElementById('dealerCards');
    var winnerDiv = document.getElementById('winner');

    var playerPoints = 0
    var dealerPoints = 0

    let deck = [
        '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
        '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
        '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
        '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
    ];

    deck.sort();
    console.log('sorted deck:', deck)

    let dealer = [];
    let player = [];

    //buttons

    dealButton.addEventListener('click', function () {
        deal();
    })

    hitButton.addEventListener('click', function () {
        hit();
    })

    standButton.addEventListener('click', function () {
        stand();
    })

    playAgainButton.addEventListener('click', function () {
        playAgain();
    })


    //deal function

    function deal() {
        deck = shuffle(deck);

        player.push(deck.shift());
        console.log(player);

        dealer.push(deck.shift());
        player.push(deck.shift());
        dealer.push(deck.shift());

        console.log(deck);
        console.log('player:', player);
        console.log('dealer:', dealer);

        showCardOnTable(player[0], playerCards, true);
        showCardOnTable(player[1], playerCards, true);

        showCardOnTable(dealer[0], dealerCards, true);
        showCardOnTable(dealer[1], dealerCards, false);

        hitButton.classList.remove("hidden")
        standButton.classList.remove("hidden")
        dealButton.classList.add("hidden")

        playerPoints = getHandValue(player)
        console.log("player", playerPoints)

        dealerPoints = getHandValue(dealer)
        console.log("dealer", dealerPoints)

        if (dealerPoints === 21 || playerPoints === 21) {
            var downCard = document.getElementById(dealer[1]);
            downCard.src = 'img/' + dealer[1] + '.png'
            showWinner();
        }

    }

    function hit(){
        player.push(deck.shift());
        console.log(player)
        showCardOnTable(player[player.length - 1], playerCards, true);
        playerPoints = getHandValue(player)

        if (playerPoints > 21) showWinner();
    }

    function stand() {
        var downCard = document.getElementById(dealer[1]);
        downCard.src = 'img/' + dealer[1] + '.png'

        hitButton.classList.add('hidden');
        standButton.classList.add('hidden')
        playAgainButton.classList.remove('hidden')

        while (dealerPoints < 17) {
            dealer.push(deck.shift());
            showCardOnTable(dealer[dealer.length - 1], dealerCards, true);
            dealerPoints = getHandValue(dealer);
        }

        playerPoints = getHandValue(player)
        console.log("player", playerPoints)

        dealerPoints = getHandValue(dealer)
        console.log("dealer", dealerPoints)
    
        showWinner();
    }


    function showWinner() {
        hitButton.classList.add('hidden');
        standButton.classList.add('hidden');

        winnerDiv.classList.remove("hidden");
        winnerDiv.classList.remove("alert-warning");
        winnerDiv.classList.remove("alert-success");
        winnerDiv.classList.remove("alert-danger");

        console.log(` dealer points : ${dealerPoints}  player points : ${playerPoints} `)

        if (dealerPoints === playerPoints) {
            winnerDiv.innerText = "It's a push!";
            winnerDiv.classList.add('alert-warning');
        }

        else if (dealerPoints > playerPoints) {
            if (dealerPoints > 21) {
                winnerDiv.innerText = 'Player Wins!';
                winnerDiv.classList.add('alert-success');
            }
            else {
                winnerDiv.innerText = 'Dealer Wins!';
                winnerDiv.classList.add('alert-danger');
            }

        }

        else {
            if (playerPoints === 21) {
                winnerDiv.innerText = 'Black Jack!';
                winnerDiv.classList.add('alert-success');
            }
            else if (playerPoints > 21) {
                winnerDiv.innerText = 'Dealer Wins!';
                winnerDiv.classList.add('alert-danger');

            }else{
                winnerDiv.innerText = 'Player Wins!';
                winnerDiv.classList.add('alert-success');
            }
        }
        playAgainButton.classList.remove("hidden")
    }

    function playAgain() {
        playerCards.innerHTML = '';
        dealerCards.innerHTML = '';

        player = [];
        dealer = [];
        playerPoints = 0;
        dealerPoints = 0;

        playAgainButton.classList.add("hidden")

        winnerDiv.classList.add('hidden');

        deal();
    }



    function showCardOnTable(card, cardsDiv, isFaceUp){

        var cardImage = document.createElement('img');

        cardImage.classList.add('card');
        cardImage.id = card

        if (isFaceUp) 
        {
            cardImage.src = 'img/' + card + '.png';
        }
        else
        {
            cardImage.src = 'img/back.png';
        }
        cardsDiv.appendChild(cardImage);
    }


    function getCardValue(card){
        switch (card[0]) 
        {
            case '1':
                return 10;
                break;
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return parseInt(card[0]);
                break;
            case 'J':
            case 'Q':
            case 'K':
                return 10;
                break;
            default:
                return 11;
                break;
        }
    }

    function getHandValue(hand) 
    {
        var total = 0;
        var nonAces = [];
        var aces = [];

        nonAces = hand.filter(function (card) 
        {
            return card[0] !== 'A';
        });

        aces = hand.filter(function (card) 
        {
            return card[0] === 'A';
        });

        nonAces.forEach(function (card) 
        {
            total += getCardValue(card);
        })

        aces.forEach(function (card) 
        {
            total += getCardValue(card);

            if (total > 21) total -= 10;
        })
        return total;
    }





    function shuffle()
     {

        
        // Source: https://bost.ocks.org/mike/shuffle/

        let array = [
            '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
            '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
            '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
            '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
        ];

        var m = array.length, t, i;

        
        while (m) 
        {

            
            i = Math.floor(Math.random() * m--);

            
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }


    

})();