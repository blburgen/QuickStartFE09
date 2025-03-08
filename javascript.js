let suits = ["spades ♠", "diamonds ♦", "clubs ♣", "hearts ♥"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let player1 = [];
let player2 = [];
let player1Score = 0;
let player2Score = 0;

function getDeck(){
    let deck = [];
    for(let i = 0; i < suits.length; i++){
        for(let x = 0; x < values.length; x++){
            let card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

function dealDeck(deck){
    for(let i = 0; i < 52/2; i++){
        player1.push(deck.pop());
        player2.push(deck.pop());
    }
}

function playWar(firstPlayer, secondPlayer){
    console.log("Player 1 / Player 2");
    let plays = firstPlayer.length
    if(firstPlayer.length === secondPlayer.length){
        for(let i = 0; i < plays; i++){
            console.log("\nRound " + (i + 1));
            console.log(firstPlayer[i].Value + " " + firstPlayer[i].Suit + " // " + secondPlayer[i].Value + " " + secondPlayer[i].Suit);
            if(firstPlayer[i].Value < secondPlayer[i].Value){
                console.log("player 2 wins round");
                player2Score++;
            } else if (firstPlayer[i].Value > secondPlayer[i].Value){
                console.log("player 1 wins round");
                player1Score++;
            } else {
                console.log("Tie Game");
            }
            console.log(`Score stands at ${player1Score} - ${player2Score}`);
        }
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

let newDeck = getDeck()
shuffle(newDeck);
dealDeck(newDeck)
playWar(player1, player2);
