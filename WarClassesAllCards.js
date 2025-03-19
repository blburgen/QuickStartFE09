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
        this.hand.unshift(card);
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
        let i = 1;
        let player1Play = [];
        let player2Play = [];
        let resultTest = document.getElementById("results");
        let result = "";
        while(this.player1.hand.length > 0 && this.player2.hand.length > 0){
            // console.log("\nRound " + (i));
            result += "<p>Round " + i++ + "<\p>";
            player1Play.unshift(this.player1.playCard());
            player2Play.unshift(this.player2.playCard());
            // console.log(`Player 1 -- ${player1Play[0].Value} ${player1Play[0].Suit}\nPlayer 2 -- ${player2Play[0].Value} ${player2Play[0].Suit}`);
            result += "<p>Player 1 -- " + player1Play[0].Value + " " + player1Play[0].Suit + "<\p>"; 
            result += "<p>Player 2 -- " + player2Play[0].Value + " " + player2Play[0].Suit + "<\p>";
            
            if(player1Play[0].Strength < player2Play[0].Strength){
                // console.log("player 2 wins round");
                result += "<p>player 2 wins round<\p>";
                this.player2.addPoint();
                while(player1Play.length > 0 && player2Play.length > 0){
                    this.player2.addCard(player2Play.pop());
                    this.player2.addCard(player1Play.pop());
                }
            } else if (player1Play[0].Strength > player2Play[0].Strength){
                // console.log("player 1 wins round");
                result +=  "<p>player 1 wins round<\p>";
                this.player1.addPoint();
                while(player1Play.length > 0 && player2Play.length > 0){
                    this.player1.addCard(player1Play.pop());
                    this.player1.addCard(player2Play.pop());
                }
            } else {
                // console.log("Tie Game");
                result +=  "<p>Tie Game<\p>";
                player1Play.unshift(this.player1.playCard());
                player2Play.unshift(this.player2.playCard());
            }
            // console.log(`Score stands at ${this.player1.score} - ${this.player2.score}`);
            result += `<p>Score stands at ${this.player1.score} - ${this.player2.score}<\p><br>`;
        }
        resultTest.innerHTML = result;
        //determines the winner of the game
        const winner = document.getElementById("winner");
        winner.innerHTML = "<p style='text-align: center'>" + --i + " rounds were played</p>"
        if(this.player1.hand.length === 0){
            // console.log(`\n\nPlayer 1 has run out of cards.\n\nPlayer 2 wins the game ${this.player1.score} to ${this.player2.score}.`);
            winner.innerHTML += `<p style='text-align: center'>Player 1 has run out of cards.  Player 2 wins the game ${this.player1.score} to ${this.player2.score}.<\p>`;
        } else if (this.player2.hand.length === 0) {
            // console.log(`\n\nPlayer 2 has run out of cards.\n\nPlayer 1 wins the game ${this.player1.score} to ${this.player2.score}.`);
            winner.innerHTML += `<p style='text-align: center'>Player 2 has run out of cards.   Player 1 wins the game ${this.player1.score} to ${this.player2.score}.<\p>`;
        } else {
            winner.innerHTML += `The Score stands at ${this.player1.score} to ${this.player2.score}.`
        }
    }
}
let newBtn = document.getElementById("newGame");
newBtn.addEventListener("click", () => {let newGame = new Game();
    newGame.playWar();})
