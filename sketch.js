var score
var trex ,trex_running;
var ground
var fake_ground
var ground_image
var cloud ,cloud_image
var cactus
var c1
var c2
var c3
var c4
var c5
var c6
var gamestate="alive"
var cloud_group
var trex_collided
var cactus_group
var gameover,gameover_image
var restart,restart_image
var jump
var checkpoint
var die 



function preload(){
  trex_running=loadAnimation("trex3.png","trex4.png")
ground_image=loadImage("ground2.png")
cloud_image=loadImage("cloud.png")
c1=loadImage("obstacle1.png")
c2=loadImage("obstacle2.png")
c3=loadImage("obstacle3.png")
c4=loadImage("obstacle4.png")
c5=loadImage("obstacle5.png")
c6=loadImage("obstacle6.png")
trex_collided=loadAnimation("trex_collided.png")
gameover_image=loadImage("gameOver.png")
restart_image=loadImage("restart.png")
die=loadSound("die.mp3")
checkpoint=loadSound("checkpoint.mp3")
jump=loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex=createSprite(50,190,20,50)
 trex.addAnimation("Run",trex_running)
 trex.addAnimation("Pen",trex_collided)
 trex.scale=0.6

//making the collider radius of the trex visible
//trex.debug=true
//changing the shape and the size of the collision radius
trex.setCollider("circle",0,0,40)

// creating the game over and restart icons
gameover=createSprite(300,100)
gameover.addImage(gameover_image)
restart=createSprite(300,140)
restart.addImage(restart_image)
gameover.scale=0.5
restart.scale=0.5

 // example for using random function
 // var Wings=Math.round(random(2,69))
//console.log(Wings)
 // creating a ground sprite
 ground=createSprite(200,180,400,5)
 ground.addImage(ground_image)
 // creating a fake ground
 fake_ground=createSprite(190,190,395,5)
 //fake_ground.shapeColor="PowderBlue"
 fake_ground.visible=false
 score=0
 // creating the groups
 cloud_group=new Group()
 cactus_group=createGroup()
}//if(num1>50 || num1%2==0)

function draw(){
  background("SteelBlue")
//displaying the text on the screen
textSize(15)
fill("GoldenRod")
text("Points:  "+score,450,50)
if (gamestate=="alive"){
  //making the restart and game over icons invisible
  restart.visible=false
  gameover.visible=false
// moving the ground
ground.velocityX=-2-score*3/100

//increasing the score according to framecount
score=score+ Math.round(getFrameRate()/60)
// playing the checkpoint sound everytime we gain another 200 points
if (score%200==0 && score>0){
  checkpoint.play()
}
//making the trex jump
if(keyDown("space") && trex.collide(fake_ground)){

  trex.velocityY=-20
  jump.play()
}
//adding gravity to the trex
trex.velocityY=trex.velocityY+2 
//making the ground infinite
if(ground.x<0){
  ground.x=ground.width/2
   }
// creating the clouds and cacti
   Siu()
   Pie()



   //detection collison betweeen the trex and the cactus and making trex die by changing the gamestate to dead
if(trex.isTouching(cactus_group)){
  gamestate="dead"
  die.play()
 // trex.velocityY=-20
 //jump.play()
}


}

else if(gamestate=="dead"){
  //making the game over and restart visible
  gameover.visible=true
  restart.visible=true

// stopping the ground
ground.velocityX=0
//freezing all the items(clouds and cacti)
cloud_group.setVelocityXEach(0)
cactus_group.setVelocityXEach(0)
// stopping the clouds and cacti from disappearing 
cloud_group.setLifetimeEach(-2)
cactus_group.setLifetimeEach(-3)
//changing the animation of the trex to the dead state 
trex.changeAnimation("Pen")
// fixing the flying bug
trex.velocityY=0
// calling the reset function when the reset icon is clicked
if (mousePressedOver(restart)){
  reset()
}

}
// the join of two strings is called concatenation we use + for this

 


  // making trex standing on the ground
  trex.collide(fake_ground  )
  //console.log(ground.x)
  
 
  drawSprites()
}
function reset(){
gamestate="alive"
// destroying all the clouds and cacti that are frozen on the dead screen
cloud_group.destroyEach()
cactus_group.destroyEach()
// chaning the running state from dead to alive
trex.changeAnimation("Run")
//reseting the speed and the score at the initial values
score=0
}



function Siu(){

if (frameCount%60==0){
  cloud=createSprite(600,100,40,10)
  // adding all the clouds in its group
  cloud_group.add(cloud)
  //randomising the clouds y position
  cloud.y=Math.round(random(10,100))
  cloud.velocityX=-5-score*3/100
 // console.log(cloud.depth)
 
 //fixing the depth problem
 trex.depth=cloud.depth+1
 // adding image to the cloud
 cloud.addImage(cloud_image)
 cloud.scale=0.6
 //fixing the memory leak for cloud
 cloud.lifetime=128
}


}

function Pie(){
 if(frameCount%40==0){
cactus=createSprite(600,162,10,45)
// adding the cactus in its group
cactus_group.add(cactus)
cactus.velocityX=-11-score*3/100
var Dogs=Math.round(random(1,6))
cactus.scale=0.6
cactus.lifetime=58 
switch(Dogs){
  case 1:cactus.addImage(c1)
  break
  case 2:cactus.addImage(c2)
  break
  case 3:cactus.addImage(c3)
  break
  case 4:cactus.addImage(c4)
  break
  case 5:cactus.addImage(c5)
  break
  case 6:cactus.addImage(c6)
  break
  default:break

}
 }




}







