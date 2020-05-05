Todo
- functionality
  - bonus point: add lowest-scoring game by using local storage
- style
  - animation for flipped a card (to show it and to show the back of the card)
  - tranforms the game title text "MATCH -A- GIF" 

Additional feature (compared to the requirements or demo app):
- When starting the game, a user can optionally set the number of unique cards (the app will display twice as many cards). I use localStorage to pass the value for the variable.

What I learned
- Trying to pass numOfUniqueCards as a global var from index.html to game.html doesn't work
"You misunderstood what “global variables” are in JavaScript in the browser. They are still tied to the page they were set in, they do not exist in other pages." 
source: https://stackoverflow.com/questions/27765666/passing-variable-through-javascript-from-one-html-page-to-another-page

- CSS (see style.css)
  - vertically center text in div by using line-height
  - align div with text