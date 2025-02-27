/*super black jack:

regular black jack code and shit
there is a percent change of enemy dropping buffs:
(increased chance of better cards (smaller cards) the closer it is to blackjack)
(chance of revive)
()
if blackjack occurs, you get an ultimate buff (can see the potential future cards on the next turn out of three)


must work on these sprites:
    character sprites (your opponents)
    mini sprites (the little soldiers fighting one another)
    table sprite
    look at marvel v capcom background for the overworld


*/

//fuck you, leave my code alone bitch

// document.addEventListener("contextmenu", function(e){
//     e.preventDefault();
// }, false);
// document.addEventListener("keydown", function(e){
//     if(e.keyCode === 123){
//         e.preventDefault();
//     }
//     if(e.ctrlKey && e.shiftKey && e.keyCode === 73){
//         e.preventDefault();
//     }
//     if(e.ctrlKey && e.keyCode === 85){
//         e.preventDefault();
//     }
// });

let drawn_cards = []; //must be set to clear on every blackjack, or exceed blackjack, or level transistion
let enemy_cards = [];

function a_checker() {
  //have this function occur each time a new card is played (on the hit me function). this way, you can charge the card value of Ace according to the new sum of the card (function call after new
  //sum is calculated). this simply changes the card value to 1 once the sum is greater than 10 or equal to 11
}

function loadCards() {
  const cardstack = document.getElementById("cards-container");
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const cardvalues = [
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  suits.forEach((suit) => {
    //runs through all suits, for each suit...
    cardvalues.forEach((value) => {
      //assign the value/number
      const img = document.createElement("img");
      img.id = `${suit}${value}`;
      img.src = `playing-cards-pack/PNG/Cards (large)/card_${suit}_${value}.png`;
      if (value === "J" || value === "Q" || value === "K" || value === "A") {
        img.dataset.value = 10;
      } else {
        img.dataset.value = parseInt(value);
      }
      img.height = 130;
      img.width = 130;
      cardstack.appendChild(img);

      img.onerror = function () {
        console.error("Failed to load: ", img.src);
      };
    });
  });
  //document.addEventListener("DOMContentLoaded", function(){
    all_cards = document.querySelectorAll("#cards-container img:not(#card-back-enemy)"); //sets global variable for full deck of cards
 // });
}






window.addEventListener("load", loadCards);

function game_in_cartridge() {
  console.log("Starting Game...");
  //play super blackjack text animation
  const startmusic = document.getElementById("startmusic");
  startmusic.load();
  setTimeout(() => {
    let playornot = startmusic.play();

    if (playornot !== undefined) {
      playornot
        .then(function () {
          console.log("Successful Audio Playback on Start");
        })
        .catch(function (error) {
          console.log("Audio Playback Failed because: ", error);
        });
    }
  }, 1000);
}



let damage = 0;
let playerattack = 200; //CHANGE THIS LATER
let health = 100;

let enemy_health = 100;

let healthBar = document.getElementById('healthBar');
let enemyBar = document.getElementById('enemyBar');

window.onload = function(){
  healthBar = document.getElementById('healthBar');
  enemyBar = document.getElementById('enemyBar');
};

function enemyBarUpdate(){
  enemyBar.style.width = enemy_health + "%";

  if(enemy_health <= 30){
    enemyBar.style.backgroundColor = "#660000";
  }else{
    enemyBar.style.backgroundColor = "blue";
  }
}

function healthBarUpdate(){
  healthBar.style.width = health + "%";

  if(health <= 30){
    healthBar.style.backgroundColor = "red";
  }else{
    healthBar.style.backgroundColor = "green";
  }
}

function decreasePlayerHealth(damage){
  console.log("player health decreasing");
  health -= damage;
  if(health <= 0){
    game_over();
  }
  healthBarUpdate();
}

function decreaseEnemyHealth(playerattack){
  enemy_health -= playerattack;
  if(enemy_health <= 0){
    transition_in();
    enemyDead();

  }
  enemyBarUpdate();
}

function healthrefill(){
  health = 100;
  enemy_health = 100;
  healthBarUpdate();
  enemyBarUpdate();
}

function criticalHealthIncrease(amount = 10){
  health += amount;
  if(health > 100) health = 100;
  healthBarUpdate();
}


function playerTakingDamage(){
  //visual que for the player be taking damage type shit
}
function enemyTakingDamage(){
  //visual que for the enemy taking damage type shitttt
}



function startGame() {
  level1();
  document.getElementById("startmusic").pause();
  document.getElementById("startmusic").currentTime = 0;
  const fade_button = document.getElementById("start-game");
  fade_button.style.opacity = 0;
  setTimeout(() => {
    fade_button.style.display = "none";
  }, 10);
}


let level;


function level1() {
  level = 1;
  damage = 10;
  healthrefill();
  console.log("Level 1 Starts Now...");
  document.getElementById("level1music").volume = 0.5;
  setTimeout(() => {
    //document.getElementById("level1music").play();
  }, 1000);
  drawn_cards = [];
  drawnIndices = new Array(all_cards.length).fill(false); //global variable that keeps track of cards drawn from the deck, must be reset at each start of level function
  document.getElementById("stay").disabled = true;
  //include start button sound effect
  setTimeout(()=>{
    transition_out();
  },3000);
}




function level2() {
  level = 2;
  damage = 15;
  setTimeout(()=>{
    document.body.style.backgroundColor = "blue";
  },3000);
  healthrefill();
  //document.getElementById("level2music").volume = 0.0; // change this later;
  setTimeout(() => {
    document.getElementById("level2music").play();
  }, 1000);
  drawn_cards = [];
  document.getElementById("stay").disabled = true;

  drawnIndices = new Array(all_cards.length).fill(false);
  setTimeout(()=>{
    transition_out();
  },3000);
}

function level3(){
  level = 3;
  damage = 30;
  setTimeout(()=>{
  document.body.style.backgroundColor = "purple";
  },3000);
  healthrefill();
  document.getElementById("level3music");
  setTimeout(()=>{
    document.getElementById("level3music").play();
  }, 1000);
  drawn_cards = [];
  document.getElementById("stay").disabled = true;

  drawnIndices = new Array(all_cards.length).fill(false);
  setTimeout(()=>{
    transition_out();
  },3000);
}








function transition_out() {
  drawn_cards = []; //resets cards for the next level
  const black_screen = document.getElementById("blackscreen");
  black_screen.style.opacity = 0;

  setTimeout(() => {
    black_screen.style.display = "none";
  }, 1000); //change this value later
}


// function transition_in(){
//   const black_screen = document.getElementById("blackscreen");
//   black_screen.style.display = "block";
  

//   setTimeout(()=>{
//     black_screen.style.opacity = 1;   
//   }, 1000);
// }
function transition_in() {
  const black_screen = document.getElementById("blackscreen");
  black_screen.style.display = "block";

  // Use requestAnimationFrame to ensure the display change has taken effect
  requestAnimationFrame(() => {
    // Add another requestAnimationFrame if one frame is not enough
    requestAnimationFrame(() => {
      black_screen.style.opacity = 1;
    });
  });
}








let leftPosition = -500;
let leftText = -1500;


function hit() {
  player_sum = document.getElementById("player-sum"); //*

  const player_drawn_image = document.getElementById("drawn-cards-player");
  let random_card_index;
  const player_starting_positionX = 100;
  const player_starting_positionY = 200;
  const text_starting = 400;

  do {
    random_card_index = Math.floor(Math.random() * all_cards.length);
  } while (drawnIndices[random_card_index]);

  drawnIndices[random_card_index] = true; //this marks the card as drawn, and cannot be selected again from the deck

  console.log(drawnIndices);

  const random_card = all_cards[random_card_index];
  drawn_cards.push(random_card);

  random_card.style.display = "block";
  random_card.style.left = "46%";
  random_card.style.top = "42.5%";
  player_sum.style.opacity = 1;
  player_sum.style.left = "46%";
  player_sum.style.top = "42.5%";
  player_sum.style.transition = "translate(-50%, -50%)";
  

  setTimeout(() => {
    leftPosition += player_starting_positionX;
    let topPosition = player_starting_positionY;
    leftText += text_starting; //*
    let topText = 900;
    player_sum.style.transform = `translate(-50%, 0) translateX(${leftText}%) translateY(${topText}%)`; // *
    //leftPosition = player_starting_positionX + (drawn_cards.length - 1 ) * (cardWidth + spaceBetween);
    random_card.style.transform = `translateX(${leftPosition}%) translateY(${topPosition}%)`;
    //might also want to update the sum so that the new sum appears and glides to the right of the new placed card
    //or to make things easier, just add a bunch of spaces to the sum in between (use inner splice or someshit)
    //make sure space accomdates enough space to clear cards on each run
  }, 500);

  sum = 0;
  for (let i = 0; i < drawn_cards.length; i++) {
    sum += parseInt(drawn_cards[i].dataset.value, 10);
    console.log("Player Cards: " + drawn_cards[i].dataset.value);
  }
  player_sum.innerHTML = sum;
  player_drawn_image.appendChild(random_card);

  if (drawn_cards.length > 20) {
    console.log("max capacity reached");
    clearCards(); //bug and error handling

    //document.getElementById('hit').disabled = true;
    //call sudden death function here that ends the game, and rewards whichever player with the higher health
  }
  document.getElementById("stay").disabled = false;

  console.log("THE SUM: " + sum);
  // setTimeout(() => {
  //   renderGame();
  // }, 1000);
  renderGame();
  //if statement needs to be wrapped around this, depending on if enemy chooses to hit or stay
}







let enemy_card_draw = document.getElementById("card-back-enemy");

let rightPosition = 500;
let drawAnother = true;
let enemyDone = false;
let enemy_sum = 0;
let count = 0;

function enemyPlayerDraw() {
  enemy_card_draw = document.getElementById("card-back-enemy");


  //const dupli_Card = document.getElementById('enemy-stack')
  console.log("ENEMY HIT FUNCTION ACTIVATED BITCH");
  //enemy player cards are all calculated at random
  //to avoid complete bullshit, call this function at the end of the hit function (enemy draws card from the same deck)
  let random_card_index;
  const enemy_start_positionX = -100;
  const enemy_start_positionY = -200;

  do {
    random_card_index = Math.floor(Math.random() * all_cards.length);
  } while (drawnIndices[random_card_index]);

  drawnIndices[random_card_index] = true;

  const random_card = all_cards[random_card_index];
  enemy_cards.push(random_card);

  //make enemy_card_draw equal to the new card stack
  dupli_Card = enemy_card_draw.cloneNode(false);
  dupli_Card.id = `dupli_Card[${count}]`;
  const enemy_stack = document.getElementById("enemy-stack");
  enemy_stack.appendChild(dupli_Card);

  // random_card.style.display = 'block';
  // random_card.style.left = '46%';
  // random_card.style.top = '42.5%';
  dupli_Card.style.display = "block";
  dupli_Card.style.left = "46%";
  dupli_Card.style.top = "42.5%";

  setTimeout(() => {
    rightPosition += enemy_start_positionX;
    let bottomPosition = enemy_start_positionY;
    dupli_Card.style.transform = `translateX(${rightPosition}px) translateY(${bottomPosition}px)`;
  }, 500);

  enemy_sum = 0;
  for (let i = 0; i < enemy_cards.length; i++) {
    enemy_sum += parseInt(enemy_cards[i].dataset.value, 10);
    console.log("Enemy Cards: " + enemy_cards[i].dataset.value)
  }
  console.log("ENEMY SUM: " + enemy_sum);
  enemy_stack.appendChild(enemy_card_draw);


  if(enemy_sum <= 11){
    drawAnother = true;
  } else if (enemy_sum >= 18 && enemy_sum < 19 && Math.random() < 0.05) {
    drawAnother = true;
  } else if (enemy_sum >= 12 && enemy_sum <= 15 && Math.random() < 0.5) {
    drawAnother = true;
  } else if (enemy_sum >= 16 && enemy_sum <= 17 && Math.random() < 0.1) {
    drawAnother = true;
  }else if(enemy_sum >= 19){
    drawAnother = false;
  }
  console.log(drawAnother);

  
    //within this function, must include percentage/probability chances of enemy drawing another card, then set the boolean to either true or false
  //this can be done by calculating the current sum of the enemy cards, and then working as accordingly
  //enemy logic:
  //if sum is 11 or less, the enemy must always hit
  //if sum is 18 or higher, the chance of enemy hitting is going to be 20%
  //if sum is between 14 and 16, the enemy has a 70% chance of hitting
  //if enemy gets 21 exact, critical damage is dealt to the player
  //depending on the level, change the amount of damage the enemy deals. the higher the level, the more damage the enemy deals (also the chances of enemy drawing another card are stricter)
  //whichever has the larger sum and is still less than 21 wins, and the opposite gets damage dealt.
  //once again, drawn cards, enemydrawncards, both div containers, must be cleared on each one of these outcomes.
  //displays the cards and the total(sum) of cards underneath them
  //also computes the player state depending on shit
  //if the sum is less than 21, then keep it going
  //if sum is


  //figure out how to duplicate the card-back-enemy so that each time it is drawn, the card is duplicated (probably simply requires creation of a new card, appended to card container. when
  //enemy card clears, so does this appendation to card container)
  //create html div id
  //each time enemydrawncard function is called, duplicate the card back(?)
  //appendchild to html div, and clear after same error handling for player
  count++;
}




function clearCards() {
  console.log("CLEAR CARDS ACTIVATED")
  console.log(drawn_cards);
  //clears the drawn cards array of both the player and the enemy
  document.getElementById("drawn-cards-player").innerHTML = "";
  document.getElementById("enemy-stack").innerHTML = "";
  drawn_cards = [];
  enemy_cards = [];
  enemy_sum = 0;
  sum = 0;
  player_sum.innerHTML = 0;
  enemyDone = false;
  drawAnother = true;
  leftPosition = -500;
  leftText = -1500;
  topText = 900;
  document.getElementById("player-sum").style.transform = `translate(-50%, 0) translateX(${leftText}%) translateY(${topText}%)`; // *
  rightPosition = 500;
  enemy_card_draw = document.createElement('img');
  enemy_card_draw.id = 'card-back-enemy';
  enemy_card_draw.src = "SBS - 2D Poker Pack/Top-Down/Cards/red_card.png";
  enemy_card_draw.style.display = "none";
  game_container = document.getElementsByClassName('game-content');
  game_container[0].appendChild(enemy_card_draw);
  removeEnemyCards();
  drawnIndices = new Array(all_cards.length).fill(false);
    //enemy_card_draw = document.getElementById("card-back-enemy");

  //insert enemyplayerdraw boolean to be true again, so it is true at default for next round
}


function renderGame() {
  count++;
  if (drawAnother === true) {
    enemyPlayerDraw();
  } else {
    enemyDone = true;
  }
  console.log("enemy done: " + enemyDone)

  if (sum > 21) {
    disableHitButton();
    document.getElementById("stay").disabled = true;
    
    setTimeout(()=>{
      

        decreasePlayerHealth(damage); //decrease health
        console.log("player health decreased outside function, within render")
        clearCards();
        enableHitButton();
        document.getElementById("stay").disabled = false;

      

      console.log(sum);
      console.log(enemy_sum);      
    }, 3000);
    
  } else if (sum < 21) {
    if(!drawinghandle){
      
    }else if(drawinghandle){
    disableHitButton();
    setTimeout(()=>{
      enableHitButton();
      console.log("ENABLED CAUSE OF HIT BTICH SHIT");
    }, 500);
  }
    //might remove this line, as this can be satisfied by the stay() function
  } else if (sum === 21) { //player gets a critical attack
    disableHitButton();
    document.getElementById("stay").disabled = true;
    setTimeout(()=>{
      playerattack += 15;
      decreaseEnemyHealth(playerattack);
      playerattack -= 15;
      if(Math.random() < 0.5){
        criticalHealthIncrease();
      }
      clearCards();
      enableHitButton();
      document.getElementById("stay").disabled = false;
      console.log("player critical 21");
    }, 3000);

  } else if (enemy_sum === 21){ //enemy gets a critical attack

    damage *= 1.5;
    decreasePlayerHealth(damage);
    damage /= 1.5;
    clearCards();
  } else if (sum === 21 && enemy_sum === 21){
    playerattack += 20;
    damage *= 2;
    decreasePlayerHealth(damage);
    decreaseEnemyHealth(playerattack);
    playerattack -= 15;
    damage /= 2;
    clearCards();
    //both get critical damage dealt to one another
  }else if(enemy_sum > 21){
    decreaseEnemyHealth(playerattack);
    clearCards();
  }

}


function disableHitButton() {
  document.getElementById("hit").disabled = true;
}
function enableHitButton(){
  document.getElementById("hit").disabled = false;
}


let enemy_card_display;

function displayEnemyCards() {
  enemy_card_display = document.getElementById("enemy-sum");
  enemy_card_display.innerHTML = enemy_sum;
  enemy_card_display.style.opacity = 1;
  //this function calls when the player selects stay instead of hit. only time when function is called
  //can also return an integer, to compare that with the player's sum and see which is better
}
function removeEnemyCards(){
  enemy_card_display = document.getElementById("enemy-sum");
  enemy_card_display.style.opacity = 0;
}

let drawinghandle; 


function drawinghandler(){
  if(drawAnother){
    setTimeout(()=>{
      renderGame();
      console.log("enemy draws another!");
      drawinghandler();
    }, 1000);
  }else{
    enemyDone = true;
    console.log("enemy chooses to stay");
    console.log("enemy total after hanlder: " + enemy_sum);
    displayEnemyCards();
    
  }
}


function stay() {
  disableHitButton();
  document.getElementById("stay").disabled = true;


  if (enemyDone === true) {
    //enemyDone must be globally declared in the function that handles enemy logic
    displayEnemyCards();
  } else {
    console.log("drawing handler now starts");
    //call renderGame, so that then that could call enemyplayerdraw, and keep it on so until it is no longer gonna select another card, and enemyDone is set to true
    drawinghandle = true;
    console.log("drawing handle: " + drawinghandle);
    drawinghandler();
    drawinghandle = false;
    console.log("bitch ass handler now ends!");
    //setTimeout(stay, 100); //timeout so that it waits for enemyDone to be true (after enemy is done drawing all their cards)
  }
  console.log("starting timeout on stay");

  setTimeout(()=> {
    console.log("timeout setting starting whore");
  if (21 > enemy_sum && enemy_sum > sum) {
    decreasePlayerHealth(damage);
    console.log("clear cards enemy wins")
    clearCards();
  } else if (enemy_sum === sum) {
    decreasePlayerHealth(damage);
    decreaseEnemyHealth(playerattack);
    console.log("clear cards tie");
    clearCards();
  } else if(21 > sum && sum > enemy_sum) {
    decreaseEnemyHealth(playerattack);
    console.log("clear cards player wins");
    clearCards();
  }else if(enemy_sum > 21){
    decreaseEnemyHealth(playerattack);
    console.log("enemy overflowed");
    clearCards();
  } else if (enemy_sum === 21){ //enemy gets a critical attack
    damage *= 1.5;
    decreasePlayerHealth(damage);
    damage /= 1.5;
    clearCards();
  }else{
    renderGame();
    console.log("render game handling");
  }
  enableHitButton();
  document.getElementById("stay").disabled = false;
}, 4000);
}


















function ready_go() {
  //run this function on every level change
  //disable all click inputs and give a timeout
  //displays "READY???"
  //and then "GOOO"
}

function to_black() {
  //opposite of transition out, this fades to black when enemy's health bar is 0 or your own is set to zero
}

function game_over() {
  //insert new html text element stating game over
  //insert button that reloads the whole game/page

  //when your health bar is set to 0. this restarts the current level. 2 lives then game over
}

function enemyDead(){
  if(level === 1){
    clearCards();
    //insert function to transition into black
    level2();
  }else if(level === 2){
    clearCards();
    //insert function to transition in
    level3();
  }else if(level === 3){
    //insert ending game screen, then repeat the button used to reset/reload the browser
  }
}

//window.onload = function()---- this should start the game (super blackjack intro)
//on start of game, play intro then display the two buttoms (after set wait time) to start game

//to avoid the auto-start blockout, have a sprite of an snes cartridge being placed inside a snes console. click on the cartridge or console to start the whole shit

//mike tyson level - punch out wii theme

//now that the card drawing works, next we have to pretty much do the sum and actual blackjack game functionality
//this means using the sum values of both player and enemy
//if sum is above 21, then disable the hit button, have the player take damage, then clear the drawn cards array, clear the card stack div, and enable hit button again
//if sum is 21 exact, have critical damage deal to the enemy

//enemy logic:
//if sum is 11 or less, the enemy must always hit
//if sum is 17 or higher, the chance of enemy hitting is going to be 20%
//if sum is between 14 and 16, the enemy has a 70% chance of hitting
//if enemy gets 21 exact, critical damage is dealt to the player
//depending on the level, change the amount of damage the enemy deals. the higher the level, the more damage the enemy deals

//when player clicks stand, the enemy can still choose to hit or not. the enemy logic will have to exist within the hit().
//if player stands, but the enemy logic sum is still in range of hitting again, then it must run within while loop of true or false (it is true the enemy will keep hitting, until percentage fails)
//whichever has the larger sum and is still less than 21 wins, and the opposite gets damage dealt.
//once again, drawn cards, enemydrawncards, both div containers, must be cleared on each one of these outcomes.

//displayEnemyCards only happens after the player selects stay, but also only after the enemy is done with its logic
// within enemyplayerdraw, take note of the card. take note of the probability to pick another card. calculate that probability and determine it to a true or false if the enemy will draw another card, and within a globalized variable, do an if statement that if that value is true, then enemyplayerdraw is called. if not, then that shit is not called.
// change enemyplayerdraw to be called within rendergame instead of hit, that way they can function separately. each time render game is called, enemyplayerdraw is also called. this is where the if statements must be placed to see if the enemy will go again or not (when rendergame is called again)
// have enemyplayerdraw have a true/false parameter. this function also returns a boolean. so in rendergame, pass the boolean through (automatically defaults to true, let this variable be global).
// if enemy gets above 21 within this function (enemyplayerdraw), then the displaycards function is automatically called and enemy takes damage, then cards are cleared.
//^^^^ please refer to stickynotes for full explanation
