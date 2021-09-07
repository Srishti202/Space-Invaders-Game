  var backgroundImg
  var spacecraft , spacecraftImg;
  var  alienImg , moonrockImg , meteorImg,laserImg;
  var obstacleGroup;
  var laserGroup;
  var score = 0;
  var start;
  var gameState = 'start'
  var damage =0;
  var startImg;
  var blastImg;
  var count = 0;
  var enable = true;
  

  function preload(){
    backgroundImg =loadImage("Imgs/background.jpg")
    alienImg = loadImage("Imgs/alien.png")
    moonrockImg = loadImage("Imgs/moonrock.png")
    meteorImg = loadImage("Imgs/meteor.png")
    spacecraftImg = loadImage("Imgs/spacecraft.png")
    startImg=loadImage("Imgs/start.jpg")
    laserImg=loadImage("Imgs/laser.png")
    blastImg = loadImage("Imgs/blast.png")
  }

  function setup() {
    createCanvas(windowWidth,windowHeight);
    bg = createSprite(windowWidth/2,windowHeight/2,10,10);
    bg.addImage("dark",backgroundImg);
    bg.addImage("blast",blastImg)
    bg.scale=4;
    spacecraft = createSprite(windowWidth/2,windowHeight-50, 50, 50);
    spacecraft.addImage(spacecraftImg);
    spacecraft.scale=0.3
  obstacleGroup= new Group();
  laserGroup= new Group();
  start = createSprite(windowWidth/2,windowHeight-100,50,50);
  start.addImage(startImg);
  start.scale=0.3;
  }

  function draw() {
    background("black"); 
    if(gameState==='start'){
      background(backgroundImg);
      bg.changeImage("dark",backgroundImg)
      bg.scale = 4;
      fill("white");
      textSize(40);
      
      
      if(mousePressedOver(start)){
        gameState='play'
      }
      spacecraft.visible =false
      drawSprites();
      text("SPACE INVADERS 🚀🚀",windowWidth/2-100,100)
      textSize(30)
      text("Welcome!!",windowWidth/2-20,170)
      textSize(25)
      text("Instructions : ",windowWidth/2-200,215)
      textSize(20)
      text("- Use arrow keys to control the space craft",windowWidth/2-200,260)
      text("- press space to fire",windowWidth/2-200,290)
      text("- if hit by the obstacles your damage increases",windowWidth/2-200,320)
      text("- once damages reaches 100% game gets over",windowWidth/2-200,350)
      textSize(40)
      fill("red")
      stroke("pink")
      strokeWeight(7)
      text("ALL THE BEST !!!", windowWidth/2-100,500)
    } 
    if(gameState==='play'){
      bg.changeImage("dark",backgroundImg)
      bg.scale = 4;
      spacecraft.visible = true
      bg.visible=true;
      start.visible=false
    bg.velocityY = 6;
    if(bg.y>700){
      bg.y=350
    }
  if (keyDown('UP_ARROW')){
    spacecraft.y = spacecraft.y-20
  }
  if (keyDown('DOWN_ARROW')){
    spacecraft.y = spacecraft.y+20
  }

  if (keyDown('LEFT_ARROW')){
  spacecraft.x = spacecraft.x-20
  }

  if (keyDown('RIGHT_ARROW')){
  spacecraft.x = spacecraft.x+20
  }
  spacecraft.x = mouseX
  spacecraft.y=mouseY
  obstacles();
  console.log(count)
  if(enable === true && keyDown('SPACE') || touches.length>0 ){
    
    enable=false
  lasers(); 
touches.length=[]
  }
  if(enable===false){
count = count+1

  }
  if(count>80){
    enable=true
    count=0
  }
  drawSprites();
  fill("white")
  textSize(20)
  text("Score : "+ score,700,50);
  text("Damage : "+ damage+" % ",680,100 )
  if(obstacleGroup.isTouching(spacecraft)){
    damage = damage+10
    obstacleGroup.destroyEach()
  }
  
  if(damage===100){
    gameState='end'
  
  }
  if(laserGroup.isTouching(obstacleGroup)){
    laserGroup.destroyEach()
    obstacleGroup.destroyEach()
    score = score+100;
  }
}
if(gameState==='end'){
  bg.changeImage("blast",blastImg)
  bg.velocityY=0;
bg.scale=1;
  drawSprites();
  fill("white")
  textSize(40)
  
  text("GAME OVER !",windowWidth/2-100,200)
  start.visible=true;
  spacecraft.visible=false;
  bg.visible=true;

  if(mousePressedOver(start)){
    restart()
  }
}
  }
  function restart(){
    gameState='play'
    score=0;
    damage=0;
  }
  function obstacles (){
    if(frameCount%70===0){
      obstacle = createSprite(200,-50,30,30);
  obstacle.x = Math.round(random(windowWidth+20,windowHeight+20))
  obstacle.velocityY= 10
  var r = Math.round(random(1,3));
  switch(r){
    case 1:obstacle.addImage(meteorImg);
    obstacle.scale =0.2
    break;
    case 2: obstacle.addImage(alienImg);
    obstacle.scale=0.2
    break;
    case 3 : obstacle.addImage(moonrockImg);
    obstacle.scale=0.2
    break;
    default:break 
  }
  obstacleGroup.add(obstacle)
    }
  }
  function lasers(){
    laser = createSprite(spacecraft.x , spacecraft.y-50,10,100);
    laser.shapeColor= "green"
    laser.velocityY = -12
    laserGroup.add(laser);
    laser.addImage(laserImg)
    laser.scale=0.1
  }
