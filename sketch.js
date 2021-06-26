var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var monkey

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(73,340);
  monkey.addAnimation( "monkey",player_running);
  monkey.scale = 0.11;

  ground = createSprite(200,380,800,10);
  ground.x = ground.width /2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  if(backgr.x<100){
    backgr.x=width/2
  }
  
  if(keyDown( "space") && monkey.y>= 300){
      monkey.velocityY = -17;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
  }
  switch(score){
    case 10:monkey.scale=0.12;
            break;
            
    case 20:monkey.scale=0.14;
            break; 
            
     case 30:monkey.scale=0.16;
            break;  
            
     case 40:monkey.scale=0.18;
            break;       
  }
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.10;
  }
  
  spawnFood()
  spawnObstacles()
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(600, 350);
  stone .addImage( "Stone",obstacle_img);
  stone.scale = 0.15;
  stone.velocityX=-3;
  obstaclesGroup.add(stone);
    stone.lifetime=300;
  }
}


  
