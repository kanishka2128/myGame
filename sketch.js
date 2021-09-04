var backgroundImg, scientistImg, scientist, invisibleGround;
var bowImg, bow, invisibleGroundBow;
var arrow, arrowImg;
var arrowCount = 50;
var fireballImg, waterImg, plasticImg;
var end = 0;
var play = 1;
var gameState = play;
var score = 0

var arrowG,obstacle1G, obstacle2G, plasticG;




function preload() {
backgroundImg = loadImage("image back.jpeg")
scientistImg = loadImage("scientist.jpeg")
arrowImg = loadImage("arrow0.png")
bowImg = loadImage("bow0.png")
fireballImg = loadImage("image3.jpeg")
waterImg = loadImage("image1.jpeg")
plasticImg = loadImage("bertie_.jpeg")
}

function setup() {
createCanvas(windowWidth, windowHeight); 

scientist = createSprite(500,700,50,50);
scientist.addImage("scientist", scientistImg);
scientist.scale = 0.1

invisibleGround = createSprite(windowWidth/2, windowHeight, windowWidth,10 );
invisibleGround.visible = false

bow = createSprite(100,200,50,50)
bow.addImage(bowImg)
bow.x = scientist.x 
bow.scale = 1.5
//bow.y = scientist.y 

console.log(windowWidth + " " + windowHeight)


 arrowG = new Group()
 obstacle1G = new Group()
 obstacle2G = new Group()
 plasticG = new Group()
} 

function draw() {
background("red")

if (gameState === play ) {
    image(backgroundImg, 0,0, windowWidth,windowHeight)
    push()
    textSize(20)
    fill("black") 
    text("Arrows : " + arrowCount,20,20)
    text("Score : " + score,20,50)
    pop()
    
    hazard();
    
    if (keyDown("space") && scientist.y > 650) {
        scientist.velocityY = -15;
        bow.velocityY = -15

       
    } 

    
    scientist.velocityY += 0.5
    bow.velocityY +=0.5
    
    scientist.collide(invisibleGround)
    bow.collide(scientist)
    
    console.log(gameState)
    
    if (scientist.isTouching(obstacle1G) || scientist.isTouching(obstacle2G) || scientist.isTouching(plasticG)) {
        gameState = end;
    }

    if (arrowG.isTouching(obstacle1G)) {
        obstacle1G.destroyEach();
        score++
    }
    if (arrowG.isTouching(plasticG)) {
        plasticG.destroyEach();
        score++
    }
    if (arrowG.isTouching(obstacle2G)) {
        obstacle2G.destroyEach();
        score++
    }

    text(mouseX + "," + mouseY,mouseX, mouseY)
}



if (gameState === end) {
    fill("purple")
    textSize(50)
    text("Game Over", windowWidth/2 - 20,windowHeight/2)

    obstacle1G.destroyEach();
    obstacle2G.destroyEach();
    plasticG.destroyEach();

    scientist.destroy();
    bow.destroy();
    textSize(30)
    text("Please avoid using plastic and other non-recycleable materials", 50,100 )
    text("because this will hurt the environment and kill many animals species", 60,140)

}



drawSprites()
}

function keyReleased() {
    //check if S key was released
    if (keyCode === 115 || keyCode === 83) {
        if (arrowCount > 0) {
            arrow = createSprite(50,50,20,20)
            arrow.x = bow.x
            arrow.y = bow.y
            arrow.addImage(arrowImg)
            arrow.velocityY = -100
            arrowG.add(arrow)
            arrow.scale = 0.2
            arrowCount--;
        }
        
    }  
}

function keyPressed() {

    if (keyCode===RIGHT_ARROW) {
        scientist.x = scientist.x + 20
        bow.x = bow.x + 20
        //arrowG.setVelocityXEach(-15)
    }
    
    if (keyCode=== LEFT_ARROW) {
        scientist.x = scientist.x - 20
        bow.x = bow.x -20
        //arrowG.setVelocityXEach(-15)
    }
}

function hazard () {
    if (frameCount % 200 === 0) {
        var obstacle1 = createSprite(50,-20,50,50);
        obstacle1.x = Math.round(random(30,windowWidth - 50));
        obstacle1.velocityY = 2;
        obstacle1.addImage("fireball",fireballImg);
        obstacle1.scale = 0.05
        obstacle1.lifetime = 800;
        obstacle1G.add(obstacle1);
    }

    if (frameCount % 300 === 0) {
        var obstacle2 = createSprite(windowWidth + 10, 500, 50,50);
        obstacle2.y = Math.round(random(500,windowHeight -20));
        obstacle2.velocityX = -2;
        obstacle2.addImage("Water", waterImg);
        obstacle2.scale = 0.5
        obstacle2.lifetime = 800;
        obstacle2G.add(obstacle2);
        
    }

    if(frameCount % 100 === 0) {
        var plastic = createSprite(width - 30, 20, 50,50);
        plastic.scale = 0.15
        plastic.addImage("plastic", plasticImg)
        var r = Math.round(random(1,3))
        switch (r) {
            case 1 : plastic.velocityX = -2;
                     plastic.velocityY = 2;
                     break;

            case 2 : plastic.x = 20;
                     plastic.y = random(20, 400);
                     plastic.velocityX = 2;
                     plastic.velocityY = 2;
                     break;

            case 3 : plastic.x = random(20, width-50);
                     plastic.velocityY = 2;
                     break;
            default: break;
        }
        plastic.lifetime = 800
        plasticG.add(plastic)


    }
}

