class Deck {
    constructor(){
        this.deck = [];
        //create an array to contain the suits of the cards
        this.suits = ["spades ♠", "diamonds ♦", "clubs ♣", "hearts ♥"];
        //create an array to contain the values of the cards
        this.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];    
    }

    createDeck() {
        for(let i = 0; i < this.suits.length; i++){
            for(let x = 0; x < this.values.length; x++){
                let card = {Value: this.values[x], Suit: this.suits[i], Strength: x};
                this.deck.push(card);
            }
        }
    }

    shuffleDeck() {
        // for 1000 turns switch the values of two random cards
        for (let i = 0; i < 1000; i++)
        {
            let location1 = Math.floor((Math.random() * this.deck.length));
            let location2 = Math.floor((Math.random() * this.deck.length));
            //switches the card positions
            let tmp = this.deck[location1];
            this.deck[location1] = this.deck[location2];
            this.deck[location2] = tmp;
        }
    }

    removeCard() {
        return this.deck.pop();
    }
}

class Player{
    constructor(){
        this.score = 0;
        this.hand = [];
    }

    addPoint(){
        this.score++;
    }

    addCard(card){
        this.hand.push(card);
    }

    playCard(){
        return this.hand.pop();
    }

    shuffleHand() {
        // for 1000 turns switch the values of two random cards
        for (let i = 0; i < 1000; i++)
        {
            let location1 = Math.floor((Math.random() * this.hand.length));
            let location2 = Math.floor((Math.random() * this.hand.length));
            //switches the card positions
            let tmp = this.hand[location1];
            this.hand[location1] = this.hand[location2];
            this.hand[location2] = tmp;
        }
    }
}

class Game{
    constructor (){
        this.player1 = new Player;
        this.player2 = new Player;
    }

    playWar(){
        let deck = new Deck();
        deck.createDeck();
        deck.shuffleDeck();
        
        //takes a card from the deck and gives it to a player, in each loop two cards are removed from deck
        let halfDeckSize = deck.deck.length / 2; // half the deck size is needed to loop through
        for(let i = 0; i < halfDeckSize; i++){
            this.player1.addCard(deck.removeCard());
            this.player2.addCard(deck.removeCard());
        }
        
        this.player1.shuffleHand();//calls shuffle function to shuffle player1's cards
        this.player2.shuffleHand();//calls shuffle function to shuffle player2's cards

        console.log("Player 1 - Player 2");
        let plays = this.player1.hand.length; //number of plays if each deck has the same number of cards
        //check to make sure each deck is the same length
        if(this.player1.hand.length === this.player2.hand.length){
            //each round of the game is run by this loop
            for(let i = 0; i < plays; i++){
                console.log("\nRound " + (i + 1));
                console.log(`Player 1 -- ${this.player1.hand[i].Value} ${this.player1.hand[i].Suit}\nPlayer 2 -- ${this.player2.hand[i].Value} ${this.player2.hand[i].Suit}`);
                if(this.player1.hand[i].Strength < this.player2.hand[i].Strength){
                    console.log("player 2 wins round");
                    this.player2.addPoint();
                } else if (this.player1.hand[i].Strength > this.player2.hand[i].Strength){
                    console.log("player 1 wins round");
                    this.player1.addPoint();
                } else {
                    console.log("Tie Game");
                }
                console.log(`Score stands at ${this.player1.score} - ${this.player2.score}`);
            }
            //determines the winner of the game
            if(this.player1.score > this.player2.score){
                console.log(`\n\nPlayer 1 wins the game ${this.player1.score} to ${this.player2.score}.`)
            } else if (this.player1.score < this.player2.score){
                console.log(`\n\nPlayer 2 wins the game ${this.player1.score} to ${this.player2.score}.`)
            } else {
                console.log("\n\nNo one won... it was a tie game at " + this.player1.score);
            }
        } else {
            console.log("Players have different size of decks");
        }
    }
}

let newGame = new Game();
newGame.playWar();