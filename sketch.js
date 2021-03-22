//Create variables here
var dog, dogImg;
var happyDogImg;
var database;
var foodS;
var foodObj;
var feedTime;
var feedButton, addFoodButton;
var gameState = Playing || Sleeping || Hungry || Bathing;
var bedroomImg, gardenImg, washroomImg;
var update;

function preload() {
	//load images here
  happyDogImg = loadImage("images/happy dog.png");
  dogImg = loadImage("images/dog.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
}

function setup() {
	createCanvas(1200, 400);
  database = firebase.database();

  dog = createSprite(1130, 330);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodObj = new Food();
  foodObj.readStock();

  update = new Food();
  update.updateStock();

  var lastFedRef = database.ref('lastFed');
  lastFedRef.on("value", (data) =>{
    feedTime = data.val();
  });
  //.on = permanent listener

  addFoodButton = createButton("Add Food");
  addFoodButton.position(230, 70);

  readGameState = database.ref('gameState');
  readGameState.on("value", function (data){
    gameState = data.val();
  });
}


function draw() {
  background(142, 8, 109);

  //!== undefined to handle delay
  if(feedTime !== undefined) {
    textSize(20);
    fill("white");
    if(feedTime > 12) {
      text("Last Fed: " + feedTime%12 + "PM", 20, 35);
    } else if (feedTime === 0){
      text("Last Fed: 12 AM", 20, 35);
    } else if (feedTime === 12) {
      text("Last Fed: 12 PM", 20, 35);
    } else {
      text("Last Fed: " + feedTime + "AM", 20, 35);
    }
  }

  if(feedTime == (feedTime + 1)) {
    update("Playing");
    foodObj.garden();
   } else if(feedTime == (feedTime + 2)) {
    update("Sleeping");
    foodObj.bedroom();
   } else if(feedTime>(feedTime + 2) && feedTime <= (feedTime+4)) {
    update("Bathing");
    foodObj.washroom();
   } else {
    update("Hungry");
    foodObj.display();
   }

  drawSprites();
  //add styles here
  foodObj.display(foodS);

  feedButton.mousePressed(() => {
    dog.addImage(happyDogImg);
    foodS = foodS-1
    foodObj.updateStock(foodS);
    feedTime = hour();

    database.ref('/').update({
      lastFed: feedTime
    });
  });

  addFoodButton.mousePressed(() => {
    foodS = foodS+1
    foodObj.updateStock(foodS);
  });
}