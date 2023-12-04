let jacekSum = 0;
let playerSum = 0;

let jacekAceCount = 0;
let playerAceCount = 0; 

let hidden;
let deck;

let backgrounds = ["bg1.jpg","bg2.jpg","bg3.jpg","bg4.jpg"]

let canHit = true; 

let jacek = 21;

changeBackgroudImage()


// dodać usuwanie 


window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["0","A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }
    // console.log(deck);
}
// jacek-sum

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    jacekSum += getValue(hidden);
    jacekAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(jacekSum);
    while (jacekSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".jpg";
        jacekSum += getValue(card);
        jacekAceCount += checkAce(card);
        document.getElementById("jacek-cards").append(cardImg);
    }

    

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".jpg";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    
    
    }

    console.log(playerSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

    // document.getElementById("jacek-sum").innerText = jacekSum;
    // document.getElementById("player-sum").innerText = playerSum;

}
function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".jpg";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);
    if (reduceAce(playerSum, playerAceCount) > jacek) {
        canHit = false;
    } 
    
    //A, J, 8->1 + 10+8
    // document.getElementById("jacek-sum").innerHTML = jacekSum;
    // document.getElementById("player-sum").innerHTML = playerSum;

}



function stay() {
    jacekSum = reduceAce(jacekSum, jacekAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".jpg";

    let message = "";
    if (playerSum > jacek ) {
        message = "Przegrałeś!";
        document.getElementById("board").style.background = "rgba(179, 0, 0, 0.5)";
    }
    else if (jacekSum > jacek ) {
        message = "Wygrałeś!";
        document.getElementById("board").style.background = "rgba(0, 18, 179, 0.5)";
    }
    // else if (playerSum == jacekSum) {
    //    component = jacekSum
  //  }

    else if (playerSum == jacekSum) {
        message = "Remis!";
    }
    else if (playerSum > jacekSum) {
        message = "Wygrałeś!";
        document.getElementById("board").style.background = "rgba(0, 18, 179, 0.5)";
    }
    else if (playerSum < jacekSum) {
        message = "Przegrałeś!";
        document.getElementById("board").style.background = "rgba(179, 0, 0, 0.5)";
    }

    document.getElementById("jacek-sum").innerHTML = jacekSum;
    document.getElementById("player-sum").innerHTML = playerSum;

    document.getElementById("stay").style.visibility = "hidden";
    document.getElementById("hit").style.visibility = "hidden";
    document.getElementById("new_game").style.visibility = "visible";

    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];
    let color = data[1];

    if(value=="0"){
        // if (isNaN(value)) { //A J Q K
        //     if (value == "A") {
        //         return -11;
        //     }
        //     return -10;
        // }
        return parseInt(-1*6);

    }else{
        if (isNaN(value)) { 
            if (value == "A") {
                return 11;
            }
            else if (value == "K") {
                return 4;
            }
            else if (value == "Q") {
                return 3;
            }
            else if (value == "J") {
                return 2;
            }
            else{
                return 10;

            }
        }
        return parseInt(value);
    }
}

function checkAce(card) {
    if (card[0] == "A") {
        return 11;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > jacek && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function changeBackgroudImage(){
    let r = Math.floor(Math.random() * backgrounds.length);

    document.getElementById("background").style.backgroundImage = "url('./graphics/"+backgrounds[r] +" ')"
}