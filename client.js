// image for the back of any card
var backOfCard = "soap.png";

/**  number of unique cards in the game; value from localStorage
 */
var numOfUniqueCards = localStorage.getItem("numOfUniqueCards");

// mini cycle in the game - clicking and showing two cards,
// then having them either stay shown (when they match) or turned back again
// num of cards in the cycle; can be 0, 1 or 2
var numOfCardsShown = 0;
// total number of cards that have shown - to display in the counter
var totalCardsShown = 0;
// in a mini cycle, the first card can be null, or the first card
var firstCard;

// array that holds all gifs
var gifs = [];
for (var i = 0; i < numOfUniqueCards; i++) {
  gifs.push("gifs/bloom" + i + ".gif");
}
// double gifs array size
gifs = gifs.concat(gifs);

// use the array randomizedIndices to randomize the indices of gifs
// for example randomizedIndices may be [2, 1, 0, 5, 3, 4] for gifs.length 6
var randomizedIndices = randomize(0, numOfUniqueCards * 2 - 1);

/** 
  Create the cards in code
  <div class="card">
      <img src="soap.png" id="card0" data-show="false"/>
  </div>
*/
function setupNewGame() {
  var divAllCards = document.getElementsByClassName("allCards")[0];
  var divCard, imgCard, divCounter, textCounter;
  for (var i = 0; i < gifs.length; i++) {
    divCard = document.createElement("div");
    imgCard = document.createElement("img");
    divCard.className = "card";
    imgCard.className = "cardImg";
    imgCard.id = "card" + i;
    imgCard.src = backOfCard;
    imgCard.setAttribute("data-matched", false);
    imgCard.addEventListener("click", cardClick);
    divCard.appendChild(imgCard);
    divAllCards.appendChild(divCard);
  }
  // add the counter in the middle
  var allCards = document.getElementsByClassName("card");
  divCounter = document.createElement("div");
  divCounter.className = "counter";
  textCounter = document.createTextNode(totalCardsShown);
  divCounter.appendChild(textCounter);
  divAllCards.insertBefore(divCounter, allCards[numOfUniqueCards]);
}

/**
 * This function takes min max values and return the integers between them (including min and max)
 * in random orders
 * For example for the arguments (0, 5), return value could be [3, 0, 1, 5, 4, 2];
 * @param {*} minVal
 * @param {*} maxVal
 */
function randomize(minVal, maxVal) {
  var numOfUniqueVals = maxVal - minVal + 1;
  // obj has Math.random as key, integers as values
  var obj = {};
  var arrRandomized = (sortedKeys = []);
  for (var i = 0; i < numOfUniqueVals; i++) {
    obj[Math.random()] = i;
  }
  // sort the keys
  sortKeys = Object.keys(obj).sort();
  // return the values in an array
  for (var key of sortKeys) {
    arrRandomized.push(obj[key]);
  }
  return arrRandomized;
}

function cardClick(event) {
  var currentCard = event.target;
  var divCounter = document.getElementsByClassName("counter")[0];
  // if there are two cards shown already, clicking does nothing
  if (numOfCardsShown >= 2) {
    return;
  }
  // clicking on a card that's already got a match
  // does nothing
  if (currentCard.getAttribute("data-matched") === "true") {
    return;
  }

  // clicking on the same card twice does nothing
  if (firstCard && currentCard.id === firstCard.id) {
    return;
  }

  // numOfCardsShown should be 0 or 1, show card and increment counter
  showCard(currentCard);
  numOfCardsShown++;
  divCounter.textContent = ++totalCardsShown;

  if (numOfCardsShown === 1) {
    firstCard = currentCard;
  } else if (numOfCardsShown === 2) {
    if (isAMatch(currentCard, firstCard)) {
      currentCard.setAttribute("data-matched", true);
      firstCard.setAttribute("data-matched", true);
      firstCard = null;
      numOfCardsShown = 0;
    } else {
      // show the current card for at least second
      setTimeout(function () {
        turnCardBack(currentCard);
        turnCardBack(firstCard);
        numOfCardsShown = 0;
        firstCard = null;
      }, 1000);
    }
  }
}

function isAMatch(nodeImg1, nodeImg2) {
  return nodeImg1.src === nodeImg2.src;
}

// gifs var is a fixed array with gifs;
// randomizedIndices is an array that has the array indices in
// random order
// each card id has values "card0", "card1", "card2" etc.
function showCard(nodeImg) {
  var cardNum = +nodeImg.id.slice(4);
  nodeImg.src = gifs[randomizedIndices[cardNum]];
}

function turnCardBack(nodeImg) {
  nodeImg.src = backOfCard;
}
