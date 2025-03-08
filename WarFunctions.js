//create an array to contain the suits of the cards
let suits = ["spades ♠", "diamonds ♦", "clubs ♣", "hearts ♥"];
//create an array to contain the values of the cards
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//create an empty hand for player 1
let player1 = [];
//create an empty hand for player 2
let player2 = [];
//start player 1 score at 0
let player1Score = 0;
//start player 2 score at 0
let player2Score = 0;

//create a deck of cards containing all the suits and values
//assign each card a strength with A at 0, 2 at 1, ...., Queen at 11, and King at 12
function getDeck(){
    let deck = [];
    for(let i = 0; i < suits.length; i++){
        for(let x = 0; x < values.length; x++){
            let card = {Value: values[x], Suit: suits[i], Strength: x};
            deck.push(card);
        }
    }
    return deck;
}


//shuffle a deck by switching the position of the cards 
function shuffle(deck)
{
	// for 1000 turns switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		//switches the card positions
        let tmp = deck[location1];
		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

//takes a card from the deck and gives it to a player, in each loop two cards are removed from deck
function dealDeck(deck){
    let halfDeckSize = deck.length / 2; // half the deck size is needed to loop through
    for(let i = 0; i < halfDeckSize; i++){
        player1.push(deck.pop());
        player2.push(deck.pop());
    }
    shuffle(player1);//calls shuffle function to shuffle player1's cards
    shuffle(player2);//calls shuffle function to shuffle player2's cards
}

//play a game of war calling player1's and player2's deck
function playWar(firstPlayer, secondPlayer){
    console.log("Player 1 - Player 2");
    let plays = firstPlayer.length; //number of plays if each deck has the same number of cards
    //check to make sure each deck is the same length
    if(firstPlayer.length === secondPlayer.length){
        //each round of the game is run by this loop
        for(let i = 0; i < plays; i++){
            console.log("\nRound " + (i + 1));
            console.log(`Player 1 -- ${firstPlayer[i].Value} ${firstPlayer[i].Suit}\nPlayer 2 -- ${secondPlayer[i].Value} ${secondPlayer[i].Suit}`);
            if(firstPlayer[i].Strength < secondPlayer[i].Strength){
                console.log("player 2 wins round");
                player2Score++;
            } else if (firstPlayer[i].Strength > secondPlayer[i].Strength){
                console.log("player 1 wins round");
                player1Score++;
            } else {
                console.log("Tie Game");
            }
            console.log(`Score stands at ${player1Score} - ${player2Score}`);
        }
        //determines the winner of the game
        if(player1Score > player2Score){
            console.log(`\n\nPlayer 1 wins the game ${player1Score} to ${player2Score}.`)
        } else if (player1Score < player2Score){
            console.log(`\n\nPlayer 2 wins the game ${player1Score} to ${player2Score}.`)
        } else {
            console.log("\n\nNo one won... it was a tie game at " + player1Score);
        }
    } else {
        console.log("Players have different size of decks");
    }

}

let newDeck = getDeck();//calls function to create a new deck of 52 cards
shuffle(newDeck);//calls function to shuffle the new deck
dealDeck(newDeck);//calls function to deal the deck to 2 players
playWar(player1, player2);//call function to play a gam of war
