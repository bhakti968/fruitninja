var knife,knifeImage,fruit1Image,fruit2Image,fruit3Image,
    fruit4Image;
var monster,monsterImage,gameOverImage,gameOverSound,knifeSound;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  knifeImage=loadImage("sword.png");
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  fruit4Image=loadImage("fruit4.png");
  monsterImage=loadAnimation("enemy1.png","enemy2.png");
  gameOverImage=loadImage("gameover.png");
  gameOverSound=loadSound("gameover.mp3");
  knifeSound=loadSound("knifeSwooshSound.mp3");
}
function setup(){
  createCanvas(600,600);
  knife=createSprite(300,300,20,20);
 knife.addImage(knifeImage);
  knife.scale=0.8;
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  knife.setCollider("rectangle",0,0,40,40);
}
function draw(){
  background("lightblue");
 
  fruits();
  enemy();
  
  text("Score: "+ score, 300,50);
 
  if(gameState===PLAY){
     knife.y=mouseY;
     knife.x=mouseX;
  
  if(fruitGroup.isTouching(knife)){
    gameState=PLAY;
    fruitGroup.destroyEach();
    score=score+2;
    knifeSound.play();
  }
  if(knife.isTouching(enemyGroup)){
    gameState=END;
    gameOverSound.play();
  }
    
  }
    else if(gameState===END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    knife.addImage(gameOverImage);
    knife.x=300;
    knife.y=300;
  }
drawSprites();
}
function fruits(){
  if(World.frameCount%80===0){
    position=Math.round(random(1,2));
    fruit=createSprite(600,300,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1Image);
    }
    else if(r===2){
      fruit.addImage(fruit2Image);
    }
    else if(r===3){
      fruit.addImage(fruit3Image);
    }
    else if(r===4){
      fruit.addImage(fruit4Image)
    }
    fruit.y=Math.round(random(50,540));
    if(position==1){
      fruit.x=600;
      fruit.velocityX=-(7+(score/4));
    }
    else if(position==2){
      fruit.x=0;
      fruit.velocityX=+(7+(score/4));
    }
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(600,300,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(200,500));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    enemyGroup.add(monster);
  }
}